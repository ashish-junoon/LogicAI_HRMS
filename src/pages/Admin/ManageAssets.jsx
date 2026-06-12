import { ClipboardClock, Edit, Plus, ShieldCheck, ShieldQuestionMark, ShieldUser, ToolCase, Trash, UsersIcon, Wrench } from 'lucide-react';
import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import KPI from '../../components/utils/KPI';
import DataTable from 'react-data-table-component';
import Chip from '../../components/utils/Chip';
import Modal from '../../components/utils/Modal';
import { useFormik } from 'formik';
import TextInput from '../../components/fields/TextInput';
import SelectInput from '../../components/fields/SelectInput';
import SearchInput from '../../components/utils/SearchInput';

const kpiData = [
    { label: 'Total Assets', value: '2', icon: ToolCase, color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'Assigned', value: '15', unit: "", icon: ShieldUser, color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'Available', value: '06', unit: "", icon: ShieldQuestionMark, color: '#0284c7', bgColor: '#e0f2fe', },
    { label: 'Under Repair', value: '06', unit: "", icon: Wrench, color: '#0284c7', bgColor: '#e0f2fe', },
];

const assetsDetails = [
    { asset_id: 'JSP-LAP-2024-001', serial: "DLL5430X12345", type: 'Laptop', model: 'Lenovo X1', condition: "New", value: "₹45000", status: 'Assigned', assignedTo: "Mr. XYz" },
    { asset_id: 'JSP-LAP-2024-002', serial: "DLL5430X12345", type: 'Mouse', model: 'LogiTech', condition: "New", value: "₹45000", status: 'Available', assignedTo: "-" },
    { asset_id: 'JSP-LAP-2024-003', serial: "DLL5430X12345", type: 'Keyboard', model: 'Zebronics', condition: "New", value: "₹45000", status: 'Available', assignedTo: "-" },
    { asset_id: 'JSP-LAP-2024-004', serial: "DLL5430X12345", type: 'Laptop', model: 'Lenovo Thinkpad', condition: "New", value: "₹45000", status: 'Available', assignedTo: "-" },
]

const ManageAssets = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assets, setAssets] = useState(assetsDetails);
    const [query, setQuery] = useState('');

    const userColumns = [
        {
            name: 'Asset ID',
            selector: row => row?.asset_id ?? "N/A",
        },
        {
            name: 'Type',
            selector: row => (row?.type ?? "N/A"),
        },
        {
            name: 'Brand & Model',
            selector: row => row?.model ?? "N/A",
        },
        {
            name: 'Serial Number',
            selector: row => row?.serial ?? "N/A",

        },
        {
            name: 'Condition',
            selector: row => <Chip title={row?.condition ?? "N/A"} color={row?.condition === "New" ? 'green' : 'yellow'} />,
        },
        {
            name: 'Status',
            selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "Available" ? 'green' : 'yellow'} />,

        },
        {
            name: 'Assigned To',
            selector: row => row?.assignedTo ?? "N/A",
        },
        {
            name: 'Value',
            selector: row => row?.value ?? "N/A",
        },
        {
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 p-2 rounded-md">
                    <Edit size={18} color='blue' className='cursor-pointer' />
                    <Trash size={18} color='red' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    const addAssetFormik = useFormik({
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
            setAssets(prev => [values, ...prev]);
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
                                Manage Assets
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage assets
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Asset
                        </Button>
                    </div>

                    {/* KPI Cards */}
                    <div className="flex flex-wrap gap-6 mb-8">
                        {kpiData.map((item) => {
                            return (
                                <KPI
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    unit={item?.unit}
                                    bgColor={item.bgColor}
                                    color={item.color}
                                    style={'h-fit min-w-56'}
                                    IconComponent={item['icon']}
                                />
                            )
                        })}
                    </div>

                    <div className="flex justify-end mb-4">
                        <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />

                    </div>
                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={userColumns}
                            data={assets}
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
                title={'Add Asset'}
                description={'create assets to the inventory'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='assetForm'
            >
                <form id="assetForm" onSubmit={addAssetFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Asset ID"}
                                placeholder="e.g. JSP-LAP-2024-005"
                                {...addAssetFormik.getFieldProps('asset_id')}
                            />

                            <TextInput
                                label={"Type"}
                                placeholder="e.g. Laptop"
                                {...addAssetFormik.getFieldProps('type')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Brand & Model"}
                                placeholder="e.g. Lenovo X1"
                                {...addAssetFormik.getFieldProps('model')}
                            />

                            <TextInput
                                label={"Serial Number"}
                                placeholder="e.g. DLL5430X12345"
                                {...addAssetFormik.getFieldProps('serial')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <SelectInput
                                label={"Condition"}
                                {...addAssetFormik.getFieldProps('condition')}
                                options={[
                                    { label: "New", value: "New" },
                                    { label: "Refurbished", value: "Refurbished" },
                                ]}
                            />

                            <SelectInput
                                label={"Status"}
                                {...addAssetFormik.getFieldProps('status')}
                                options={[
                                    { label: "Available", value: "Available" },
                                    { label: "Assigned", value: "Assigned" },
                                    { label: "Under Repair", value: "Under Repair" },
                                ]}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Assigned To"}
                                placeholder="e.g. Mr. XYZ"
                                {...addAssetFormik.getFieldProps('assignedTo')}
                            />

                            <TextInput
                                label={"Value"}
                                placeholder="e.g. ₹45000"
                                {...addAssetFormik.getFieldProps('value')}
                            />
                        </div>
                    </div>
                </form>
            </Modal>

        </>
    )
}

export default ManageAssets;