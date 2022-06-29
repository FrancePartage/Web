import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import AdminNavBar from '@/components/molecules/AdminNavBar/AdminNavBar';
import {NextPage} from "next";
import {isMaybeAuthentificated} from "@/utils/auth";
type HomePageProps = {
    user?: any;
}

const AdminHomePage: NextPage = ({ user }: HomePageProps) => {
    return (
        <DefaultLayout user={user}>
                <AdminNavBar />
        </DefaultLayout>
    )
}

AdminHomePage.getInitialProps = async (ctx) => {
    return isMaybeAuthentificated(ctx);
}

export default AdminHomePage;