import styles from './RelationTrigger.module.scss';
import Button from '@/components/atoms/Button/Button';
import { UserAddIcon } from '@heroicons/react/outline';
import Dropdown from '@/components/molecules/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { addRelation } from '@/packages/api/relations';

type RelationTriggerProps = {
	user: any;
	callback: any;
}

const RelationTrigger = ({ user, callback }: RelationTriggerProps) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: 'Ami', onClick: () => { handleAddRelation('FRIEND') } },
		{ label: 'Conjoint', onClick: () => { handleAddRelation('SPOUSE') } },
		{ label: 'Collègue', onClick: () => { handleAddRelation('WORKMATE') } },
		{ label: 'Famille', onClick: () => { handleAddRelation('FAMILY') } },
	]);

	const handleAddRelation = async (type: any) => {
		if (await addRelation(user.id, type))
			callback();
		setDropdownOpen(false);
	}

	const handleButtonClick = () => {
		setDropdownOpen(!dropdownOpen);
	}

	return (
		<div className={ styles.RelationTrigger }>
			<Button light onClick={ handleButtonClick }><UserAddIcon/></Button>
			<Dropdown items={ items } open={ dropdownOpen }/>
		</div>
	);
}

export default RelationTrigger;