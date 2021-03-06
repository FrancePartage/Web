import styles from './ResourceCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/utils/images';
import { timeSince } from '@/utils/date-utils';
import Heading2 from '@/components/atoms/Heading2/Heading2';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { dislikeResource, likeResource } from '@/packages/api/resources';
import { capitalize } from '@/utils/string-utils';

type ResourceCardProps = {
	user: any;
	resource: any;
}

const ResourceCard = ({ user, resource: paramResource }: ResourceCardProps) => {

	const [resource, setResource] = useState(paramResource);

	const dateTime = new Date(resource.createdAt);

	const handleLikeClick = async () => {
		if (resource.liked) {
			return;
		}

		await likeResource(resource.id);

		setResource({
			...resource,
			liked: true
		});
	}

	const handleDislikeClick = async () => {
		if (!resource.liked) {
			return;
		}

		await dislikeResource(resource.id);

		setResource({
			...resource,
			liked: false
		});
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
				<Heading2>{ resource.title }</Heading2>
				
				<div className={styles.Tags}>
					{ 
						resource.tags.map((tag: any, index: number) => {
							return (
								<div className={styles.Tag} key={index}><Link href={`/resources/tags/${tag}`}><a>{capitalize(tag)}</a></Link></div>
							);
						})
					}
				</div>
				
				{ /* <div className={styles.Cover} style={coverStyle}></div> */ }

				<div className={styles.HtmlContent} dangerouslySetInnerHTML={{ __html: resource.content }}></div>
			</div>

			{ user && resource.liked !== undefined && 
				<div className={styles.Footer}>
					<div className={styles.Action}>
							{
								resource.liked ? 
									<button className={styles.Button} onClick={handleDislikeClick}>
										<SolidHeartIcon className={styles.Like} />
										<p>Supprimer des favoris</p>
									</button>
								:
									<button className={styles.Button} onClick={handleLikeClick}>
										<HeartIcon className={styles.Like} />
										<p>Mettre en favori</p>
									</button>
							}
					</div>
				</div>
			}
		</Card>
	);
}

export default ResourceCard;