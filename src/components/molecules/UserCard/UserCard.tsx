import styles from './UserCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import Link from 'next/link';
import { useState } from 'react';
import { resolveImage } from '@/utils/images';

type UserCardProps = {
	selectedUser: any
}

const UserCard = ({ selectedUser }: UserCardProps) => {
	const [showRelationTrigger, setShowRelationTrigger] = useState(false);
	const [showRemoveRelation, setShowRemoveRelation] = useState(false);
	const [active, setActive] = useState(true);

	const handleAdd = () => {
		setShowRelationTrigger(false);
		setShowRemoveRelation(true);
		setActive(false);
	}

	const handleRemove = () => {
		setShowRelationTrigger(true);
		setShowRemoveRelation(false);
	}

	return (
		<Card>
			<div className={ styles.Content }>
				<div className={ styles.SubContent }>
					<div className={ styles.Avatar }>
						<Image src={ resolveImage(`avatars/${ selectedUser.avatar }`) } alt="Avatar" layout="fill"
							   className={ styles.Image }/>
					</div>

					<Heading1>{ selectedUser.displayName }</Heading1>

					{ /* showRelationTrigger && <RelationTrigger callback={ handleAdd } user={ selectedUser }/> */ }
					{ /* showRemoveRelation && <RemoveRelation callback={ handleRemove } user={ selectedUser } active={active} /> */ }

				</div>

				<div className={ styles.Information }>
					<Link href={ `/users/${ selectedUser.id }/relations` }>
						<div>
							<span className={ styles.Counter }>TODO</span>
							<span className={ styles.Label }>Relations</span>
						</div>
					</Link>
					<Link href={ `/users/${ selectedUser.id }` }>
						<div>
							<span className={ styles.Counter }>TODO</span>
							<span className={ styles.Label }>Ressources</span>
						</div>
					</Link>
				</div>
			</div>
		</Card>
	);
}

export default UserCard;