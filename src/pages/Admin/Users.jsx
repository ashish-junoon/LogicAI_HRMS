import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { Calendar, ClipboardClock, Delete, Edit, List, LucideGitGraph, Mail, Plus, ShieldCheck, Trash, UsersIcon, WindArrowDownIcon } from 'lucide-react';
import KPI from '../../components/utils/KPI';
import DataTable from 'react-data-table-component';
import Chip from '../../components/utils/Chip';
import Modal from '../../components/utils/Modal';
import { useFormik } from 'formik';
import SelectInput from '../../components/fields/SelectInput';
import ErrorMsg from '../../components/utils/ErrorMsg';
import TextInput from '../../components/fields/TextInput';
import * as Yup from 'yup';
import SearchInput from '../../components/utils/SearchInput';
import { useNavigate } from 'react-router-dom';

const kpiData = [
    { label: 'Total Users', value: '2', icon: UsersIcon, color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'Active', value: '15', unit: "", icon: ShieldCheck, color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'Pending', value: '06', unit: "", icon: ClipboardClock, color: '#0284c7', bgColor: '#e0f2fe', },
];

const userDetails = [
    { name: 'Alice Alan', role: 'Super Admin', department: 'IT', status: 'active', punchIn: new Date().toLocaleDateString() },
    { name: 'Justin Bewver', role: 'Admin', department: 'Sales', status: 'active', punchIn: new Date().toLocaleDateString() },
    { name: 'Alakh Panday', role: 'Manager', department: 'Operations', status: 'inactive', punchIn: new Date().toLocaleDateString() },
    { name: 'Vladir Putin', role: 'EMP1263', department: 'Sales', status: 'active', punchIn: new Date().toLocaleDateString() },
]

const Users = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');

    const addUserFormik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('first name is required'),
            lastName: Yup.string().required('last name is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log(values)
            } catch (error) {
                console.log(error);
                toast.error(error?.message || "Something went wrong");
            }
        }
    })

    const columns = [
        {
            name: 'User',
            selector: row => row?.name ?? "N/A",
        },
        {
            name: 'Role',
            selector: row => (row?.role ?? "N/A"),
        },
        {
            name: 'Department',
            selector: row => row?.department ?? "N/A",
        },
        {
            name: 'Status',
            selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "active" ? 'green' : 'red'} />,
        },
        {
            name: 'Created At',
            selector: row => row?.punchIn ?? "N/A",
        },
        {
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 rounded-md">
                    <List size={18} color='blue' className='cursor-pointer' onClick={()=> {navigate('/admin/permissions/23')}} />
                    <Edit size={18} color='blue' className='cursor-pointer' />
                    <Trash size={18} color='red' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex h-full bg-gray-50">
                <div className="flex-1 overflow-y-auto p-6">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Manage Users
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage user, roles, and permissions
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add User
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


                    {/* employee's attendance status  */}
                    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 mb-10">
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
                                {/* <p className="text-sm text-gray-500">Currently: 23</p> */}
                            </div>
                            <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />

                        </div>

                        <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                            <DataTable.default
                                columns={columns}
                                data={userDetails}
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


            {/* modal  */}
            <Modal
                title={'Add User'}
                description={'create user and assign permissions'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='userForm'
            >
                <form id="userForm" onSubmit={addUserFormik.handleSubmit} >
                    <div className="space-y-4">

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"First Name"}
                                placeholder="e.g. John"
                                {...addUserFormik.getFieldProps('firstName')}
                                error={addUserFormik.touched.firstName && addUserFormik.errors.firstName}
                            />

                            <TextInput
                                label={"Last Name"}
                                placeholder="e.g. Sena"
                                {...addUserFormik.getFieldProps('lastName')}
                                error={addUserFormik.touched.lastName && addUserFormik.errors.lastName}
                            />
                        </div>

                        <div>
                            <TextInput
                                label={"Email"}
                                placeholder="e.g. john22@gmail.com"
                            />
                        </div>

                        <SelectInput
                            label={"Role"}
                            {...addUserFormik.getFieldProps('role')}
                            options={[
                                { label: "Super Admin", value: "Super Admin" },
                                { label: "Admin", value: "Admin" },
                                { label: "Manager", value: "Manager" },
                            ]}
                            error={addUserFormik.touched.role && addUserFormik.errors.role}
                        />

                        <div className='grid grid-cols-2 gap-3'>
                            <SelectInput
                                label={"Department"}
                                {...addUserFormik.getFieldProps('department')}
                                options={[
                                    { label: "IT", value: "IT" },
                                    { label: "Management", value: "Management" },
                                ]}
                                error={addUserFormik.touched.department && addUserFormik.errors.department}
                            />

                            <SelectInput
                                label={"Position"}
                                {...addUserFormik.getFieldProps('position')}
                                options={[
                                    { label: "Software Developer", value: "Software Developer" },
                                    { label: "DevOps Engineer", value: "DevOps Engineer" }
                                ]}
                                error={addUserFormik.touched.position && addUserFormik.errors.position}
                            />
                        </div>

                        <div className='bg-slate-100 p-3 px-4 rounded-lg text-slate-700 flex gap-2'>
                            <Mail size={16} className='self-center mt-1' /> An invitation email will be sent to the user with login credentials.
                        </div>

                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Users;