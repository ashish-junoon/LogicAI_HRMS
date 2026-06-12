import { ClipboardClock, Edit, Plus, ShieldCheck, ShieldQuestionMark, ShieldUser, ToolCase, Trash, UsersIcon, Wrench } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';
import { branches } from '../../../content/dummyData';

const branchesData = branches

const ManageBranches = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [branches, setBranches] = useState(branchesData);

    const userColumns = [
        {
            name: 'Branch ID',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Branch Name',
            selector: row => (row?.name ?? "N/A"),
        },
        {
            name: 'Branch State',
            selector: row => row?.state ?? "N/A",
        },
        {
            name: 'Branch City',
            selector: row => row?.city ?? "N/A",

        },
        {
            name: 'Status',
            selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "active" ? 'green' : 'yellow'} />,

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

    const addBranchFormik = useFormik({
        initialValues: {
            asset_id: '',
            type: '',
            model: '',
            serial: '',
            condition: 'New',
            status: 'Available',
            assignedTo: '',
            value: '',
        },
        onSubmit: (values, { resetForm }) => {
            setBranches(prev => [values, ...prev]);
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
                                Manage Branches
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage branches
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Branch
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={userColumns}
                            data={branches}
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
                title={'Add Branch'}
                description={'create branches to the inventory'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='assetForm'
            >
                <form id="assetForm" onSubmit={addBranchFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <SelectInput
                                label={"State"}
                                {...addBranchFormik.getFieldProps('condition')}
                                options={[
                                    { label: "Delhi", value: "Delhi" },
                                    { label: "Kerala", value: "Kerala" },
                                ]}
                            />

                            <SelectInput
                                label={"City"}
                                {...addBranchFormik.getFieldProps('status')}
                                options={[
                                    { label: "New Delhi", value: "New Delhi" },
                                    { label: "Lucknow", value: "Lucknow" },
                                ]}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"Branch Name"}
                                // placeholder="e.g. Lenovo X1"
                                {...addBranchFormik.getFieldProps('model')}
                            />

                            <TextInput
                                label={"Branch Address"}
                                // placeholder="e.g. DLL5430X12345"
                                {...addBranchFormik.getFieldProps('serial')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Contact Number"}
                                // placeholder="e.g. Lenovo X1"
                                {...addBranchFormik.getFieldProps('model')}
                            />

                            <TextInput
                                label={"Email Id"}
                                // placeholder="e.g. DLL5430X12345"
                                {...addBranchFormik.getFieldProps('serial')}
                            />
                        </div>
                        
                    </div>
                </form>
            </Modal>
        
        </>
    )
}

export default ManageBranches;