import styles from './SearchUserCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Link from 'next/link';
import { resolveImage } from '@/utils/images';

type SearchUserCardProps = {
	user: any;
}

const SearchUserCard = ({ user }: SearchUserCardProps) => {
  return (
	<Card>
	  <div className={styles.Content}>
		<div className={styles.SubContent}>
		  <div className={styles.Avatar}>
			<Image src={ resolveImage(`avatars/${ user.avatar }`) } alt="Avatar" layout="fill" className={styles.Image} />
		  </div>

		  <Link href={`/users/${user.id}`}>
			<a>
				<p>{user.displayName}</p>
			</a>
		  </Link>
		</div>

	  </div>
	</Card>
  );
}

export default SearchUserCard;