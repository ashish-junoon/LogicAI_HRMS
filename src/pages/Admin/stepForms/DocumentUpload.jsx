import React, { useState } from 'react'
import Button from '../../../components/utils/Button';
import { useParams } from 'react-router-dom';
import { Redo } from 'lucide-react';

const DocumentUpload = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);
    const [documents, setDocuments] = useState({
        profilePhoto: null,
        aadharFrontFile: null,
        aadharBackFile: null,
        panFile: null,
        resumeFile: null,
        offerLetterFile: null,
        joiningLetterFile: null,
        experienceCertificateFile: null,
        salarySlipFile: null,
        bankStatementFile: null,
    });

    const handleChange = (field) => (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setDocuments(prev => ({ ...prev, [field]: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('reviewInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('profilePhoto')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Aadhar Front</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('aadharFrontFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Aadhar Back</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('aadharBackFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">PAN Document</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('panFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Resume / CV</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange('resumeFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Offer Letter</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange('offerLetterFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Joining Letter</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange('joiningLetterFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Experience Certificate</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('experienceCertificateFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Salary Slip</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('salarySlipFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="mb-0">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Bank Statement</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleChange('bankStatementFile')}
                            className="py-2 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>
                    <div className="col-span-full">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above documents are correct and ready for verification.</label>
                    </div>
                </div>
                <div className='flex justify-end gap-4'>
                    <Button
                        style='!bg-gray-800 hover:!bg-gray-700'
                        icon={Redo}
                        iconFlip
                        onClick={() => setStepStatus("educationInfo")}
                    >
                        Go Back
                    </Button>
                    <Button
                        type="submit"
                    >
                        Save & Continue
                    </Button>
                </div>
            </form>
        </>
    )
}

export default DocumentUpload;