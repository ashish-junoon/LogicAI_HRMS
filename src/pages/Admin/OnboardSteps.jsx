import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/utils/Button';
import { Plus, StepBack, UndoDot } from 'lucide-react';
import { span } from 'framer-motion/client';
import TextInput from '../../components/fields/TextInput';
import PersonalInfo from './stepForms/PersonalInfo';
import DocumentUpload from './stepForms/DocumentUpload';
import EducationInfo from './stepForms/EducationInfo';
import ReviewInfo from './stepForms/ReviewInfo';
import CompanyInfo from './stepForms/CompanyInfo';
import EmploymentInfo from './stepForms/EmploymentInfo';
import AddressInfo from './stepForms/AddressInfo';
import BankInfo from './stepForms/BankInfo';
import FamilyInfo from './stepForms/FamilyInfo';

const stepData = [
    { label: "personal info", active: true, name: "personalInfo" },
    { label: "company info", active: true, name: "companyInfo" },
    { label: "employment", active: true, name: "employmentInfo" },
    { label: "address", active: true, name: "addressInfo" },
    { label: "bank", active: true, name: "bankInfo" },
    { label: "education", active: false, name: "educationInfo" },
    { label: "family", active: false, name: "familyInfo" },
    { label: "documents", active: false, name: "documentInfo" },
    { label: "Review", active: false, name: "reviewInfo" }
]

const OnboardSteps = () => {
    const route = useParams();
    console.log(route.id);

    const navigate = useNavigate();

    const [stepStatus, setStepStatus] = useState("personalInfo");

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-base font-bold text-gray-700 ">
                            Employee: <span className='uppercase text-lg font-mono text-gray-500'> {route.id}</span>
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Continue the onboarding process.
                        </p>
                    </div>

                    <Button
                        icon={UndoDot}
                        onClick={() => { navigate(-1) }}
                    >
                        Back
                    </Button>
                </div>

                {/* step status floating bar */}
                <div className="bg-white rounded-xl shadow-md p-4 w-fit mx-auto px-5 border border-gray-200 backdrop-blur-3xl mb-8 sticky -top-3">
                    <div className='flex flex-wrap gap-5'>
                        {stepData.map((step) => (
                            <>
                                <div
                                    onClick={() => setStepStatus(step.name)}
                                    className={`capitalize cursor-pointer ${step.name === stepStatus ? 'text-pink-600 font-semibold' : 'text-gray-500'}`}>
                                    {step.label}
                                </div>
                                {step.name !== "reviewInfo" && <span className="text-gray-400">→</span>}
                            </>
                        ))}
                    </div>
                </div>

                {/* content flow */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mx-16">
                    {stepStatus === "personalInfo" && <PersonalInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "companyInfo" && <CompanyInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "employmentInfo" && <EmploymentInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "addressInfo" && <AddressInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "bankInfo" && <BankInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "educationInfo" && <EducationInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "familyInfo" && <FamilyInfo setStepStatus={setStepStatus} />}
                    {stepStatus === "documentInfo" && <DocumentUpload setStepStatus={setStepStatus} />}
                    {stepStatus === "reviewInfo" && <ReviewInfo setStepStatus={setStepStatus} />}
                </div>

            </div>
        </div>
    )
}

export default OnboardSteps