import styles from './CommentCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/utils/images';
import { timeSince } from '@/utils/date-utils';
import { ReplyIcon } from '@heroicons/react/outline';

type CommentCardProps = {
	user: any;
	comment: any;
	handleReply: (commentId: any) => void;
}

const CommentCard = ({ user, comment, handleReply }: CommentCardProps) => {

	const dateTime = new Date(comment.createdAt);

	return (
		<>
			<div style={{ marginLeft: comment.parent_id ? '64px' : '0px' }}>
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

					{ user && !comment.parent_id && 			
						<div className={styles.Footer}>
							<button onClick={handleReply}>
								<div className={styles.Icon}><ReplyIcon/></div> Répondre
							</button>
						</div> 
					}
				</Card>
			</div>
			
			{
				!comment.parent_id && comment.childrens && 
				<>
					{ comment.childrens.map((children: any, index: number) => {
							return <CommentCard user={user} comment={children} key={index} handleReply={() => {}} />
					}) }
				</>
			}
		</>
	);
}

export default CommentCard;