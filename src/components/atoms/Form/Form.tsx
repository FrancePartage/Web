import styles from './Form.module.scss';
import classnames from "classnames";

type FormProps = {
	children: React.ReactNode,
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
	className?: string
}

const Form = ({ children, onSubmit, className }: FormProps) => {
	return (
		<form onSubmit={ onSubmit } className={ classnames([styles.Form], [className]) }>
			{ children }
		</form>
	);
}

export default Form;