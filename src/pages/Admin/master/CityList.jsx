import { Edit, Plus } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const cityData = [
    { id: 'CT-001', name: 'New Delhi', state: 'Delhi', code: 'NDL', status: 'active', createdBy: 'Admin', createdDate: '2025-10-15' },
    { id: 'CT-002', name: 'Lucknow', state: 'Uttar Pradesh', code: 'LKO', status: 'active', createdBy: 'Admin', createdDate: '2025-11-01' },
    { id: 'CT-003', name: 'Mumbai', state: 'Maharashtra', code: 'BOM', status: 'active', createdBy: 'Admin', createdDate: '2025-12-05' },
    { id: 'CT-004', name: 'Bengaluru', state: 'Karnataka', code: 'BLR', status: 'inactive', createdBy: 'Admin', createdDate: '2026-01-20' },
    { id: 'CT-005', name: 'Chennai', state: 'Tamil Nadu', code: 'MAA', status: 'active', createdBy: 'Admin', createdDate: '2026-02-10' },
]

const ManageCities = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cities, setCities] = useState(cityData);

    const columns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'City Name',
            selector: row => (row?.name ?? "N/A"),
        },
        {
            name: 'State',
            selector: row => (row?.state ?? "N/A"),
        },
        {
            name: 'City Code',
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

    const cityFormik = useFormik({
        initialValues: {
            cityName: '',
            state: 'Delhi',
            code: '',
            createdBy: '',
            status: 'active',
        },
        onSubmit: (values, { resetForm }) => {
            setCities(prev => [
                {
                    id: `CT-${String(prev.length + 1).padStart(3, '0')}`,
                    name: values.cityName,
                    state: values.state,
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
                                Manage Cities
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage city records
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add City
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={cities}
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
                title={'Add City'}
                description={'Create a new city and assign it to a state'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='cityForm'
            >
                <form id="cityForm" onSubmit={cityFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                            <TextInput
                                label={"City Name"}
                                {...cityFormik.getFieldProps('cityName')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <SelectInput
                                label={"State"}
                                {...cityFormik.getFieldProps('state')}
                                options={[
                                    { label: "Delhi", value: "Delhi" },
                                    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
                                    { label: "Maharashtra", value: "Maharashtra" },
                                    { label: "Karnataka", value: "Karnataka" },
                                    { label: "Tamil Nadu", value: "Tamil Nadu" },
                                ]}
                            />

                            <TextInput
                                label={"City Code"}
                                {...cityFormik.getFieldProps('code')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <SelectInput
                                label={"Status"}
                                {...cityFormik.getFieldProps('status')}
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

export default ManageCities;