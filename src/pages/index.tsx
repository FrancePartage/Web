import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import ThreeColumnLayout from '@/components/templates/ThreeColumnLayout/ThreeColumnLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import type { NextPage } from 'next';

type HomePageProps = {
	user?: any;
}

const HomePage: NextPage = ({ user }: HomePageProps) => {
  return (
    <DefaultLayout user={user}>
			<ThreeColumnLayout>
				{ user ? <h1>Hello {user.displayName}</h1> : <h1>Hello stranger</h1> }
			</ThreeColumnLayout>
    </DefaultLayout>
  );
}

HomePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default HomePage;
