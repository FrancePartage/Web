import NavBar from '@/components/molecules/Navbar/Navbar';
import Container from '@/components/atoms/Container/Container';
import Footer from '@/components/molecules/Footer/Footer';
import styles from './DefaultLayout.module.scss';

type DefaultLayoutProps = {
	children: React.ReactNode,
	user?: any
}

const DefaultLayout = ({ children, user }: DefaultLayoutProps) => {
	return (
		<div className={styles.DefaultLayout}>
			<NavBar user={ user }/>
			<Container>
				{ children }
			</Container>
			<div className={styles.Separator}></div>
			<Footer/>
		</div>
	);
}

export default DefaultLayout;