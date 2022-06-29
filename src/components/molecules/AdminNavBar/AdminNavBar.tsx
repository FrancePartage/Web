import styles from './AdminNavbar.module.scss';
import Card from '@/components/atoms/Card/Card';
import Link from 'next/link';

const AdminNavbar = () => {
    return (
        <div className={ styles.Content }>
            <Card>
                <div className={ styles.NavBar }>
                    <ul>
                        <li>
                            <Link href="/admin">
                                <a>
                                    Dashboard
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/resources">
                                <a>
                                    Ressources actives
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/resources/pending">
                                <a>
                                    Ressources en attente
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users">
                                <a>
                                    Utilisateurs
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    );
}

export default AdminNavbar;