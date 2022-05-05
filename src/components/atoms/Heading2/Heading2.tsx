import styles from './Heading2.module.scss';

type Heading2Props = {
	children: React.ReactNode
}

const Heading2 = ({ children }: Heading2Props) => {
  return (
    <h2 className={styles.Heading2}>{children}</h2>
  );
}

export default Heading2;