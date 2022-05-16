import styles from '@/styles/pages/resources.module.scss';
import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addComment, getResource } from '@/packages/api/resources';
import ResourceCard from '@/components/molecules/ResourceCard/ResourceCard';
import Heading2 from '@/components/atoms/Heading2/Heading2';
import { useForm } from 'react-hook-form';
import Form from '@/components/atoms/Form/Form';
import FormButton from '@/components/atoms/FormButton/FormButton';
import TextAreaInput from '@/components/molecules/TextAreaInput/TextAreaInput';
import Alert from '@/components/atoms/Alert/Alert';

type ResourcePageProps = {
	user?: any;
}

const ResourcePage: NextPage = ({ user }: ResourcePageProps) => {
	const router = useRouter();
	const { id } = router.query;
	const [resource, setResource] = useState(null);
	const [comments, setComments] = useState([]);
	const { register, handleSubmit, reset } = useForm();
	const [error, setError] = useState('');

	useEffect(() => {
		setResource(null);
		setComments([]);

		const foo = async () => {
			const response = await getResource(id);

			if (response === null) {
				router.push('/404');
			}

			setResource(response);
		} 
		
		foo();
	}, [id])

	const onSubmit = async (data: any) => {
		setError('');

		if (data.comment === '') {
			setError('Vous devez remplir le champ commentaire');
			return;
		}

		const response = await addComment(id, data.comment);

		console.log(response);

		reset();
  }

	return (
		<DefaultLayout user={user}>
			{ resource && <ResourceCard resource={resource} /> }

			<div className={styles.Comments}>
				{
					comments.length > 0 && 
						<div>
							<Heading2>Commentaires</Heading2>
						</div>
				}

				{
					user &&
						<div>
							<Heading2>Ajouter un commentaire</Heading2>

							{ error !== '' && <Alert text={error} /> }

							<Form onSubmit={handleSubmit(onSubmit)}>
								<TextAreaInput formKey={register("comment")} label="Commentaire" />
								<FormButton value="Envoyer" />
							</Form>
						</div>
				}
			</div>
		</DefaultLayout>
	);
}

ResourcePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default ResourcePage;