import styles from './Container.module.scss';

type ContainerProps = {
	children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
	<div className={styles.Container}>
	  {children}
	</div>
  );
}

export default Container;