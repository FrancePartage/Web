import styles from './AuthLayout.module.scss';
import Logo from '@/components/atoms/Logo/Logo';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import Footer from '@/components/molecules/Footer/Footer';

type AuthLayoutProps = {
	children: React.ReactNode,
	title: string,
}

const AuthLayout = ({ title = '', children }: AuthLayoutProps) => {
	return (
		<div className={ styles.AuthLayout }>
			<Logo width={ 75 } height={ 75 }/>
			<Heading1>{ title }</Heading1>
			{ children }
			<div className={styles.Separator}></div>
			<Footer/>
		</div>
	);
}

export default AuthLayout;