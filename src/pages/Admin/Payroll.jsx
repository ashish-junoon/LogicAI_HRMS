import React, { useState } from 'react'
import { AlignVerticalSpaceBetween, ChevronLeft, ChevronRight, Eye, MoreVertical, PencilLine, Plus, Trash, View } from 'lucide-react';
import Button from '../../components/utils/Button';
import DataTable from 'react-data-table-component';
import Chip from '../../components/utils/Chip';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/fields/SelectInput';
import SearchInput from '../../components/utils/SearchInput';

const batchSummary = [
    { label: 'Batch ID', value: '001' },
    { label: 'Payroll Period', value: 'January 2024' },
    { label: 'Total Payslips', value: '150' },
    { label: 'Payslips Distributed', value: '140' },
    { label: 'Payslips Pending', value: '10' },
]

const employeePayslips = [
    { name: 'John Doe', salary: '4,200', status: 'Distributed' },
    { name: 'Jane Smith', salary: '4,000', status: 'Distributed' },
    { name: 'Alex Johnson', salary: '4,700', status: 'Pending' },
    { name: 'Mary Brown', salary: '3,500', status: 'Failed' },
]

const statusStyles = {
    Distributed: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-sky-100 text-sky-700',
    'Failed Delivery': 'bg-rose-100 text-rose-700',
}

const Payroll = () => {

    const navigate = useNavigate();

    const [query, setQuery] = useState('');

    const columns = [
        {
            name: 'Employee Name',
            selector: row => row.name,
        },
        {
            name: 'Current CTC',
            selector: row => ('₹' + row.salary),
        },
        {
            name: 'Employee PF',
            selector: row => ('₹' + row.salary),
        },
        {
            name: 'Employer PF',
            selector: row => ('₹' + row.salary),
        },
        {
            name: 'In-Hand Salary',
            selector: row => ('₹' + row.salary),
        },
        {
            name: 'Allowance',
            selector: row => ('₹' + '400'),
        },
        {
            name: 'Deduction',
            selector: row => ('-₹' + '550'),
        },
        // {
        //     name: 'Status',
        //     selector: row => (
        //         <Chip title={row?.status} color={row?.status === 'Distributed' ? "green" : "red"} />
        //     ),
        // },
        {
            name: 'View',
            selector: row => (
                <div className="flex gap-4 p-2 bg-blue-100 rounded-md" onClick={() => navigate('/admin/payroll/emp1260')} >
                    <Eye size={18} color='blue' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Payslip Batch Details
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Employee payslip status
                        </p>
                    </div>

                    {/* <Button
                        icon={Plus}
                        iconRight
                        onClick={() => { navigate('/onboarding/emp1260') }}
                    >
                        Add Employee
                    </Button> */}
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Batch Summary</h2>
                                <p className="text-sm text-gray-500">Quick overview of this payslip run.</p>
                                <hr className='w-full border-gray-300 mt-3' />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                            {batchSummary.map((item) => (
                                <div key={item.label} className="rounded-xl p-4 pb-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                                    <p className="mt-3 text-lg font-semibold text-slate-900">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Employee Payslip Table</h2>
                                <p className="text-sm text-gray-500">Monitor each payout status in the current payroll batch.</p>
                            </div>

                            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    {/* <h2 className="text-xl font-semibold text-gray-900">All Employees</h2> */}
                                    {/* <p className="text-sm text-gray-500">Monitor each payout status in the current payroll batch.</p> */}
                                </div>
                                <div className='flex gap-3'>
                                    <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                                    {/* <SelectInput
                                        options={[
                                            { label: "Sales", value: "Sales" },
                                            { label: "IT", value: "IT" },
                                        ]}
                                    /> */}
                                </div>
                            </div>
                        </div>



                        <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                            <DataTable.default
                                columns={columns}
                                data={employeePayslips}
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
    )
}

export default Payroll;