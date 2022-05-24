import styles from '@/styles/pages/notifications.module.scss';
import NotificationRelationRequestCard from '@/components/molecules/NotificationRelationRequestCard/NotificationRelationRequestCard';
import CenterLayout from '@/components/templates/CenterLayout/CenterLayout';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { getRequests } from '@/packages/api/relations';
import { isAuthenticated } from '@/utils/auth';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

type NotificationsPageProps = {
	user?: any;
}

const NotificationsPage: NextPage = ({ user }: NotificationsPageProps) => {

	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const foo = async () => {
			const response = await getRequests();

			if (response) {
				setNotifications(response.data);
			} 
		}

		if (user) {
			foo();
		}
	}, [user]);

  return (
		<DefaultLayout>
			<CenterLayout>
				<div className={styles.Container}>
				{
					notifications.map((notification, index) => {
						return (
							<NotificationRelationRequestCard key={index} relation={notification} callback={() => {}} user={user} />
						)
					})
				}
				</div>
			</CenterLayout>
		</DefaultLayout>
  );
}

NotificationsPage.getInitialProps = async (ctx) => {
	return isAuthenticated(ctx);
}

export default NotificationsPage;
