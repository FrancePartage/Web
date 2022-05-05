import { me, refreshTokens, setTokens } from '@/packages/api/auth';
import { getHost } from '@/utils/get-host';
import type { NextPage } from 'next';
import nextCookie from 'next-cookies';
import { Router } from 'next/router';
import Cookies from 'cookies';

const ProfilePage: NextPage = ({ user }) => {
  return (
    <div>
			Profile
			{ user.displayName }
    </div>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
	const cookies = new Cookies(ctx.req, ctx.res);
	let { accessToken, refreshToken } = nextCookie(ctx);

	const redirectOnError = () => typeof window !== "undefined" ? Router.push("/auth/signin") : ctx.res.writeHead(302, { Location: "/auth/signin" }).end();

	try {
		if (!accessToken) {
			console.log('Don\'t have access token');

			if (!refreshToken) {
				console.log('Don\'t have refresh token');
				return await redirectOnError();
			}

			const tokens = await refreshTokens(refreshToken);

			console.log('Refreshed tokens', tokens);

			if (!tokens) {
				console.log('Could not refresh tokens');
				return await redirectOnError();
			}
			
			accessToken = tokens.accessToken;
			refreshToken = tokens.refreshToken;
			
			cookies.set('accessToken', accessToken, { maxAge: 15 * 60 * 1000 });
			cookies.set('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 15 * 1000 });
		}

    const response = await me(accessToken!);

		if (!response) {
			return await redirectOnError();
		}

		if (response.status !== 200) {
			return await redirectOnError();
		}

		const user = await response.json();

		return { user };
	} catch (error) {
		return await redirectOnError();
	}
}

export default ProfilePage;
