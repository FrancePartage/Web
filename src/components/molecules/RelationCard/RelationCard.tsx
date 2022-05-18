import styles from './RelationCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Link from 'next/link';
import { resolveImage } from '@/utils/images';
import { getRelationString } from '@/utils/string-utils';

type RelationCardProps = {
	relation: any
}

const RelationCard = ({ relation }: RelationCardProps) => {
	return (
		<Card>
			<div className={styles.Content}>
				<div className={ styles.Avatar }>
					<Image src={ resolveImage(`avatars/${ relation.participant.avatar }`) } alt="Avatar" layout="fill" className={ styles.Image }/>
				</div>

				<Link href={ `/users/${ relation.participant.id }` }>
					<a>
						<p>{ relation.participant.displayName }</p>
					</a>
				</Link>

				<p className={styles.Type}>{ getRelationString(relation.type) }</p>
			</div>
		</Card>
	);
}

export default RelationCard;