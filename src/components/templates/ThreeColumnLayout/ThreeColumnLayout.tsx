import styles from './ThreeColumnLayout.module.scss';

type ThreeColumnLayoutProps = {
	children: React.ReactNode,
}

const ThreeColumnLayout = ({ children }: ThreeColumnLayoutProps) => {
  return (
	<div className={styles.ThreeColumnLayout}>
	  {children}
	</div>
  );
}

export default ThreeColumnLayout;