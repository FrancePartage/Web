import styles from './BasicInput.module.scss';
import Label from '@/components/atoms/Label/Label';

type BasicInputProps = {
	type?: string,
	label?: string,
	disabled?: boolean,
	formKey?: any
}

const BasicInput = ({ type = 'text', label, disabled = false, formKey }: BasicInputProps) => {

	const id = label ? label.replace(' ', '-') : 'input-id';

	return (
		<div className={ styles.BasicInputGroup }>
			{ label && <Label htmlFor={ id }>{ label }</Label> }
			<input { ...formKey } className={ styles.BasicInput } type={ type } id={ id } disabled={ disabled }/>
		</div>
	);
}

export default BasicInput;