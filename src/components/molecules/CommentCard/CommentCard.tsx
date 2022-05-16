import styles from './CommentCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/utils/images';
import { timeSince } from '@/utils/date-utils';

type CommentCardProps = {
	comment: any;
}

const CommentCard = ({ comment }: CommentCardProps) => {

	const dateTime = new Date(comment.createdAt);

	return (
		<Card>
			<Link href={ `/users/${comment.author.id}` }>
				<div className={styles.Header}>
					<div className={styles.Left}>
						<div className={ styles.Avatar }>
							<Image src={ resolveImage(`avatars/${ comment.author.avatar }`) } alt="Avatar" layout="fill"
								   className={ styles.Image }/>
						</div>
						<p>{ comment.author.displayName }</p>
					</div>
					<div className={styles.Right}>
						<p>Il y a { timeSince(dateTime) }</p>
					</div>
				</div>
			</Link>

			<div className={styles.Content}>
				{ comment.content }
			</div>
		</Card>
	);
}

export default CommentCard;