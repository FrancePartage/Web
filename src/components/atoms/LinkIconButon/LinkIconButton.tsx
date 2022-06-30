import styles from './LinkIconButton.module.scss';
import Link from "next/link";

type LinkIconButton = {
    children: React.ReactNode,
    href: string,

}

const LinkIconButton = ({children, href = ''}: LinkIconButton) => {
    return (
        <Link href={href}>
            <button className={styles.IconButton}>{children}</button>
        </Link>
    );
}

export default LinkIconButton;