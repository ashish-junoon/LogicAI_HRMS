import React, { useState } from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { Redo } from 'lucide-react';

const EmploymentInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        previousEmployer: '',
        previousDesignation: '',
        employmentDuration: '',
        lastSalary: '',
        reasonForLeaving: '',
        referenceContact: '',
    });

    const handleChange = (field) => (e) => {
        setFormValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('addressInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <TextInput
                        label="Previous Employer"
                        required
                        placeholder="Enter previous company name"
                        value={formValues.previousEmployer}
                        onChange={handleChange('previousEmployer')}
                    />
                    <TextInput
                        label="Previous Designation"
                        required
                        placeholder="Enter last held job title"
                        value={formValues.previousDesignation}
                        onChange={handleChange('previousDesignation')}
                    />
                    <TextInput
                        label="Employment Duration"
                        required
                        placeholder="e.g. Jan 2020 - Dec 2023"
                        value={formValues.employmentDuration}
                        onChange={handleChange('employmentDuration')}
                    />
                    <TextInput
                        label="Last Salary"
                        required
                        placeholder="Enter last salary"
                        value={formValues.lastSalary}
                        onChange={handleChange('lastSalary')}
                    />
                    <TextInput
                        label="Reason for Leaving"
                        required
                        placeholder="Enter reason for leaving"
                        value={formValues.reasonForLeaving}
                        onChange={handleChange('reasonForLeaving')}
                    />
                    <TextInput
                        label="Reference Contact"
                        placeholder="Enter reference phone or email"
                        value={formValues.referenceContact}
                        onChange={handleChange('referenceContact')}
                    />

                    <div className="col-span-full">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above information is accurate and complete.</label>
                    </div>
                </div>
                <div className='flex justify-end gap-4'>
                    <Button
                        style='!bg-gray-800 hover:!bg-gray-700'
                        icon={Redo}
                        iconFlip
                        onClick={() => setStepStatus("personalInfo")}
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

export default EmploymentInfo;