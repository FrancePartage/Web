import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import AdminNavBar from '@/components/molecules/AdminNavBar/AdminNavBar';
import {NextPage} from 'next';
import {isMaybeAuthentificated} from '@/utils/auth';
import Card from '@/components/atoms/Card/Card';
import styles from '@/styles/pages/admin.module.scss'
import {getResources} from '@/packages/api/resources';
import {useEffect, useState} from 'react';
import {getUsers} from '@/packages/api/users';
import Heading2 from '@/components/atoms/Heading2/Heading2';
import Spinner from '@/components/atoms/Spinner/Spinner';

type HomePageProps = {
    user?: any;
}

const AdminHomePage: NextPage = ({user}: HomePageProps) => {
    const [totalResources, setTotalResources] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [loading, setLoading] = useState(true);

    const fetchData = async (page: number) => {
        setLoading(true);
        const resResources = await getResources(page);
        const resUsers = await getUsers(page);

        setTotalResources(resResources.pagination.itemsCount);
        setTotalUsers(resUsers.pagination.itemsCount);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(1)
    }, []);

    return (
        <DefaultLayout user={user}>
            <AdminNavBar/>
            <Card>
                {loading ? <Spinner/>
                    :
                    <div className={styles.SplitContainer}>
                        <div>
                            <Heading2>Nombre de ressources</Heading2>
                            <p className={styles.CenteredDiv}>{totalResources}</p>
                        </div>
                        <div>
                            <Heading2>Nombre d&amp;apos;utilisateurs</Heading2>
                            <p className={styles.CenteredDiv}>{totalUsers}</p>
                        </div>
                    </div>
                }

            </Card>
        </DefaultLayout>
    )
}

AdminHomePage.getInitialProps = async (ctx) => {
    return isMaybeAuthentificated(ctx);
}

export default AdminHomePage;