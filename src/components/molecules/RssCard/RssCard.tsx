import styles from './RssCard.module.scss';
import Card from '@/components/atoms/Card/Card';
import LinkButton from '@/components/atoms/LinkButton/LinkButton';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const RssCard = () => {
	return (
		<Card>
			<div className={styles.RssCard}>
				<LinkButton href="/"><FaFacebook /></LinkButton>
				<LinkButton href="/"><FaInstagram /></LinkButton>
				<LinkButton href="/"><FaTwitter /></LinkButton>
			</div>
		</Card>
	);
}

export default RssCard;