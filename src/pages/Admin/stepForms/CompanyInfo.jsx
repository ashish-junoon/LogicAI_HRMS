import React, { useState } from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../../../components/fields/SelectInput';
import { Redo } from 'lucide-react';

const CompanyInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        employeeType: '',
        employeeId: '',
        department: '',
        designation: '',
        branch: '',
        joiningDate: '',
        manager: '',
    });

    const handleChange = (field) => (e) => {
        setFormValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('employmentInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <TextInput
                        label="Joining Date"
                        id="joiningDate"
                        type="date"
                        value={formValues.joiningDate}
                        onChange={handleChange('joiningDate')}
                    />
                    <SelectInput
                        label="Department"
                        name="department"
                        value={formValues.department}
                        onChange={handleChange('department')}
                        options={[
                            { label: "Human Resources", value: "Human Resources" },
                            { label: "Finance", value: "Finance" },
                            { label: "Engineering", value: "Engineering" },
                            { label: "Operations", value: "Operations" },
                            { label: "Marketing", value: "Marketing" },
                        ]}
                    />
                    <SelectInput
                        label="Designation"
                        name="designation"
                        value={formValues.designation}
                        onChange={handleChange('designation')}
                        options={[
                            { label: "HR Manager", value: "HR Manager" },
                            { label: "Recruitment Lead", value: "Recruitment Lead" },
                            { label: "Payroll Specialist", value: "Payroll Specialist" },
                            { label: "Frontend Developer", value: "Frontend Developer" },
                            { label: "Operations Coordinator", value: "Operations Coordinator" },
                        ]}
                    />
                    <TextInput
                        label="Branch"
                        id="branch"
                        placeholder="Enter branch location"
                        value={formValues.branch}
                        onChange={handleChange('branch')}
                    />
                    <TextInput
                        label="Reporting Manager"
                        id="manager"
                        placeholder="Enter reporting manager"
                        value={formValues.manager}
                        onChange={handleChange('manager')}
                    />
                </div>
                <div className='flex justify-end gap-3'>
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

export default CompanyInfo;