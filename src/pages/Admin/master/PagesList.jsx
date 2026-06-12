import { Edit, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const pagesData = [
    { id: 1, group: 'Admin', name: 'Dashboard', url: '/admin/dashboard', description: 'Admin overview and quick actions', status: 'active' },
    { id: 2, group: 'HR', name: 'Employees', url: '/admin/employees', description: 'Manage employee records and details', status: 'active' },
    { id: 3, group: 'Payroll', name: 'Payslips', url: '/admin/payslips', description: 'Generate and view employee payslips', status: 'inactive' },
];

const ManagePages = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pages, setPages] = useState(pagesData);

    const userColumns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Group Name',
            selector: row => (row?.group ?? "N/A"),
        },
        {
            name: 'Page Name',
            selector: row => row?.name ?? "N/A",
        },
        {
            name: 'Page URL',
            selector: row => row?.url ?? "N/A",

        },
        {
            name: 'Description',
            selector: row => row?.description ?? "N/A",

        },
        {
            name: 'Status',
            selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "active" ? 'green' : 'yellow'} />,

        },
        // {
        //     name: 'Actions',
        //     selector: row => (
        //         <div className="flex gap-4 p-2 rounded-md">
        //             <Edit size={18} color='blue' className='cursor-pointer' />
        //         </div>
        //     ),
        // },
    ];

    const addPageFormik = useFormik({
        initialValues: {
            group: '',
            name: '',
            url: '',
            description: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setPages(prev => [{ id: prev.length + 1, ...values }, ...prev]);
            resetForm();
            setIsModalOpen(false);
        }
    })

    return (
        <>
            <div className="flex h-full bg-gray-50">
                <div className="flex-1 overflow-y-auto p-6">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Manage Pages
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create and manage application pages
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Page
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={userColumns}
                            data={pages}
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


            {/* modal  */}
            <Modal
                title={'Add Page'}
                description={'Create a new page and define its group, URL and status.'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='pageForm'
            >
                <form id="pageForm" onSubmit={addPageFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Page Group"}
                                {...addPageFormik.getFieldProps('group')}
                            />

                            <TextInput
                                label={"Page Name"}
                                {...addPageFormik.getFieldProps('name')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Page URL"}
                                placeholder="e.g. /admin/dashboard"
                                {...addPageFormik.getFieldProps('url')}
                            />

                             <SelectInput
                                label={"Status"}
                                {...addPageFormik.getFieldProps('status')}
                                options={[
                                    { label: "Active", value: "active" },
                                    { label: "Inactive", value: "inactive" },
                                ]}
                            />

                            
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"Description"}
                                placeholder="Enter page description"
                                {...addPageFormik.getFieldProps('description')}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        
        </>
    )
}

export default ManagePages;