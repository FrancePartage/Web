import styles from './ProfileCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import Link from 'next/link';
import { resolveImage } from '@/utils/images';

type ProfileCardProps = {
	user: any;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
	<Card>
	  <div className={styles.Avatar}>
		<Image src={ resolveImage(`avatars/${ user.avatar }`) } alt="Avatar" layout="fill" className={styles.Image} />
	  </div>

	  <div className={styles.Name}>
		<Heading1>{user.displayName}</Heading1>
	  </div>

	  <div className={styles.Information}>
		  <Link href={`/users/${user.id}/relations`}>
			  <div>
				  <span className={ styles.Counter }>TODO</span>
				  <span className={ styles.Label }>Relations</span>
			  </div>
		  </Link>
		  <Link href={`/users/${user.id}`}>
			  <div>
				  <span className={ styles.Counter }>TODO</span>
				  <span className={ styles.Label }>Ressources</span>
			  </div>
		  </Link>
	  </div>

	  <div className={styles.ViewProfile}>
			<Link href={`/users/${user.id}`}><a>Voir mon profil</a></Link>
	  </div>
	</Card>
  );
}

export default ProfileCard;