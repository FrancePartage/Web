import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import AdminNavBar from '@/components/molecules/AdminNavBar/AdminNavBar';
import Card from '@/components/atoms/Card/Card';
import DataTable from 'react-data-table-component';
import {useEffect, useState} from 'react';
import {getResources, updateStatus} from '@/packages/api/resources';
import {resourceStatus} from '@/utils/string-utils';
import moment from 'moment';
import IconButton from '@/components/atoms/IconButton/IconButton'
import {EyeIcon, TrashIcon} from '@heroicons/react/outline';


import {NextPage} from 'next';
import {isMaybeAuthentificated} from '@/utils/auth';
import {MinusCircleIcon} from '@heroicons/react/solid';
import LinkIconButton from '@/components/atoms/LinkIconButon/LinkIconButton';
import Spinner from '@/components/atoms/Spinner/Spinner';

type HomePageProps = {
    user?: any;
}

const AdminResourcesActivePage: NextPage = ({user}: HomePageProps) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [render, setRender] = useState(0);

    const columns =
        [
            {
                name: 'Id',
                selector: row => row.id,
                sortable: true,
            },
            {
                name: 'Utilisateur',
                selector: row => row.user,
                sortable: true,
            },
            {
                name: 'Date de demande',
                selector: row => row.date,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },
            {
                name: 'Actions',
                selector: row => row.actions,
                cell: row => <>
                    <LinkIconButton href={`/resources/${row.id}`}><EyeIcon/></LinkIconButton>
                    <IconButton onClick={() => handlePending(row)}><MinusCircleIcon/></IconButton>
                    <IconButton onClick={() => handleDelete(row)}><TrashIcon/></IconButton>
                </>,
                sortable: true,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true
            },
        ];

    const fetchResources = async (page: number, perPage: number) => {
        setLoading(true);

        const res = await getResources(page, perPage);
        console.log(res);
        const docs: any[] = [];

        res.data.map((resource: any) => {
            docs.push(
                {
                    id: resource.id,
                    user: resource.author.displayName,
                    date: moment(resource.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    status: resourceStatus(resource.status),
                }
            );
        })

        setData(docs);
        setTotalRows(res.pagination.itemsCount);
        setLoading(false);
    };

    const handlePageChange = async (page: number) => {
        await fetchResources(page, perPage);
    };

    const handleDelete = (row: any) => {
        updateStatus(row.id, 'INACTIVE')
            .then(() => setRender(prevState => prevState + 1))
    }

    const handlePending = (row: any) => {
        console.log(row);
        updateStatus(row.id, 'PENDING')
            .then(() => setRender(prevState => prevState + 1))
    }

    useEffect(() => {
        fetchResources(1, perPage); // fetch page 1 of users
    }, [])

    useEffect(() => {
        fetchResources(1, perPage); // fetch page 1 of users
    }, [render])

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setLoading(true);

        const res = await getResources(page, newPerPage);

        const docs: any[] = [];

        res.data.map((resource: any) => {
            docs.push(
                {
                    id: resource.id,
                    user: resource.author.displayName,
                    date: moment(resource.createdAt).format('DD/MM/YYYY HH:mm:ss'),
                    status: resourceStatus(resource.status),
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
                    title='Ressources actives'
                    columns={columns}
                    data={data}
                    highlightOnHover={true}
                    noDataComponent={<Spinner/>}
                    progressComponent={<Spinner/>}
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

AdminResourcesActivePage.getInitialProps = async (ctx) => {
    return isMaybeAuthentificated(ctx);
}

export default AdminResourcesActivePage;