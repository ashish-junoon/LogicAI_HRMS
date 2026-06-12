import { Edit, Plus } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const leaveTypeData = [
    { id: 'LT-001', name: 'Paid Leave', status: 'active', createdBy: 'Aisha Khan', createdDate: '2025-10-15' },
    { id: 'LT-002', name: 'Sick Leave', status: 'active', createdBy: 'David Patel', createdDate: '2025-11-01' },
    { id: 'LT-003', name: 'Maternity Leave', status: 'inactive', createdBy: 'Mira Sharma', createdDate: '2025-12-05' },
    { id: 'LT-004', name: 'Casual Leave', status: 'active', createdBy: 'Emma Lee', createdDate: '2026-01-20' },
    { id: 'LT-005', name: 'Bereavement Leave', status: 'active', createdBy: 'Rohan Verma', createdDate: '2026-02-10' },
]

const ManageLeaveTypes = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaveTypes, setLeaveTypes] = useState(leaveTypeData);

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Leave Type',
            selector: row => (row?.name ?? "N/A"),
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

    const leaveTypeFormik = useFormik({
        initialValues: {
            leaveTypeName: '',
            createdBy: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setLeaveTypes(prev => [
                {
                    id: `LT-${String(prev.length + 1).padStart(3, '0')}`,
                    name: values.leaveTypeName,
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
                                Manage Leave Types
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage leave type records
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Leave Type
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={leaveTypes}
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
                title={'Add Leave Type'}
                description={'Create a new leave type and record who created it'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='leaveTypeForm'
            >
                <form id="leaveTypeForm" onSubmit={leaveTypeFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Leave Type Name"}
                                {...leaveTypeFormik.getFieldProps('leaveTypeName')}
                            />
                             <SelectInput
                                label={"Status"}
                                {...leaveTypeFormik.getFieldProps('status')}
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

export default ManageLeaveTypes;