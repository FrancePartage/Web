import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import ThreeColumnLayout from '@/components/templates/ThreeColumnLayout/ThreeColumnLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import styles from '@/styles/pages/index.module.scss';
import type { NextPage } from 'next';
import RssCard from '@/components/molecules/RssCard/RssCard';
import { useEffect, useState } from 'react';
import { getSuggestions } from '@/packages/api/relations';
import SuggestionsCard from '@/components/molecules/SuggestionCard/SuggestionsCard';
import LinkButton from '@/components/atoms/LinkButton/LinkButton';
import AuthCard from '@/components/molecules/AuthCard/AuthCard';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import Button from '@/components/atoms/Button/Button';
import { getPopularTags, getResources } from '@/packages/api/resources';
import FeedResourceCard from '@/components/molecules/FeedResourceCard/FeedResourceCard';
import PopularTagsCard from '@/components/molecules/PopularTagsCard/PopularTagsCard';

type HomePageProps = {
	user?: any;
}

const HomePage: NextPage = ({ user }: HomePageProps) => {
	const [suggestions, setSuggestions] = useState([]);
	const [resources, setResources] = useState([]);
	const [tags, setTags] = useState([]);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);

	useEffect(() => {
		if (user) {
			const foo = async () => {
				const suggestions = await getSuggestions();

				if (suggestions) {
					setSuggestions(suggestions.data);
				}
			}

			foo();
		}
	}, [user]);

	useEffect(() => {
		const foo = async () => {
			const remoteResources = await getResources(page);
			const _resources = [...resources];

			if (remoteResources) {
				remoteResources.data.map((resource: any) => {
					_resources.push(resource);
				});

				setResources(_resources);
				setHasNextPage(remoteResources.pagination.hasNextPage);
			}
		}

		foo();
	}, [page]);

	useEffect(() => {
		const foo = async () => {
			const tags = await getPopularTags();
			setTags(tags);
		}

		foo();
	}, []);

	const handleLoadMore = () => {
		if (hasNextPage)
			setPage(page + 1);
	}

  return (
    <DefaultLayout user={user}>
			<ThreeColumnLayout>
					<div>
						{ user ? <ProfileCard user={ user }/> : <AuthCard/> }
					</div>

					<div>
						{ user &&
							<div className={ styles.AddResource }>
								<LinkButton href="/resources/add">Ajouter</LinkButton>
							</div>
						}

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

					<div className={ styles.RightColumn }>
						{ user && suggestions && suggestions.length > 0 && <SuggestionsCard users={ suggestions }/> }
						<PopularTagsCard tags={tags} />
					</div>
			</ThreeColumnLayout>
    </DefaultLayout>
  );
}

HomePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default HomePage;
