import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BasicInput from '@/components/molecules/BasicInput/BasicInput';
import FormButton from '@/components/atoms/FormButton/FormButton';
import { useEffect, useState } from 'react';
import { searchUsers } from '@/packages/api/users';
import { searchResources } from '@/packages/api/resources';
import SearchUserCard from '@/components/molecules/SearchUserCard/SearchUserCard';
import ResourceCard from '@/components/molecules/ResourceCard/ResourceCard';
import FeedResourceCard from '@/components/molecules/FeedResourceCard/FeedResourceCard';
import { isMaybeAuthentificated } from '@/utils/auth';

type SearchPageProps = {
	user: any;
}

const SearchPage = ({ user }: SearchPageProps) => {
	const router = useRouter();
	const { query } = router.query;
	const [userResults, setUserResults] = useState([]);
	const [resourceResults, setResourceResults] = useState([]);

	const { register, handleSubmit } = useForm({
		defaultValues: {
			search: query
		}
	});

	const executeSearch = async (searchStr: any) => {
		const users = await searchUsers(searchStr);
		const resources = await searchResources(searchStr);

		if (users) {
			setUserResults(users.data);
		}

		if (resources) {
			setResourceResults(resources.data);
		}
	}

	const onSubmit = async (data: any) => {
		if (data.search === '') {
			return;
		}

		await executeSearch(data.search);
	}

	useEffect(() => {
		const foo = async () => {
			if (query !== '') {
				await executeSearch(query);
			}	
		}

		foo();
	}, [query]);

	return (
		<DefaultLayout user={user}>
			<form onSubmit={ handleSubmit(onSubmit) } style={ { marginBottom: "64px" } }>
				<BasicInput formKey={ register("search") } type="text" label="Recherche"/>
				<FormButton style={ { margin: "8px 0", float: "right" } } value="Rechercher"/>
			</form>

			<div className="v-flex">
				{
					userResults.map((user: any, index) => {
						return <SearchUserCard user={user} key={index} />
					})
				}

				{
					resourceResults.map((resource: any, index) => {
						return <FeedResourceCard resource={resource} user={user} key={index} />
					})
				}
			</div>
		</DefaultLayout>
	);
}

SearchPage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default SearchPage;
