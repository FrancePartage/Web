import styles from './Spinner.module.scss';

const Spinner = () => {
	return (
			<div className={styles.Wrapper}>
				<svg className={styles.Spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
					<circle className={styles.Path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"/>
				</svg>
			</div>
	)
}

export default Spinner;