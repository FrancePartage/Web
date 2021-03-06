import styles from './AuthCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import LinkButton from '@/components/atoms/LinkButton/LinkButton';

const AuthCard = () => {
  return (
	<Card>
	  <div className={styles.AuthCard}>
			<LinkButton href="/auth/signup">S'inscrire</LinkButton>
			<LinkButton href="/auth/signin">Se connecter</LinkButton>
	  </div>
	</Card>
  );
}

export default AuthCard;