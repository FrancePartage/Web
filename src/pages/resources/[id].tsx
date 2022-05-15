import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getResource } from '@/packages/api/resources';
import ResourceCard from '@/components/molecules/ResourceCard/ResourceCard';

type ResourcePageProps = {
	user?: any;
}

const ResourcePage: NextPage = ({ user }: ResourcePageProps) => {
	const router = useRouter();
	const { id } = router.query;
	const [resource, setResource] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		setResource(null);
		setComments([]);

		const foo = async () => {
			const response = await getResource(id);

			if (response === null) {
				router.push('/404');
			}

			setResource(response);
		} 
		
		foo();
	}, [id])

	return (
		<DefaultLayout user={user}>
			{ resource && <ResourceCard resource={resource} /> }
		</DefaultLayout>
	);
}

ResourcePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default ResourcePage;