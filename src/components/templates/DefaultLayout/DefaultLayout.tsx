import NavBar from '@/components/molecules/Navbar/Navbar';
import useUser from '@/packages/hooks/use-user';
import Container from '@/components/atoms/Container/Container';
import Footer from '@/components/molecules/Footer/Footer';
import styles from './DefaultLayout.module.scss';

type DefaultLayoutProps = {
	children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
	const user = useUser();

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