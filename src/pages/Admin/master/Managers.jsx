import { Edit, Plus } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const managerData = [
    { id: 'MG-001', name: 'Aisha Khan', department: 'Human Resources', status: 'active', createdBy: 'Admin', createdDate: '2025-10-15' },
    { id: 'MG-002', name: 'David Patel', department: 'Finance', status: 'active', createdBy: 'Admin', createdDate: '2025-11-01' },
    { id: 'MG-003', name: 'Mira Sharma', department: 'Engineering', status: 'active', createdBy: 'Admin', createdDate: '2025-12-05' },
    { id: 'MG-004', name: 'Emma Lee', department: 'Operations', status: 'inactive', createdBy: 'Admin', createdDate: '2026-01-20' },
    { id: 'MG-005', name: 'Rohan Verma', department: 'Marketing', status: 'active', createdBy: 'Admin', createdDate: '2026-02-10' },
]

const ManageManagers = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [managers, setManagers] = useState(managerData);

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Manager Name',
            selector: row => (row?.name ?? "N/A"),
        },
        {
            name: 'Department',
            selector: row => (row?.department ?? "N/A"),
        },
        {
            name: 'Status',
            selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "active" ? 'green' : 'yellow'} />,
        },
        {
            name: 'Created Date',
            selector: row => (row?.createdDate ?? "N/A"),
        },
        {
            name: 'Created By',
            selector: row => (row?.createdBy ?? "N/A"),
        },
        {
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 p-2 rounded-md">
                    <Edit size={18} color='blue' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    const managerFormik = useFormik({
        initialValues: {
            managerName: '',
            department: 'Human Resources',
            createdBy: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setManagers(prev => [
                {
                    id: `MG-${String(prev.length + 1).padStart(3, '0')}`,
                    name: values.managerName,
                    department: values.department,
                    createdBy: values.createdBy,
                    status: values.status,
                    createdDate: new Date().toLocaleDateString('en-CA'),
                },
                ...prev
            ]);
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
                                Manage Managers
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage manager records
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Manager
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={managers}
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
                title={'Add Manager'}
                description={'Create a new manager and assign department'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='managerForm'
            >
                <form id="managerForm" onSubmit={managerFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"Manager Name"}
                                {...managerFormik.getFieldProps('managerName')}
                            />
                            
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <SelectInput
                                label={"Department"}
                                {...managerFormik.getFieldProps('department')}
                                options={[
                                    { label: "Human Resources", value: "Human Resources" },
                                    { label: "Finance", value: "Finance" },
                                    { label: "Engineering", value: "Engineering" },
                                    { label: "Operations", value: "Operations" },
                                    { label: "Marketing", value: "Marketing" },
                                ]}
                            />
                            <SelectInput
                                label={"Status"}
                                {...managerFormik.getFieldProps('status')}
                                options={[
                                    { label: "Active", value: "active" },
                                    { label: "Inactive", value: "inactive" },
                                ]}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        
        </>
    )
}

export default ManageManagers;