import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonProps = {
	children: React.ReactNode,
	light?: boolean,
	red?: boolean,
	orange?: boolean,
	onClick?: () => void
}

const Button = ({ children, light = false, red = false, orange = false, onClick }: ButtonProps) => {
	return (
		<button onClick={ onClick } className={ classNames(styles.Button, {
			[styles.Light]: light,
			[styles.Red]: red,
			[styles.Orange]: orange
		}) }>{ children }</button>
	);
}

export default Button;