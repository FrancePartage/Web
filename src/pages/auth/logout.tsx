import type { NextPage } from 'next';
import Cookies from 'cookies';
import JsCookies from 'js-cookie';
import Router from 'next/router';

const LogoutPage: NextPage = ()  => {

  return (
		<></>
  );
}

LogoutPage.getInitialProps = async (ctx) => {
	if (typeof window !== "undefined") {
		JsCookies.set('accessToken', '', { expires: -1 });
		JsCookies.set('refreshToken', '', { expires: -1 });
		Router.push("/");
	} else {
		const cookies = new Cookies(ctx.req, ctx.res);
		cookies.set('accessToken', '', { maxAge: -1 });
		cookies.set('refreshToken', '', { maxAge: -1 });

		ctx.res!.writeHead(302, { Location: "/" }).end();
	}  

	return {};
}

export default LogoutPage;