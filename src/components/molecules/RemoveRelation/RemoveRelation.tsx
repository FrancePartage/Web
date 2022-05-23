import styles from './RemoveRelation.module.scss';
import Button from '@/components/atoms/Button/Button';
import { UserRemoveIcon } from '@heroicons/react/outline';

type RemoveRelationProps = {
	user: any;
	callback: any;
	active: boolean;
}

const RemoveRelation = ({ user, callback, active }: RemoveRelationProps) => {
	const handleRemoveRelation = async () => {
		/*
		if (await removeRelation(user.email))
			callback();
		*/
	}

	return (
		<div className={styles.RemoveRelation}>
			<Button red={active} orange={!active} onClick={handleRemoveRelation}><UserRemoveIcon /></Button>
		</div>
	);
}

export default RemoveRelation;