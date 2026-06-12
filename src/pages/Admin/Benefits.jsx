import { Edit, Eye, Plus } from 'lucide-react';
import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import DataTable from 'react-data-table-component';
import Chip from '../../components/utils/Chip';
import Modal from '../../components/utils/Modal';
import { useFormik } from 'formik';
import SelectInput from '../../components/fields/SelectInput';
import TextInput from '../../components/fields/TextInput';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/utils/SearchInput';

export const dummyBenefitsData = [
    {
        id: 1,
        name: 'Housing Allowance (HA)',
        appliesTo: 'All Employees',
        value: 'Rs. 500',
        status: 'active',
    },
    {
        id: 2,
        name: 'Travel Allowance (TA)',
        appliesTo: 'IT Department',
        value: 'Rs. 5000',
        status: 'active',
    },
    {
        id: 3,
        name: 'Performance Bonus',
        appliesTo: 'All Employees',
        value: 'Rs. 2000',
        status: 'inactive',
    },
];


const Benefits = () => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');

    const columns = [
        {
            name: 'Benefit Name',
            selector: row => row.name,
        },
        {
            name: 'Applies To',
            selector: row => row.appliesTo,
        },
        {
            name: 'Amount',
            selector: row => row.value,
        },
        {
            name: 'Status',
            selector: row => (
                <Chip title={row?.status} color={row?.status === 'active' ? "green" : "red"} />
            ),
        },
        {
            name: 'Action',
            selector: row => (
                <div className="flex gap-4 p-2 rounded-md">
                    <Edit size={18} color='blue' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    const benefitFormik = useFormik({

    })

    return (
        <>
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Benefits
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Benefits alloted to employees
                        </p>
                    </div>

                    <Button
                        icon={Plus}
                        iconRight
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Benefit
                    </Button>
                </div>


                {/* table ui  */}
                <div className="bg-white rounded-xl shadow-sm p-6 pt-5 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between -mt-1 mb-2">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Benefits Alloted
                            </h2>
                <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />

                        </div>

                        <div className="overflow-hidden rounded-tl-xl rounded-tr-xl border border-slate-200">
                            <DataTable.default
                                columns={columns}
                                data={dummyBenefitsData}
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


        </div>
        
        {/* modal  */}
            <Modal
                title={'Create a Benefit'}
                description={''}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='regularizeForm'
            >
                <form id="regularizeForm" onSubmit={benefitFormik.handleSubmit} >
                    <div className="space-y-4">
                        <div>
                            <TextInput
                                label={"Leave Title"}
                                placeholder="allowance name..."
                            />
                        </div>

                        {/* description */}
                        <div>
                            <label className="text-xs text-gray-700 mb-1 block">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                {...benefitFormik.getFieldProps('reason')}
                                placeholder="Enter reason for leave..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                            />
                            {benefitFormik.touched.reason && benefitFormik.errors.reason ? (
                                <ErrorMsg error={benefitFormik.errors.reason} />
                            ) : null}
                        </div>

                         {/* Assigned to */}
                        <SelectInput
                            label="Assigned to"
                            {...benefitFormik.getFieldProps('assignedTo')}
                            options={[
                                { label: "All Employees", value: "all" },
                                { label: "IT Department", value: "dep" },
                            ]}
                            error={benefitFormik.touched.assignedTo && benefitFormik.errors.assignedTo}
                        />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Benefits;