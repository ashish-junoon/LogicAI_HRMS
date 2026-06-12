import { Edit, Plus, Send, Trash } from 'lucide-react';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import Button from '../../../components/utils/Button';
import Modal from '../../../components/utils/Modal';
import Chip from '../../../components/utils/Chip';
import TextInput from '../../../components/fields/TextInput';
import SelectInput from '../../../components/fields/SelectInput';

const offerLettersData = [
    { id: 1, name: 'Aarav Sharma', address: 'Bangalore, Karnataka', title: 'Software Engineer', department: 'Engineering', joining_date: '01 Jun 2026', salary: '₹10,00,000', },
    { id: 2, name: 'Sanya Mehta', address: 'Mumbai, Maharashtra', title: 'HR Executive', department: 'Human Resources', joining_date: '15 Jun 2026', salary: '₹7,20,000', },
    { id: 3, name: 'Rahul Kapoor', address: 'Chennai, Tamil Nadu', title: 'Product Manager', department: 'Product', joining_date: '01 Jul 2026', salary: '₹12,50,000', },
];

const ManageOL = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offerLetters, setOfferLetters] = useState(offerLettersData);

    const userColumns = [
        {
            name: '#',
            selector: row => row?.id ?? "N/A",
        },
        {
            name: 'Candidate Name',
            selector: row => (row?.name ?? "N/A"),
        },
        {
            name: 'Address',
            selector: row => row?.address ?? "N/A",
        },
        {
            name: 'Job Title',
            selector: row => row?.title ?? "N/A",

        },
        {
            name: 'Department',
            selector: row => row?.department ?? "N/A",

        },
        {
            name: 'RM',
            selector: row => row?.rm ?? "N/A",

        },
        {
            name: 'Joining Date',
            selector: row => row?.joining_date ?? "N/A",

        },
        {
            name: 'Offered Salary',
            selector: row => row?.salary ?? "N/A",

        },
        {
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 p-2 rounded-md">
                    <Send size={18} color='blue' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    const addOfferFormik = useFormik({
        initialValues: {
            name: '',
            address: '',
            title: '',
            department: '',
            joining_date: '',
            salary: '',
        },
        onSubmit: (values, { resetForm }) => {
            setOfferLetters(prev => [{ id: prev.length + 1, ...values }, ...prev]);
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
                                Offer Letters
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create and manage offer letters for candidates
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Offer
                        </Button>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={userColumns}
                            data={offerLetters}
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
                title={'Add Offer Letter'}
                description={'Add candidate offer details to the system.'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='offerForm'
            >
                <form id="offerForm" onSubmit={addOfferFormik.handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Candidate Name"}
                                {...addOfferFormik.getFieldProps('name')}
                            />
                            <TextInput
                                label={"Address"}
                                placeholder="City, State"
                                {...addOfferFormik.getFieldProps('address')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Job Title"}
                                {...addOfferFormik.getFieldProps('title')}
                            />
                            <TextInput
                                label={"Department"}
                                {...addOfferFormik.getFieldProps('department')}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"Joining Date"}
                                placeholder="e.g. 01 Jun 2026"
                                {...addOfferFormik.getFieldProps('joining_date')}
                            />
                            <TextInput
                                label={"Offered Salary"}
                                placeholder="e.g. ₹10,00,000"
                                {...addOfferFormik.getFieldProps('salary')}
                            />
                        </div>
                        <TextInput
                                label={"Reporting Manager"}
                                // placeholder="e.g. ₹10,00,000"
                                {...addOfferFormik.getFieldProps('salary')}
                            />
                    </div>
                </form>
            </Modal>
        
        </>
    )
}

export default ManageOL;