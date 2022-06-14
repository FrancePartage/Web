import styles from './FeedResourceCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/utils/images';
import { timeSince } from '@/utils/date-utils';
import Heading2 from '@/components/atoms/Heading2/Heading2';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';

type FeedResourceCardProps = {
	resource: any;
	user: any;
}

const FeedResourceCard = ({ resource, user }: FeedResourceCardProps) => {

	const dateTime = new Date(resource.createdAt);

	const coverStyle = {
		backgroundImage: 'url(' + resolveImage(`covers/${ resource.cover }`) + ')'
	}

	return (
		<Card>
			<Link href={ `/users/${resource.author.id}` }>
				<div className={styles.Header}>
					<div className={styles.Left}>
						<div className={ styles.Avatar }>
							<Image src={ resolveImage(`avatars/${ resource.author.avatar }`) } alt="Avatar" layout="fill"
								   className={ styles.Image }/>
						</div>
						<p>{ resource.author.displayName }</p>
					</div>
					<div className={styles.Right}>
						<p>Il y a { timeSince(dateTime) }</p>
					</div>
				</div>
			</Link>

			<div className={styles.Content}>
				<Link href={`/resources/${resource.id}`}>
					<a>
						<Heading2>{ resource.title }</Heading2>
					</a>
				</Link>

				<div className={styles.Tags}>
					{ 
						resource.tags.map((tag: any, index: number) => {
							return (
								<div className={styles.Tag} key={index}><Link href={`/resources/tags/${tag}`}><a>{tag}</a></Link></div>
							);
						})
					}
				</div>
				
				<Link href={`/resources/${resource.id}`}>
					<a>
						<div className={styles.Cover} style={coverStyle}></div>
					</a>
				</Link>
			</div>

			{ user && resource.liked !== undefined && 
				<div className={styles.Footer}>
					<div className={styles.Action}>
						{
							resource.liked ? 
								<>
									<SolidHeartIcon className={styles.Like} />
									<p>Supprimer des favoris</p>
								</>
							:
								<>
									<HeartIcon className={styles.Like} />
									<p>Mettre en favori</p>
								</>
						}
						
					</div>
				</div>
			}
		</Card>
	);
}

export default FeedResourceCard;