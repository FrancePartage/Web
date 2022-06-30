import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import AdminNavBar from '@/components/molecules/AdminNavBar/AdminNavBar';
import Card from '@/components/atoms/Card/Card';
import DataTable from 'react-data-table-component';
import {useEffect, useState} from 'react';
import {userRole} from '@/utils/string-utils'
import {getUsers, updateUserRole} from '@/packages/api/users';
import Select from 'react-select';

import {NextPage} from 'next';
import {isMaybeAuthentificated} from '@/utils/auth';
import Spinner from '@/components/atoms/Spinner/Spinner';

type HomePageProps = {
    user?: any;
}


const AdminUsersPage: NextPage = ({user}: HomePageProps) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [render, setRender] = useState(0);

    const columns =
        [
            {
                name: 'Id',
                selector: (row: any) => row.id, // accessor is the 'key' in the data
                sortable: true,
                grow: 1,
            },
            {
                name: 'Nom',
                selector: (row: any) => row.name, // accessor is the "key" in the data
                sortable: true
            },
            {
                name: 'Prénom',
                selector: (row: any) => row.firstname, // accessor is the "key" in the data
                sortable: true
            },
            {
                name: 'Email',
                selector: (row: any) => row.mail, // accessor is the "key" in the data
                sortable: true
            },
            {
                name: 'Rôle',
                selector: (row: any) => row.role, // accessor is the "key" in the data
                sortable: true
            },
            {
                name: 'Actions',
                selector: (row: any) => row.actions, // accessor is the "key" in the data
                ignoreRowClick: true,
                cell: (row: any) => <>
                    <Select
                        placeholder={'Changer de status'}
                        options={options}
                        onChange={(e) => {
                            handleRoleChange( row.id ,e)
                        }}
                    />
                </>,
            },
        ];

    const options = [
        {value: 'ADMIN', label: 'Administrateur'},
        {value: 'MODERATOR', label: 'Modérateur'},
        {value: 'CITIZEN', label: 'Citoyen'}
    ]

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

    const handleRoleChange = async (id: number, e: any) => {
        updateUserRole(id, e.value)
            .then(() => setRender(prevState => prevState + 1))
    };

    useEffect(() => {
        fetchUsers(1, perPage); // fetch page 1 of users
    }, [])

    useEffect(() => {
        fetchUsers(1, perPage); // fetch page 1 of users
    }, [render])

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setLoading(true);

        const res = await getUsers(page, newPerPage);

        const docs: any[] = [];

        res.data.map((user: any) => {
            docs.push(
                {
                    id: user.id,
                    name: user.lastname,
                    firstname: user.firstname,
                    mail: user.email,
                    role: userRole(user.role),
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
                    title='Utilisateurs'
                    columns={columns}
                    data={data}
                    highlightOnHover={true}
                    responsive={false}
                    noDataComponent={<Spinner/>}
                    progressComponent={<Spinner/>}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                />
            </Card>


        </DefaultLayout>
    )
}

AdminUsersPage.getInitialProps = async (ctx) => {
    return isMaybeAuthentificated(ctx);
}

export default AdminUsersPage;