import { PencilLine, Plus, Trash, Users } from 'lucide-react';
import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import DataTable from 'react-data-table-component';
import { dummyLeaveRequests, dummyLeaves } from '../../content/dummyData';
import Chip from '../../components/utils/Chip';
import Modal from '../../components/utils/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ErrorMsg from '../../components/utils/ErrorMsg';
import TextInput from '../../components/fields/TextInput';
import SelectInput from '../../components/fields/SelectInput';

// console.log("dfasd", DataTable)

const Leaves = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const leaveFormik = useFormik({
        initialValues: {
            leaveType: '',
            fromDate: '',
            toDate: '',
            reason: '',
            rm: '',
        },
        validationSchema: Yup.object({
            leaveType: Yup.string().required('leave type is required'),
            fromDate: Yup.string().required('from date is required'),
            toDate: Yup.string().required('to date is required'),
            reason: Yup.string().required('reason is required'),
            rm: Yup.string().required('select a reporting manager'),
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
            name: 'Leave Type',
            selector: row => row.type,
        },
        {
            name: 'From',
            selector: row => row.from,
        },
        {
            name: 'To',
            selector: row => row.to,
        },
        {
            name: 'Days',
            selector: row => row.days,
            width: '100px'
        },
        {
            name: 'Reason',
            selector: row => row.reason,
        },
        {
            name: 'Approved By',
            selector: row => row.approved_by,
        },
        {
            name: 'Status',
            selector: row => (
                <Chip title={row?.status} color={row?.status === 'approved' ? "green" : "red"} />
            ),
        },
        {
            name: 'Action',
            selector: row => (
                <div className="flex gap-4">
                    <PencilLine size={18} color='blue' className='cursor-pointer' />
                    <Trash size={18} color='red' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex-1 overflow-y-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Leaves</h1>
                    <p className="text-gray-600 text-sm mt-1">Leaves, 2026</p>
                </div>


                <div className="bg-white rounded-xl shadow-sm p-6 pt-5 border border-gray-200 mb-5">
                    <div className="flex flex-col gap-2">
                        {/* Header */}
                        <div className="flex items-center justify-between -mt-1">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Leave Balance
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {dummyLeaves.map((leave, index) => (
                                <div
                                    key={index}
                                    className={`bg-${leave?.color} flex items-center gap-4 rounded-md shadow-sm p-4 border border-gray-200 w-fit max-w-44 hover:shadow-md transition`}
                                >
                                    {/* Count */}
                                    <div className={`h-12 w-12 flex items-center justify-center rounded-lg`}>
                                        <p className="text-4xl font-bold text-black">
                                            {leave?.count}
                                        </p>
                                    </div>

                                    {/* Text */}
                                    <div className="flex flex-col">
                                        <p className="text-lg capitalize font-semibold text-gray-900">
                                            {leave?.type}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* table ui  */}
                <div className="bg-white rounded-xl shadow-sm p-6 pt-5 border border-gray-200">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between -mt-1 mb-2">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Leave Requests
                            </h2>

                            <Button
                                icon={Plus}
                                onClick={() => setIsModalOpen(true)}
                            >
                                Apply Leave
                            </Button>
                        </div>

                        <DataTable.default
                            columns={columns}
                            data={dummyLeaveRequests}
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
                title={'Apply Leave'}
                description={'Submit a leave request for approval'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='leaveForm'
            >
                <form id="leaveForm" onSubmit={leaveFormik.handleSubmit} >
                    <div className="space-y-4">
                        {/* Leave Type */}
                        <SelectInput
                            label={"Leave Type"}
                            {...leaveFormik.getFieldProps('leaveType')}
                            options={[
                                { label: "Casual Leave", value: "Casual Leave" },
                                { label: "Sick Leave", value: "Sick Leave" },
                                { label: "Earned Leave", value: "Earned Leave" },
                                { label: "Work From Home", value: "Work From Home" },
                            ]}
                            error={leaveFormik.touched.leaveType && leaveFormik.errors.leaveType}
                        />

                        {/* Date Range */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-700 mb-1 block">
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    {...leaveFormik.getFieldProps('fromDate')}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                />
                                {leaveFormik.touched.fromDate && leaveFormik.errors.fromDate ? (
                                    <ErrorMsg error={leaveFormik.errors.fromDate} />
                                ) : null}
                            </div>

                            <div>
                                <label className="text-xs text-gray-700 mb-1 block">
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    {...leaveFormik.getFieldProps('toDate')}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                />
                                {leaveFormik.touched.toDate && leaveFormik.errors.toDate ? (
                                    <ErrorMsg error={leaveFormik.errors.toDate} />
                                ) : null}
                            </div>
                        </div>

                        {/* Half Day Option */}
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="halfday" />
                            <label htmlFor="halfday" className="text-sm text-gray-700">
                                Apply for Half Day
                            </label>
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="text-xs text-gray-700 mb-1 block">
                                Reason
                            </label>
                            <textarea
                                rows={3}
                                {...leaveFormik.getFieldProps('reason')}
                                placeholder="Enter reason for leave..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                            />
                            {leaveFormik.touched.reason && leaveFormik.errors.reason ? (
                                <ErrorMsg error={leaveFormik.errors.reason} />
                            ) : null}
                        </div>

                        <div>
                            <TextInput
                                label={"CC:"}
                                placeholder="Add , separated emails"
                            />
                        </div>

                        {/* Reporting Manager */}
                        <SelectInput
                            label={"Reporting Manager"}
                            {...leaveFormik.getFieldProps('rm')}
                            options={[{ label: "Jane Smith", value: "Jane Smith" }]}
                            error={leaveFormik.touched.rm && leaveFormik.errors.rm}
                        />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Leaves;