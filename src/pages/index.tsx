import { isMaybeAuthentificated } from '@/utils/auth';
import type { NextPage } from 'next';

const HomePage: NextPage = ({ user }) => {
  return (
    <div>
			{ user ? <h1>Hello {user.displayName}</h1> : <h1>Hello stranger</h1> }
    </div>
  );
}

HomePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default HomePage;
