import { Edit, Plus } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const stateData = [
    { id: 'ST-001', name: 'Delhi', code: 'DL', status: 'active', createdBy: 'Admin', createdDate: '2025-10-15' },
    { id: 'ST-002', name: 'Uttar Pradesh', code: 'UP', status: 'active', createdBy: 'Admin', createdDate: '2025-11-01' },
    { id: 'ST-003', name: 'Maharashtra', code: 'MH', status: 'active', createdBy: 'Admin', createdDate: '2025-12-05' },
    { id: 'ST-004', name: 'Karnataka', code: 'KA', status: 'inactive', createdBy: 'Admin', createdDate: '2026-01-20' },
    { id: 'ST-005', name: 'Tamil Nadu', code: 'TN', status: 'active', createdBy: 'Admin', createdDate: '2026-02-10' },
]

const ManageStates = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [states, setStates] = useState(stateData);

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'State Name',
            selector: row => (row?.name ?? "N/A"),
        },
        {
            name: 'State Code',
            selector: row => (row?.code ?? "N/A"),
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
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 p-2 rounded-md">
                    <Edit size={18} color='blue' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    const stateFormik = useFormik({
        initialValues: {
            stateName: '',
            code: '',
            createdBy: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setStates(prev => [
                {
                    id: `ST-${String(prev.length + 1).padStart(3, '0')}`,
                    name: values.stateName,
                    code: values.code,
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
                                Manage States
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage state records
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add State
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={states}
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
                title={'Add State'}
                description={'Create a new state and set its code'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='stateForm'
            >
                <form id="stateForm" onSubmit={stateFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"State Name"}
                                {...stateFormik.getFieldProps('stateName')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"State Code"}
                                {...stateFormik.getFieldProps('code')}
                            />

                            <SelectInput
                                label={"Status"}
                                {...stateFormik.getFieldProps('status')}
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

export default ManageStates;