import styles from '@/styles/pages/users.module.scss';
import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserInformations, getUserRelations } from '@/packages/api/users';
import UserCard from '@/components/molecules/UserCard/UserCard';
import Button from '@/components/atoms/Button/Button';
import RelationCard from '@/components/molecules/RelationCard/RelationCard';
import { getRelationObject } from '@/utils/relations-utils';

type UserRelationsPageProps = {
	user?: any;
}

const UserRelationsPage: NextPage = ({ user }: UserRelationsPageProps) => {
	const router = useRouter();
	const { id } = router.query;

	const [selectedUser, setSelectedUser] = useState(null);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [relations, setRelations] = useState<any[]>([]);

	const pullRelations = async (keepOld: boolean) => {
		const remoteRelations = await getUserRelations(parseInt(id!.toString()), page);
		const _relations = keepOld ? [...relations] : [];

		if (remoteRelations) {
			remoteRelations.data.map((relation: any) => {
				_relations.push(relation);
			});

			setRelations(_relations);
			setHasNextPage(remoteRelations.pagination.hasNextPage);
		}
	}

	useEffect(() => {
		const foo = async () => {
			setRelations([]);
			setHasNextPage(false);

			const userInfos = await getUserInformations(parseInt(id!.toString()));
			
			if (userInfos && !userInfos.statusCode) {
				setSelectedUser(userInfos);
			} else {
				await router.push('/404');
			}

			if (page !== 1) {
				setRelations([]);
				setPage(1);
			} else {
				pullRelations(false);
			}
		}

		foo();
	}, [id]);

	useEffect(() => {
		pullRelations(true);
	}, [page]);

	const handleLoadMore = () => {
		if (hasNextPage)
			setPage(page + 1);
	}

	return (
		<DefaultLayout user={user}>
			{ selectedUser && <UserCard user={user} selectedUser={selectedUser} /> }

			<div>
					<div className={ styles.RelationsFeed }>
						{
							relations.map((relation, index) => {
								return <RelationCard key={index} relation={getRelationObject(parseInt(id!.toString()), relation)} />
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

UserRelationsPage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default UserRelationsPage;