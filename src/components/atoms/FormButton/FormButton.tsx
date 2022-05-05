import styles from './FormButton.module.scss';

type FormButtonProps = {
	value: string,
	style?: React.CSSProperties
}

const FormButton = ({ value = "Valider" , style}: FormButtonProps) => {
  return (
    <input type="submit" value={value} className={styles.FormButton} style={style} />
  );
}

export default FormButton;