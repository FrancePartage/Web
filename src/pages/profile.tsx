import { UserRole } from '@/enums/roles';
import { isAuthenticated } from '@/utils/auth';
import type { NextPage } from 'next';


const ProfilePage: NextPage = ({ user }) => {
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
	return isAuthenticated(ctx, [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CITIZEN]);
}

export default ProfilePage;
