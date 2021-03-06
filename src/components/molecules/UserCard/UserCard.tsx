import styles from './UserCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import Image from 'next/image';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { resolveImage } from '@/utils/images';
import { getRelationWith } from '@/packages/api/relations';
import RelationTrigger from '../RelationTrigger/RelationTrigger';
import RemoveRelation from '../RemoveRelation/RemoveRelation';

type UserCardProps = {
	user: any;
	selectedUser: any;
}

const UserCard = ({ user, selectedUser }: UserCardProps) => {
	const [showRelationTrigger, setShowRelationTrigger] = useState(false);
	const [showRemoveRelation, setShowRemoveRelation] = useState(false);
	const [relation, setRelation] = useState(null);
	const [active, setActive] = useState(true);

	const fetchRelation = async () => {
		const relation = await getRelationWith(parseInt(selectedUser.id));

		if (relation.data) {
			setRelation(relation.data);

			if (!relation.data.isAccepted && relation.data.requestToId === parseInt(user.id)) {
				setShowRelationTrigger(false);
			} else {
				setShowRemoveRelation(true);
			}

			setActive(relation.data.isAccepted);
		} else {
			setShowRelationTrigger(true);
		}
	}

	useEffect(() => {
		if (user && user.id != selectedUser.id) {
			fetchRelation();
		}
	}, [user, selectedUser])

	const handleAdd = () => {
		setShowRelationTrigger(false);
		setShowRemoveRelation(true);
		setActive(false);
		fetchRelation();
	}

	const handleRemove = () => {
		setShowRelationTrigger(true);
		setShowRemoveRelation(false);
		fetchRelation();
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

					{ showRelationTrigger && <RelationTrigger callback={ handleAdd } user={ selectedUser }/> }
					{ showRemoveRelation && <RemoveRelation relation={relation} callback={ handleRemove } user={ selectedUser } active={active} /> }

				</div>

				<div className={ styles.Information }>
					<Link href={ `/users/${ selectedUser.id }/relations` }>
						<div>
							<span className={ styles.Counter }>{ selectedUser.relationsCount }</span>
							<span className={ styles.Label }>Relations</span>
						</div>
					</Link>
					<Link href={ `/users/${ selectedUser.id }` }>
						<div>
							<span className={ styles.Counter }>{ selectedUser.resourcesCount }</span>
							<span className={ styles.Label }>Ressources</span>
						</div>
					</Link>
				</div>
			</div>
		</Card>
	);
}

export default UserCard;