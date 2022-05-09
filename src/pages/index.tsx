import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import ThreeColumnLayout from '@/components/templates/ThreeColumnLayout/ThreeColumnLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import styles from '@/styles/pages/index.module.scss';
import type { NextPage } from 'next';
import RssCard from '@/components/molecules/RssCard/RssCard';
import { useEffect, useState } from 'react';
import { getSuggestions } from '@/packages/api/relations';
import SuggestionsCard from '@/components/molecules/SuggestionCard/SuggestionsCard';

type HomePageProps = {
	user?: any;
}

const HomePage: NextPage = ({ user }: HomePageProps) => {
	const [suggestions, setSuggestions] = useState([]);

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

  return (
    <DefaultLayout user={user}>
			<ThreeColumnLayout>
					<div>

					</div>

					<div>
				
					</div>

					<div className={ styles.RightColumn }>
						{ user && suggestions.length > 0 && <SuggestionsCard users={ suggestions }/> }
						<RssCard />
					</div>
			</ThreeColumnLayout>
    </DefaultLayout>
  );
}

HomePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default HomePage;
