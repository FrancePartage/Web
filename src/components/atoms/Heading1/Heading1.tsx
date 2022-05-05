import styles from './Heading1.module.scss';

type Heading1Props = {
	children: React.ReactNode
}

const Heading1 = ({ children }: Heading1Props) => {
  return (
    <h1 className={styles.Heading1}>{children}</h1>
  );
}

export default Heading1;