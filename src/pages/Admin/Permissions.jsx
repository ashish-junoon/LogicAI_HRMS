import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { Edit, List, Plus, Trash, UndoDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import SearchInput from '../../components/utils/SearchInput';
import Chip from '../../components/utils/Chip';

const pagePermissions = [
    {
        id: 1,
        pageName: 'Dashboard',
        url: '/admin/dashboard',
        description: 'View dashboard analytics and summaries.',
        modifiedAt: '2026-05-10',
    },
    {
        id: 2,
        pageName: 'Employees',
        url: '/admin/employees',
        description: 'Manage employee profiles and details.',
        modifiedAt: '2026-05-08',
    },
    {
        id: 3,
        pageName: 'Payroll',
        url: '/admin/payroll',
        description: 'Review and process payroll information.',
        modifiedAt: '2026-05-12',
    },
    {
        id: 4,
        pageName: 'Reports',
        url: '/admin/reports',
        description: 'Access HR reports and export data.',
        modifiedAt: '2026-05-09',
    },
]

const Permissions = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const filtered = pagePermissions.filter(page =>
        page.pageName.toLowerCase().includes(query.toLowerCase()) ||
        page.url.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase())
    );

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
            width: '80px',
        },
        {
            name: 'Page Name',
            selector: row => row?.pageName ?? "N/A",
        },
        {
            name: 'Page URL',
            selector: row => row?.url ?? "N/A",
        },
        {
            name: 'Description',
            selector: row => row?.description ?? "N/A",
            width: '300px',
        },
        {
            name: 'Modified At',
            selector: row => row?.modifiedAt ?? "N/A",
        },
        {
            name: 'Permissions',
            selector: row => (
                <div className="flex gap-4 rounded-md">
                    <p><input type='checkbox' id={row?.id + 'r'} /> <label htmlFor={row?.id + 'r'}>Read</label></p>
                    <p><input type='checkbox' id={row?.id + 'w'} /> <label htmlFor={row?.id + 'w'}>Write</label></p>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-base font-bold text-gray-700 ">
                            User: <span className='uppercase text-md font-mono text-gray-500'> User123 </span>
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage user permissions
                        </p>
                    </div>

                    <Button
                        icon={UndoDot}
                        onClick={() => { navigate(-1) }}
                    >
                        Back
                    </Button>
                </div>


                {/* employee's attendance status  */}
                    <div className="">
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-600">Page Permissions</h2>
                                {/* <p className="text-sm text-gray-500">Currently: 23</p> */}
                            </div>
                            <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />

                        </div>

                        <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                            <DataTable.default
                                columns={columns}
                                data={filtered}
                                pagination
                                highlightOnHover
                                striped
                                customStyles={
                                    {
                                        headRow: {
                                            style: {
                                                backgroundColor: '#f3f4f6',
                                                borderBottomWidth: '1px',
                                                borderBottomColor: '#e5e7eb',
                                                borderTopLeftRadius: '10px',
                                                borderTopRightRadius: '10px',
                                                fontWeight: '700'
                                            },
                                        },
                                    }}
                            />
                        </div>
                    </div>


                </div>
                </div>
        </>
    )
}

export default Permissions;