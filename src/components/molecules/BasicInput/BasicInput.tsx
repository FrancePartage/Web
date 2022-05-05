import styles from './BasicInput.module.scss';
import Label from '@/components/atoms/Label/Label';
import { randomGuid } from "@/utils/string-utils";

type BasicInputProps = {
	type?: string,
	label?: string,
	disabled?: boolean,
	formKey?: any
}

const BasicInput = ({ type = 'text', label, disabled = false, formKey }: BasicInputProps) => {

	const id = randomGuid();

	return (
		<div className={ styles.BasicInputGroup }>
			{ label && <Label htmlFor={ id }>{ label }</Label> }
			<input { ...formKey } className={ styles.BasicInput } type={ type } id={ id } disabled={ disabled }/>
		</div>
	);
}

export default BasicInput;