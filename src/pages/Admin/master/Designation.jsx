import { Edit, Plus } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const designationData = [
    { id: 'D-001', name: 'HR Manager', department: 'Human Resources', status: 'active', createdDate: '2025-10-15', description: 'Oversees HR operations and employee relations' },
    { id: 'D-002', name: 'Recruitment Lead', department: 'Human Resources', status: 'active', createdDate: '2025-11-01', description: 'Leads talent acquisition and hiring processes' },
    { id: 'D-003', name: 'Payroll Specialist', department: 'Finance', status: 'inactive', createdDate: '2025-12-05', description: 'Manages payroll processing and compliance' },
    { id: 'D-004', name: 'Frontend Developer', department: 'Engineering', status: 'active', createdDate: '2026-01-20', description: 'Builds user-facing interfaces and experiences' },
    { id: 'D-005', name: 'Operations Coordinator', department: 'Operations', status: 'active', createdDate: '2026-02-10', description: 'Coordinates daily operations and process improvements' },
]

const ManageDesignation = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [designations, setDesignations] = useState(designationData);

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Designation',
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
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 p-2 rounded-md">
                    <Edit size={18} color='blue' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    const designationFormik = useFormik({
        initialValues: {
            designationName: '',
            department: 'Human Resources',
            description: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setDesignations(prev => [
                {
                    id: `D-${prev.length + 1}`,
                    name: values.designationName,
                    department: values.department,
                    description: values.description,
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
                                Manage Designations
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage designation records
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Designation
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={designations}
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
                title={'Add Designation'}
                description={'Create a new designation and assign it to a department'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='designationForm'
            >
                <form id="designationForm" onSubmit={designationFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"Designation Name"}
                                {...designationFormik.getFieldProps('designationName')}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"Description"}
                                {...designationFormik.getFieldProps('description')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                             <SelectInput
                                label={"Department"}
                                {...designationFormik.getFieldProps('department')}
                                options={[
                                    { label: "Human Resources", value: "Human Resources" },
                                    { label: "Finance", value: "Finance" },
                                    { label: "Engineering", value: "Engineering" },
                                    { label: "Operations", value: "Operations" },
                                ]}
                            />
                            <SelectInput
                                label={"Status"}
                                {...designationFormik.getFieldProps('status')}
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

export default ManageDesignation;