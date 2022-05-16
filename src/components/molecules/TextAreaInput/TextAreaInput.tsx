import styles from './TextAreaInput.module.scss';
import Label from '@/components/atoms/Label/Label';

type TextAreaInputProps = {
	label: string;
	formKey: any;
}

const TextAreaInput = ({ label, formKey}: TextAreaInputProps) => {
	const id = label.replaceAll(' ', '_');

	return (
		<div className={ styles.TextAreaGroup }>
			<Label htmlFor={ id }>{ label }</Label>
			<textarea { ...formKey } className={ styles.TextArea } id={ id }/>
		</div>
	);
}

export default TextAreaInput;