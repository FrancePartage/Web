import styles from './LinkButton.module.scss';
import Link from 'next/link';

type LinkButtonProps = {
	children: React.ReactNode,
	href: string
}

const LinkButton = ({ children, href = '' }: LinkButtonProps) => {
  return (
	<Link href={href}>
	  <a className={styles.LinkButton}>
		{children}
	  </a>
	</Link>
  );
}

export default LinkButton;