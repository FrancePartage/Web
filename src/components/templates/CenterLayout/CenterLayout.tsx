import styles from './CenterLayout.module.scss';

type CenterLayoutProps = {
	children: React.ReactNode
}

const CenterLayout = ({ children }: CenterLayoutProps)  => {
  return (
	<div className={styles.CenterLayout}>
	  {children}
	</div>
  );
}

export default CenterLayout;