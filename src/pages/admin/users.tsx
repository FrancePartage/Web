import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import AdminNavBar from '@/components/molecules/AdminNavBar/AdminNavBar';
import Card from '@/components/atoms/Card/Card';
import DataTable from "react-data-table-component";
import {useEffect, useState} from "react";
import IconButton from '@/components/atoms/IconButton/IconButton'
import {CheckIcon, EyeIcon, TrashIcon} from "@heroicons/react/outline";
import {userRole} from '@/utils/string-utils'
import {getUsers} from "@/packages/api/users";
import {MinusCircleIcon} from "@heroicons/react/solid";


import {NextPage} from "next";
import {isMaybeAuthentificated} from "@/utils/auth";

type HomePageProps = {
    user?: any;
}

const columns =
    [
        {
            name: 'Id',
            selector: row => row.id, // accessor is the "key" in the data
        },
        {
            name: 'Nom',
            selector: row => row.name, // accessor is the "key" in the data
        },
        {
            name: 'Prénom',
            selector: row => row.firstname, // accessor is the "key" in the data
        },
        {
            name: 'Email',
            selector: row => row.mail, // accessor is the "key" in the data
        },
        {
            name: 'Rôle',
            selector: row => row.role, // accessor is the "key" in the data
        },
        {
            name: 'Actif',
            selector: row => row.active, // accessor is the "key" in the data
        },
        {
            name: 'Actions',
            selector: row => row.actions, // accessor is the "key" in the data
        },
    ];

const AdminUsersPage: NextPage = ({user}: HomePageProps) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [render, setRender] = useState(0);

    const fetchUsers = async (page: number, perPage: number) => {
        setLoading(true);

        const res = await getUsers(page, perPage);
        console.log(res);
        const docs: any[] = [];

        res.data.map((user: any) => {
            docs.push(
                {
                    id: user.id,
                    name: user.lastname,
                    firstname: user.firstname,
                    mail: user.email,
                    role: userRole(user.role),
                    active: user.active ? "Actif" : "Inactif",
                    actions: <>
                        <IconButton onClick={() => {
                        }}>
                            <MinusCircleIcon/>
                        </IconButton>
                        <IconButton onClick={() => {
                        }}>
                            <TrashIcon/>
                        </IconButton></>,
                }
            );
        })

        setData(docs);
        setTotalRows(res.pagination.itemsCount);
        setLoading(false);
    };

    const handlePageChange = async (page: number) => {
        await fetchUsers(page, perPage);
    };

    useEffect(() => {
        fetchUsers(1, perPage); // fetch page 1 of users
    }, [])

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setLoading(true);

        const res = await getResources(page, newPerPage);

        const docs: any[] = [];

        res.data.map((user: any) => {
            docs.push(
                {
                    id: user._id,
                    name: user.lastName,
                    firstname: user.firstName,
                    mail: user.email,
                    role: userRole(user.roleId),
                    active: user.active ? "Actif" : "Inactif",
                    actions: <>
                        <IconButton><EyeIcon/></IconButton><IconButton><MinusCircleIcon/></IconButton><IconButton><TrashIcon/></IconButton></>,
                }
            );
        })


        setData(docs);
        setTotalRows(res.pagination.itemsCount);
        setLoading(false);
    };

    return (
        <DefaultLayout user={user}>
            <AdminNavBar/>
            <Card>
                <DataTable
                    title="Ressources"
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                >
                </DataTable>
            </Card>
        </DefaultLayout>
    )
}

AdminUsersPage.getInitialProps = async (ctx) => {
    return isMaybeAuthentificated(ctx);
}

export default AdminUsersPage;