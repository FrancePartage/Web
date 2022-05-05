import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.Footer}>
			<p>&copy; {new Date().getFullYear()} FrancePartage</p>
		</footer>
	);
}

export default Footer;