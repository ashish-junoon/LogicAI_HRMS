import { Edit, Plus } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const departmentData = [
    { id: 'DP-001', name: 'Human Resources', status: 'active', createdBy: 'Aisha Khan', createdDate: '2025-10-15' },
    { id: 'DP-002', name: 'Finance', status: 'active', createdBy: 'David Patel', createdDate: '2025-11-01' },
    { id: 'DP-003', name: 'Engineering', status: 'active', createdBy: 'Mira Sharma', createdDate: '2025-12-05' },
    { id: 'DP-004', name: 'Operations', status: 'inactive', createdBy: 'Emma Lee', createdDate: '2026-01-20' },
    { id: 'DP-005', name: 'Recruitment', status: 'active', createdBy: 'Rohan Verma', createdDate: '2026-02-10' },
]

const ManageDepartments = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departments, setDepartments] = useState(departmentData);

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Department Name',
            selector: row => (row?.name ?? "N/A"),
        },
        {
            name: 'Status',
            selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "active" ? 'green' : 'yellow'} />,
        },
        
        {
            name: 'Created By',
            selector: row => (row?.createdBy ?? "N/A"),
        },
        {
            name: 'Created Date',
            selector: row => (row?.createdDate ?? "N/A"),
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

    const departmentFormik = useFormik({
        initialValues: {
            departmentName: '',
            createdBy: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setDepartments(prev => [
                {
                    id: `DP-${String(prev.length + 1).padStart(3, '0')}`,
                    name: values.departmentName,
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
                                Manage Departments
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage department records
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Department
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={departments}
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
                title={'Add Department'}
                description={'Create a new department and record the creator'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='departmentForm'
            >
                <form id="departmentForm" onSubmit={departmentFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"Department Name"}
                                {...departmentFormik.getFieldProps('departmentName')}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <SelectInput
                                label={"Status"}
                                {...departmentFormik.getFieldProps('status')}
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

export default ManageDepartments;