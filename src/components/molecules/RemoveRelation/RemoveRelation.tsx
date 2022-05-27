import styles from './RemoveRelation.module.scss';
import Button from '@/components/atoms/Button/Button';
import { UserRemoveIcon } from '@heroicons/react/outline';
import { cancelRequest, deleteRelation } from '@/packages/api/relations';

type RemoveRelationProps = {
	relation: any;
	user: any;
	callback: any;
	active: boolean;
}

const RemoveRelation = ({ relation, user, callback, active }: RemoveRelationProps) => {
	const handleRemoveRelation = async () => {
		if (!relation)
			return;

		if (active) {
			if (await deleteRelation(relation.id))
				callback();
		} else {
			if (await cancelRequest(relation.id))
				callback();
		}
	}

	return (
		<div className={styles.RemoveRelation}>
			<Button red={active} orange={!active} onClick={handleRemoveRelation}><UserRemoveIcon /></Button>
		</div>
	);
}

export default RemoveRelation;