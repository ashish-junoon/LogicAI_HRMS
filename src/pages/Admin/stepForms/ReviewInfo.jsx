import React from 'react'
import Button from '../../../components/utils/Button';
import { Edit, Redo } from 'lucide-react';

const ReviewInfo = ({ setStepStatus }) => {
    const sections = [
        {
            title: 'Company Information',
            step: 'companyInfo',
            items: [
                ['Employee Type', 'Full time'],
                ['Employee ID', 'EMP00123'],
                ['Department', 'Human Resources'],
                ['Designation', 'HR Manager'],
                ['Branch', 'MG Road, Bangalore'],
                ['Joining Date', '01 Feb 2024'],
                ['Reporting Manager', 'Neha Sharma'],
            ],
        },
        {
            title: 'Personal Information',
            step: 'personalInfo',
            items: [
                ['Name', 'Ravi Kumar'],
                ['Email', 'ravi.kumar@example.com'],
                ['Phone', '+91 98765 43210'],
                ['Gender', 'Male'],
                ['DOB', '15 Jan 1993'],
                ['Nationality', 'Indian'],
                ['Languages', 'English, Hindi, Kannada'],
            ],
        },
        {
            title: 'Employment Information',
            step: 'employmentInfo',
            items: [
                ['Previous Employer', 'Acme Corp'],
                ['Previous Designation', 'Operations Lead'],
                ['Employment Duration', 'Jan 2020 - Dec 2023'],
                ['Last Salary', '₹9,50,000'],
                ['Reason for Leaving', 'Career growth'],
                ['Reference Contact', 'reference@example.com'],
            ],
        },
        {
            title: 'Address Information',
            step: 'addressInfo',
            items: [
                ['Current Address', '123 Main Street, Indiranagar, Bangalore'],
                ['City', 'Bangalore'],
                ['State', 'Karnataka'],
                ['Postal Code', '560038'],
                ['Permanent Address', '45 Green Avenue, Mumbai'],
                ['Country', 'India'],
            ],
        },
        {
            title: 'Bank Information',
            step: 'bankInfo',
            items: [
                ['Bank Name', 'State Bank of India'],
                ['Account Number', 'XXXXXX9012'],
                ['IFSC Code', 'SBIN0001234'],
                ['Branch', 'MG Road Branch'],
                ['Account Type', 'Savings'],
                ['Nominee', 'Priya Kumar'],
            ],
        },
        {
            title: 'Education Information',
            step: 'educationInfo',
            items: [
                ['Highest Qualification', 'MBA'],
                ['Institution', 'IIM Bangalore'],
                ['Board / University', 'IIM Institutions'],
                ['Year of Passing', '2019'],
                ['Grade / Percentage', '72.5%'],
                ['Specialization', 'Human Resources'],
            ],
        },
        {
            title: 'Family Information',
            step: 'familyInfo',
            items: [
                ['Marital Status', 'Single'],
                ['Father', 'Rajesh Kumar'],
                ['Mother', 'Anita Kumar'],
                ['Emergency Contact', 'Deepak Kumar'],
                ['Relation', 'Brother'],
                ['Emergency Phone', '+91 90909 09090'],
            ],
        },
        {
            title: 'Document Uploads',
            step: 'documentInfo',
            items: [
                ['Aadhar Document', 'aadhar_card.pdf'],
                ['PAN Document', 'pan_card.pdf'],
                ['Resume', 'ravi_kumar_resume.pdf'],
                ['Offer Letter', 'offer_letter.pdf'],
                ['Joining Letter', 'joining_letter.pdf'],
            ],
        },
    ];

    const renderValue = (value) => value || 'Not provided';

    return (
        <div className="space-y-6">
            <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Review Onboarding Information</h1>
                <p className="mt-2 text-sm text-slate-500">All details are laid out in compact summary cards. Tap edit to jump directly to the section.</p>
            </div>

            <div className="grid gap-4">
                {sections.map((section) => (
                    <div key={section.step} className="rounded-xl border border-slate-300 bg-slate-50 shadow-sm">
                        <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">{section.title}</h2>
                                <p className="mt-1 text-xs text-slate-500">{section.items.length} items summarized</p>
                            </div>
                            <Button
                                style="!bg-slate-900 !text-white hover:!bg-slate-800"
                                onClick={() => setStepStatus(section.step)}
                                icon={Edit}
                            >
                                Edit
                            </Button>
                        </div>
                        <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                            {section.items.map(([label, value]) => (
                                <div key={label} className="rounded-lg border border-slate-200 bg-white p-3">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
                                    <div className="mt-1 text-sm font-medium text-slate-900">{renderValue(value)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                    style='!bg-slate-900 hover:!bg-slate-800'
                    icon={Redo}
                    iconFlip
                    onClick={() => setStepStatus('documentInfo')}
                >
                    Back
                </Button>
                <Button
                    type="button"
                    style="hover:!bg-blue-700"
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default ReviewInfo;