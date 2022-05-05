import styles from './IconButton.module.scss';

type IconButtonProps = {
	onClick: () => void,
	children: React.ReactNode
}

const IconButton = ({ onClick, children }: IconButtonProps) => {
	return (
		<button onClick={ onClick } className={ styles.IconButton }>{ children }</button>
	);
}

export default IconButton;