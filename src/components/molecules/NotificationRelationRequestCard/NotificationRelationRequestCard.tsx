import styles from './NotificationRelationRequestCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';
import { resolveImage } from '@/utils/images';
import { useEffect, useState } from 'react';
import { getRelationObject } from '@/utils/relations-utils';
import { getRelationString } from '@/utils/string-utils';
import { acceptRequest, denyRequest } from '@/packages/api/relations';

type NotificationRelationRequestCardProps = {
	relation: any;
	callback: () => void;
	user: any;
}

const NotificationRelationRequestCard = ({ relation, callback, user }: NotificationRelationRequestCardProps) => {
	const [parsedRelation, setParsedRelation] = useState(null);

	useEffect(() => {
		setParsedRelation(getRelationObject(user.id, relation));
	}, [relation]);

	const handleAccept = async () => {
		await acceptRequest(relation.id);
		callback();
	}

	const handleDeny = async () => {
		await denyRequest(relation.id);
		callback();
	}

	if (!parsedRelation) {
		return <></>
	}

	return (
		<div className={styles.NotificationRelationRequestCard}>
			<Card>
				<div className={styles.Content}>
					<div className={styles.SubContent}>
						<div className={styles.Avatar}>
							<Image src={resolveImage(`avatars/${ parsedRelation.participant.avatar }`)} alt="Avatar" layout="fill" className={styles.Image} />
						</div>
						<Link href={`/users/${parsedRelation.participant.id}`}>
							<a>
								<p>{parsedRelation.participant.displayName}</p>
							</a>
						</Link>
						<p>({ getRelationString(parsedRelation.type) })</p>
					</div>

					<div className={styles.SubContent}>
						<Button light onClick={handleDeny}>Refuser</Button>
						<Button onClick={handleAccept}>Accepter</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default NotificationRelationRequestCard;