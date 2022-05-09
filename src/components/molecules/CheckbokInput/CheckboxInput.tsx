import styles from './CheckboxInput.module.scss';
import Label from '@/components/atoms/Label/Label';

type CheckboxInputProps = {
	label?: string,
	disabled?: boolean,
	formKey?: any
}

const CheckboxInput = ({ label, disabled = false, formKey }: CheckboxInputProps) => {

	const id = label ? label.replace(' ', '-') : 'checkbox-id';

	return (
		<div className={ styles.CheckboxInputGroup }>
			<input { ...formKey } className={ styles.CheckboxInput } type="checkbox" id={ id } disabled={ disabled } />
			{ label && <Label htmlFor={ id }>{ label }</Label> }
		</div>
	);
}

export default CheckboxInput;