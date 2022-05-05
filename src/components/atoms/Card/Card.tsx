import styles from './Card.module.scss';

type CardProps = {
	children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
	<div className={styles.Card}>
	  {children}
	</div>
  );
}

export default Card;