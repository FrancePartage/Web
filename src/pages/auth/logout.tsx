import { deleteTokens } from '@/utils/auth';
import type { NextPage } from 'next';
import Router from 'next/router';

const LogoutPage: NextPage = ()  => {
  return (
		<></>
  );
}

LogoutPage.getInitialProps = async (ctx) => {
	deleteTokens(ctx);

	if (typeof window !== "undefined") {
		Router.push("/");
	} else {
		ctx.res!.writeHead(302, { Location: "/" }).end();
	}  

	return {};
}

export default LogoutPage;