import type { NextPage } from 'next';
import AuthLayout from '@/components/templates/AuthLayout/AuthLayout';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import BasicInput from '@/components/molecules/BasicInput/BasicInput';
import FormButton from '@/components/atoms/FormButton/FormButton';
import Form from '@/components/atoms/Form/Form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Alert from '@/components/atoms/Alert/Alert';
import { signIn } from '@/packages/api/auth';
import { isNotAuthenticated } from '@/utils/auth';
import { setCookies } from 'cookies-next';

const LoginPage: NextPage = ()  => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setError('');

    if (data.email === '' || data.password === '') {
      setError('Veuillez saisir tous les champs');
      return;
    }

		const response = await signIn(data.email, data.password);

		if (!response) {
			setError('Email ou mot de passe incorrect');
			return;
		}

		setCookies('accessToken', response.accessToken, { maxAge: 15 * 60  });
		setCookies('refreshToken', response.refreshToken, { maxAge: 60 * 60 * 24 * 15 });

		router.push('/');
  }

  return (
		<AuthLayout title="Se connecter">
			{ error !== '' && <Alert text={error} /> }

			<Form onSubmit={handleSubmit(onSubmit)}>
				<BasicInput formKey={register("email")} type="text" label="Adresse e-mail" />
				<BasicInput formKey={register("password")} type="password" label="Mot de passe" />
				<FormButton value="Se connecter" />
			</Form>

			<Link href="/auth/signup"><a>Pas encore membre ?</a></Link>
		</AuthLayout>
  );
}

LoginPage.getInitialProps = async (ctx) => {
	return isNotAuthenticated(ctx);
}

export default LoginPage;