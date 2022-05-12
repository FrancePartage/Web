import styles from './PopularTagsCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Heading3 from '@/components/atoms/Heading3/Heading3';
import Link from 'next/link';

type PopularTagsCardProps = {
	tags: any;
}

const PopularTagsCard = ({ tags }: PopularTagsCardProps) => {
	return (
		<Card>
			<Heading3>Tags populaires</Heading3>
			<br />
			<div className={styles.PopularTagsCard}>
				{ 
					tags.map((tag: any, index: number) => {
						return (
							<Link href={`/resources/tags/${tag.tag}`} key={index}>
								<a>
									<div className={styles.Tag}>{tag.tag}</div>
								</a>
							</Link>
						)
					})
				}
			</div>
		</Card>
	);
}

export default PopularTagsCard;