import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/utils/Button';
import { Plus, StepBack, UndoDot } from 'lucide-react';
import TextInput from '../../components/fields/TextInput';
import DocumentUpload from './stepForms/DocumentUpload';
import EducationInfo from './stepForms/EducationInfo';
import ReviewInfo from './stepForms/ReviewInfo';
import CompanyInfo from './stepForms/CompanyInfo';
import EmploymentInfo from './stepForms/EmploymentInfo';
import AddressInfo from './stepForms/AddressInfo';
import BankInfo from './stepForms/BankInfo';
import FamilyInfo from './stepForms/FamilyInfo';
import { Redo } from 'lucide-react';
import SelectInput from '../../components/fields/SelectInput';

const InterviewForm = () => {

    const navigate = useNavigate();

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* content flow */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mx-16">
                    <form action="">
                        <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                            <TextInput
                                label="First Name"
                                placeholder="Enter first name"
                                value="Ravi"
                                onChange={() => { }}
                            />
                            <TextInput
                                label="Last Name"
                                placeholder="Enter last name"
                                value="Kumar"
                                onChange={() => { }}
                            />

                            <div className='border border-gray-200 rounded-lg mt-5 m-2 p-6 row-span-3'>
                                <img src={`https://avatars.dicebear.com/api/initials/dskjf.svg`} alt="avatar" className='w-32 h-24 rounded-full mx-auto mb-4' />
                                <p className='text-center text-gray-400 font-base font-serif'>Upload jpg, jpeg or png - max 2MB</p>
                            </div>

                            <TextInput
                                label="Phone Number"
                                placeholder="Enter phone number"
                                value="123-456-7890"
                                onChange={() => { }}
                            />
                            <TextInput
                                label="Email Address"
                                placeholder="Enter email address"
                                value="ravi.kumar@example.com"
                                onChange={() => { }}
                            />

                            <TextInput
                                label="Applied Position"
                                placeholder="Enter applied position"
                                onChange={() => { }}
                            />

                            <TextInput
                                label="Total Experience (Years)"
                                placeholder="Enter total experience"
                                onChange={() => { }}
                            />

                            <SelectInput
                                label="Gender"
                                options={[
                                    { label: "male", value: "male" },
                                    { label: "female", value: "female" },
                                    { label: "other", value: "other" },
                                ]}
                            />
                            <TextInput
                                label="DOB"
                                placeholder="Enter date of birth"
                                value="1990-01-01"
                                onChange={() => { }}
                            />

                            <SelectInput
                                label="Current City"
                                options={[
                                    { label: "Delhi", value: "Delhi" },
                                    { label: "Lucknow", value: "Lucknow" },
                                ]}
                            />

                            <TextInput
                                label="Current CTC"
                                placeholder="Enter current CTC"
                                onChange={() => { }}
                            />

                            <TextInput
                                label="Expected CTC"
                                placeholder="Enter expected CTC"
                                onChange={() => { }}
                            />



                            <TextInput
                                label="Highest Qualification"
                                placeholder="Enter qualification"
                                onChange={() => { }}
                            />

                            <SelectInput
                                label="Notice Period"
                                options={[
                                    { label: "Immediate", value: "Immediate" },
                                    { label: "15 Days", value: "15 Days" },
                                    { label: "30 Days", value: "30 Days" },
                                    { label: "60 Days", value: "60 Days" },
                                    { label: "90 Days", value: "90 Days" },
                                ]}
                            />
                        </div>


                        <div className='flex justify-between gap-3 mt-5'>
                            <div className="col-span-full mb-2">
                                <input type="checkbox" id="confirm" className="mr-2" />
                                <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above information is accurate and complete.</label>
                            </div>
                            <Button
                                type="button"
                                onClick={() => navigate(-1)}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default InterviewForm;