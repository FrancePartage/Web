import styles from './Alert.module.scss';
import classNames from 'classnames';

type AlertProps = {
	text: string,
	type?: 'error' | 'success'
}

const Alert = ({ text, type = 'error' }: AlertProps) => {
  const style = type === 'error' ? styles.Error : styles.Success;

  return (
    <div className={classNames(styles.Alert, style)}>
      <p>{text}</p>
    </div>
  );
}

export default Alert;