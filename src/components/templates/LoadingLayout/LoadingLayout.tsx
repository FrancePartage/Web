import styles from './LoadingLayout.module.scss';
import Spinner from '@/components/atoms/Spinner/Spinner';

const LoadingLayout = () => {
	return (
			<div className={ styles.LoadingLayout }>
				<Spinner/>
			</div>
	);
}

export default LoadingLayout;