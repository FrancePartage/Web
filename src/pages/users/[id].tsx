import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserInformations } from '@/packages/api/users';
import UserCard from '@/components/molecules/UserCard/UserCard';

type UserPageProps = {
	user?: any;
}

const UserPage: NextPage = ({ user }: UserPageProps) => {
	const router = useRouter();
	const { id } = router.query;

	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		const foo = async () => {
			const response = await getUserInformations(id);
			
			if (response && !response.statusCode) {
				setSelectedUser(response);
			}
		}

		foo();
	}, [id]);

	return (
		<DefaultLayout user={user}>
			{ selectedUser && <UserCard selectedUser={selectedUser} /> }
		</DefaultLayout>
	);
}

UserPage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default UserPage;