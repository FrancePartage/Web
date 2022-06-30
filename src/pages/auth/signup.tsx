import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import AuthLayout from '@/components/templates/AuthLayout/AuthLayout';
import Form from '@/components/atoms/Form/Form';
import BasicInput from '@/components/molecules/BasicInput/BasicInput';
import FormButton from '@/components/atoms/FormButton/FormButton';
import Link from 'next/link';
import { useState } from 'react';
import Alert from '@/components/atoms/Alert/Alert';
import { useRouter } from 'next/router';
import { isNotAuthenticated } from '@/utils/auth';
import { isValidMail } from '@/utils/string-utils';
import CheckboxInput from '@/components/molecules/CheckbokInput/CheckboxInput';
import { signUp } from '@/packages/api/auth';
import { setCookies } from 'cookies-next';

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setError('');

    if (data.email === '' || data.username === '' || data.firstName === '' || data.lastName === '' || data.password === '' || data.confirmPassword === '') {
      setError('Veuillez saisir tous les champs');
      return;
    }

    if (!isValidMail(data.email)) {
      setError('L\'adresse email n\'est pas valide');
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (data.password.length < 5) {
      setError('Le mot de passe doit contenir au moins 5 caractères');
			return;
    }

		const response = await signUp(data.email, data.username, data.firstName, data.lastName, data.password, data.acceptRgpd);

		if (response.accessToken && response.refreshToken) {
			setCookies('accessToken', response.accessToken, { maxAge: 15 * 60  });
			setCookies('refreshToken', response.refreshToken, { maxAge: 60 * 60 * 24 * 15 });

			await router.push('/');
		} else {
			if (response.message) {
				if (Array.isArray(response.message)) {
					setError(response.message.join('<br>'));
				} else {
					setError(response.message);
				}
			}
		}
  }

  return (
		<AuthLayout title="S'inscrire">
			{ error !== '' && <Alert text={error} /> }

			<Form onSubmit={handleSubmit(onSubmit)}>
				<BasicInput formKey={register("email")} type="email" label="Adresse e-mail" />
				<BasicInput formKey={register("username")} type="text" label="Nom d'utilisateur" />
				<BasicInput formKey={register("firstName")} type="text" label="Prénom" />
				<BasicInput formKey={register("lastName")} type="text" label="Nom" />
				<BasicInput formKey={register("password")} type="password" label="Mot de passe" />
				<BasicInput formKey={register("confirmPassword")} type="password" label="Confirmer le  mot de passe" />
				<CheckboxInput formKey={register("acceptRgpd")} label="J'accepte d'afficher mon nom et prénom en public" />
				<FormButton value="S'inscrire" />
			</Form>

			<Link href="/auth/signin"><a>Déjà membre ?</a></Link>
		</AuthLayout>
  );
}

RegisterPage.getInitialProps = async (ctx) => {
	return isNotAuthenticated(ctx);
}

export default RegisterPage;