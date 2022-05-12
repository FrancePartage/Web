import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import styles from '@/styles/pages/index.module.scss';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import LinkButton from '@/components/atoms/LinkButton/LinkButton';
import Button from '@/components/atoms/Button/Button';
import { getPopularTags, getResources, getResourcesByTag } from '@/packages/api/resources';
import FeedResourceCard from '@/components/molecules/FeedResourceCard/FeedResourceCard';
import { useRouter } from 'next/router';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import { getSuggestions } from '@/packages/api/relations';
import ThreeColumnLayout from '@/components/templates/ThreeColumnLayout/ThreeColumnLayout';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import AuthCard from '@/components/molecules/AuthCard/AuthCard';
import PopularTagsCard from '@/components/molecules/PopularTagsCard/PopularTagsCard';
import RssCard from '@/components/molecules/RssCard/RssCard';
import SuggestionsCard from '@/components/molecules/SuggestionCard/SuggestionsCard';

type TagPageProps = {
	user?: any;
}

const TagPage: NextPage = ({ user }: TagPageProps) => {
  const router = useRouter();
  const { tag } = router.query;

	const [firstExecute, setFirstExecute] = useState(true);
	const [suggestions, setSuggestions] = useState([]);
	const [resources, setResources] = useState([]);
	const [tags, setTags] = useState([]);
	const [page, setPage] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(false);

	const pullResources = async (keepOld: boolean) => {
		const remoteResources = await getResourcesByTag(tag, page);
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
		if (firstExecute) {
			setFirstExecute(false);
			return;
		}

		if (page !== 1) {
			setResources([]);
			setPage(1);
		} else {
			pullResources(false);
		}
	}, [tag]);

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
		pullResources(true);
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
					<div className={ styles.Feed }>
						<Heading1>#{tag}</Heading1>

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
					<RssCard />
				</div>
			</ThreeColumnLayout>
    </DefaultLayout>
  );
}

TagPage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default TagPage;
