import Alert from '@/components/atoms/Alert/Alert';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isAuthenticated } from '@/utils/auth';
import type { NextPage } from 'next';
import styles from '@/styles/pages/profile.module.scss';
import { useEffect, useState } from 'react';
import CenterLayout from '@/components/templates/CenterLayout/CenterLayout';
import Image from 'next/image';
import Form from '@/components/atoms/Form/Form';
import BasicInput from '@/components/molecules/BasicInput/BasicInput';
import FormButton from '@/components/atoms/FormButton/FormButton';
import { useForm } from 'react-hook-form';
import { updateInformation, updatePassword, updateAvatar } from '@/packages/api/users';
import { resolveImage } from '@/utils/images';

type ProfilePageProps = {
	user?: any;
}

const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const ProfilePage: NextPage = ({ user }: ProfilePageProps) => {
	const [success, setSuccess] = useState('');
	const [editError, setEditError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [avatar, setAvatar] = useState(user?.avatar);

	const { register: registerEdit, handleSubmit: handleEdit } = useForm({
		defaultValues: {
			email: user?.email,
			username: user?.username,
			firstName: user?.firstname,
			lastName: user?.lastname
		}
	});

	const { register: registerPassword, handleSubmit: handlePassword } = useForm();

	const onEdit = async (data: any) => {
		setSuccess('');
		setEditError('');

		if (data.username === '' || data.firstName === '' || data.lastName === '') {
			setEditError('Vous ne pouvez pas avoir des champs vides');
			return;
		}

		const result = await updateInformation(data.username, data.firstName, data.lastName);

		if (!result) {
			if (Array.isArray(result.message)) {
				setEditError(result.message.join('<br>'));
			} else {
				setEditError(result.message);
			}
			return;
		}

		setSuccess('Vous avez modifié les informations de votre compte');
	}

	const onPassword = async (data: any) => {
		setSuccess('');
		setPasswordError('');

		if (data.oldPassword === '' || data.newPassword === '' || data.confirmNewPassword === '') {
			setPasswordError('Veuillez saisir tous les champs');
			return;
		}

		if (data.newPassword !== data.confirmNewPassword) {
			setPasswordError('Les mots de passes ne correspondent pas');
			return;
		}

		const result = await updatePassword(data.oldPassword, data.newPassword);

		if (result !== null) {
			if (!result.statusCode) {
				return;
			}

			if (Array.isArray(result.message)) {
				setPasswordError(result.message.join('<br>'));
			} else {
				setPasswordError(result.message);
			}
			return;
		}

		setSuccess('Vous avez modifier le mot de passe de votre compte');
	}

	useEffect(() => {
		const foo = async () => {
			if (selectedImage) {
				setEditError('');

				if (selectedImage.size > 1000000) {
					setEditError('L\'image est trop lourde (> 1MB)')
					return;
				}

				if (!acceptedImageTypes.includes(selectedImage['type'])) {
					setEditError('L\'image doit être au format JPG, JPEG ou PNG')
					return;
				}

				const result = await updateAvatar(selectedImage);

				if (result.statusCode) {
					if (Array.isArray(result.message)) {
						setEditError(result.message.join('<br>'));
					} else {
						setEditError(result.message);
					}
				} else {
					setAvatar(result.imagePath);
				}
			}
		}

		foo();
	}, [selectedImage]);

  return (
			<DefaultLayout user={user}>
				<CenterLayout>
					{ success !== '' && <Alert text={ success } type='success'/> }

					<Heading1>Editer mon profil</Heading1>

					<input
						accept="image/*"
						type="file"
						id="select-image"
						style={ { display: 'none' } }
						onChange={ e => { 
							if (e.target.files!.length > 0) {
								setSelectedImage(e.target.files![0]) 
							}
						}}
					/>

					<label htmlFor="select-image">
						<div className={ styles.Avatar }>
							<Image src={ resolveImage(`avatars/${ avatar }`) } alt="Avatar" layout="fill" className={ styles.Image }/>
						</div>
					</label>

					{ editError !== '' && <Alert text={ editError }/> }

					<Form onSubmit={ handleEdit(onEdit) }>
						<BasicInput formKey={ registerEdit("email") } type="email" label="Adresse email"
									disabled={ true }/>
						<BasicInput formKey={ registerEdit("username") } type="text" label="Nom d'utilisateur"/>
						<BasicInput formKey={ registerEdit("firstName") } type="text" label="Prénom"/>
						<BasicInput formKey={ registerEdit("lastName") } type="text" label="Nom"/>
						<FormButton value="Sauvegarder"/>
					</Form>

					<Heading1>Changer mon mot de passe</Heading1>

					{ passwordError !== '' && <Alert text={ passwordError }/> }

					<Form onSubmit={ handlePassword(onPassword) }>
						<BasicInput formKey={ registerPassword("oldPassword") } type="password"
									label="Mot de passe actuel"/>
						<BasicInput formKey={ registerPassword("newPassword") } type="password"
									label="Nouveau mot de passe"/>
						<BasicInput formKey={ registerPassword("confirmNewPassword") } type="password"
									label="Confirmer le nouveau mot de passe"/>
						<FormButton value="Sauvegarder"/>
					</Form>
				</CenterLayout>
			</DefaultLayout>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
	return isAuthenticated(ctx);
}

export default ProfilePage;
