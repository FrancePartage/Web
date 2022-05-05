import styles from './Heading3.module.scss';

type Heading3Props = {
	children: React.ReactNode
}

const Heading3 = ({ children }: Heading3Props) => {
  return (
    <h3 className={styles.Heading3}>{children}</h3>
  );
}

export default Heading3;