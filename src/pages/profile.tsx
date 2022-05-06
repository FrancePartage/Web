import { isAuthenticated } from '@/utils/auth';
import type { NextPage } from 'next';

type ProfilePageProps = {
	user?: any;
}

const ProfilePage: NextPage = ({ user }: ProfilePageProps) => {
  return (
    <div>
			Profile
			
			{ user.displayName }
			{ user.role }
			{ user.avatar }
    </div>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
	return isAuthenticated(ctx);
}

export default ProfilePage;
