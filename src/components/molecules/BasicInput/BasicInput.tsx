import styles from './BasicInput.module.scss';
import Label from '@/components/atoms/Label/Label';

type BasicInputProps = {
	type?: string,
	label?: string,
	disabled?: boolean,
	formKey?: any
}

const BasicInput = ({ type = 'text', label, disabled = false, formKey }: BasicInputProps) => {

	const id = label ? label.replace(' ', '-').toLowerCase() : 'input-id';

	return (
		<div className={ styles.BasicInputGroup }>
			{ label && <Label htmlFor={ id }>{ label }</Label> }
			<input { ...formKey } className={ styles.BasicInput } type={ type === 'image' ? 'file' : type } id={ id } disabled={ disabled } accept={ type === 'image' ? 'image/png, image/jpeg' : null } />
		</div>
	);
}

export default BasicInput;