import styles from './Label.module.scss';

type LabelProps = {
	children: React.ReactNode
	htmlFor: string
}

const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={styles.Label}>{children}</label>
  );
}

export default Label;