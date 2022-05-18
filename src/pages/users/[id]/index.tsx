import styles from '@/styles/pages/users.module.scss';
import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserInformations, getUserResources } from '@/packages/api/users';
import UserCard from '@/components/molecules/UserCard/UserCard';
import Button from '@/components/atoms/Button/Button';
import FeedResourceCard from '@/components/molecules/FeedResourceCard/FeedResourceCard';

type UserPageProps = {
	user?: any;
}

const UserPage: NextPage = ({ user }: UserPageProps) => {
	const router = useRouter();
	const { id } = router.query;

	const [selectedUser, setSelectedUser] = useState(null);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [resources, setResources] = useState([]);

	const pullResources = async (keepOld: boolean) => {
		const remoteResources = await getUserResources(id, page);
		const _resources = keepOld ? [...resources] : [];

		if (remoteResources) {
			remoteResources.data.map((resource: any) => {
				_resources.push(resource);
			});

			setResources(_resources);
			setHasNextPage(remoteResources.pagination.hasNextPage);
		}
	}

	useEffect(() => {
		const foo = async () => {
			setResources([]);
			setHasNextPage(false);

			const userInfos = await getUserInformations(id);
			
			if (userInfos && !userInfos.statusCode) {
				setSelectedUser(userInfos);
			} else {
				await router.push('/404');
			}

			if (page !== 1) {
				setResources([]);
				setPage(1);
			} else {
				pullResources(false);
			}
		}

		foo();
	}, [id]);

	useEffect(() => {
		pullResources(true);
	}, [page]);

	const handleLoadMore = () => {
		if (hasNextPage)
			setPage(page + 1);
	}

	return (
		<DefaultLayout user={user}>
			{ selectedUser && <UserCard selectedUser={selectedUser} /> }

			<div>
					<div className={ styles.Feed }>
						{
							resources.map((resource, index) => {
								return <FeedResourceCard resource={resource} key={index} />
							})
						}
					</div>

					{
						hasNextPage && <div className={ styles.LoadMore }>
							<Button onClick={ handleLoadMore }>Charger plus</Button>
						</div>
					}
				</div>
		</DefaultLayout>
	);
}

UserPage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default UserPage;