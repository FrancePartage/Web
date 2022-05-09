import styles from './SuggestionsCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Link from 'next/link';
import Heading3 from '@/components/atoms/Heading3/Heading3';
import { resolveImage } from '@/utils/images';

type SuggestionsCardProps = {
	users: any;
}

const SuggestionsCard = ({ users }: SuggestionsCardProps) => {
  return (
	<Card>
	  <div className={styles.SuggestionCard}>
		<Heading3>Suggestions</Heading3>
		<br />
		{
		  users.map((user: any, index: number) => {
			return (
			  <div key={index} className={styles.Line}>
					<div>
						<div className={styles.Avatar}>
							<Image src={ resolveImage(`avatars/${ user.avatar }`) } alt="Avatar" layout="fill" className={styles.Image} />
						</div>
					</div>

					<Link href={`/users/${user.id}`}>
						<a>
							<p>{user.displayName}</p>
						</a>
					</Link>
			  </div>
			)
		  })
		}
	  </div>
	</Card>
  );
}

export default SuggestionsCard;