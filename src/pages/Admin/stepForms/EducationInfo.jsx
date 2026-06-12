import React, { useState } from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useParams } from 'react-router-dom';
import { Redo } from 'lucide-react';

const EducationInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const [education, setEducation] = useState({
        tenthBoardSchool: '',
        tenthYear: '',
        tenthPercentage: '',
        twelfthBoardSchool: '',
        twelfthYear: '',
        twelfthPercentage: '',
        twelfthStream: '',
        graduationDegree: '',
        graduationInstitution: '',
        graduationBoardUniversity: '',
        graduationYear: '',
        graduationPercentage: '',
        graduationSpecialization: '',
        qualificationType: '',
        documentNumber: '',
    });

    const handleChange = (field) => (e) => {
        setEducation(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('familyInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <div className="col-span-full">
                        <h2 className="text-lg font-semibold text-slate-900 mb-3">Secondary Education (10th)</h2>
                    </div>
                    <TextInput
                        id="tenthBoardSchool"
                        label="Board / School"
                        required
                        placeholder="CBSE / State Board / School"
                        value={education.tenthBoardSchool}
                        onChange={handleChange('tenthBoardSchool')}
                    />
                    <TextInput
                        id="tenthYear"
                        label="Year of Passing"
                        required
                        placeholder="e.g. 2018"
                        value={education.tenthYear}
                        onChange={handleChange('tenthYear')}
                    />
                    <TextInput
                        id="tenthPercentage"
                        label="Grade / Percentage"
                        required
                        placeholder="e.g. 93% or 9.3 CGPA"
                        value={education.tenthPercentage}
                        onChange={handleChange('tenthPercentage')}
                    />

                    <div className="col-span-full mt-4">
                        <h2 className="text-lg font-semibold text-slate-900 mb-3">Higher Secondary Education (12th)</h2>
                    </div>
                    <TextInput
                        id="twelfthBoardSchool"
                        label="Board / School"
                        required
                        placeholder="CBSE / ISC / State Board / School"
                        value={education.twelfthBoardSchool}
                        onChange={handleChange('twelfthBoardSchool')}
                    />
                    <TextInput
                        id="twelfthStream"
                        label="Stream"
                        required
                        placeholder="Science / Commerce / Arts"
                        value={education.twelfthStream}
                        onChange={handleChange('twelfthStream')}
                    />
                    <TextInput
                        id="twelfthYear"
                        label="Year of Passing"
                        required
                        placeholder="e.g. 2020"
                        value={education.twelfthYear}
                        onChange={handleChange('twelfthYear')}
                    />
                    <TextInput
                        id="twelfthPercentage"
                        label="Grade / Percentage"
                        required
                        placeholder="e.g. 88% or 8.8 CGPA"
                        value={education.twelfthPercentage}
                        onChange={handleChange('twelfthPercentage')}
                    />

                    <div className="col-span-full mt-4">
                        <h2 className="text-lg font-semibold text-slate-900 mb-3">Graduation / Higher Education</h2>
                    </div>
                    <TextInput
                        id="graduationDegree"
                        label="Degree"
                        required
                        placeholder="e.g. B.Tech, B.Com, BA"
                        value={education.graduationDegree}
                        onChange={handleChange('graduationDegree')}
                    />
                    <TextInput
                        id="graduationInstitution"
                        label="Institution / University"
                        required
                        placeholder="Enter college or university"
                        value={education.graduationInstitution}
                        onChange={handleChange('graduationInstitution')}
                    />
                    <TextInput
                        id="graduationYear"
                        label="Year of Passing"
                        required
                        placeholder="e.g. 2024"
                        value={education.graduationYear}
                        onChange={handleChange('graduationYear')}
                    />
                    <TextInput
                        id="graduationPercentage"
                        label="Grade / Percentage"
                        required
                        placeholder="e.g. 70% or 7.0 CPI"
                        value={education.graduationPercentage}
                        onChange={handleChange('graduationPercentage')}
                    />
                    <TextInput
                        id="graduationSpecialization"
                        label="Specialization"
                        placeholder="e.g. Computer Science, Finance"
                        value={education.graduationSpecialization}
                        onChange={handleChange('graduationSpecialization')}
                    />
                    {/* <TextInput
                        id="documentNumber"
                        label="Document / Marksheet No."
                        placeholder="Enter marksheet or certificate number"
                        value={education.documentNumber}
                        onChange={handleChange('documentNumber')}
                    /> */}
                    <div className="col-span-full">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above education information is accurate and complete.</label>
                    </div>
                </div>
                <div className='flex justify-end gap-4'>
                    <Button
                        style='!bg-gray-800 hover:!bg-gray-700'
                        icon={Redo}
                        iconFlip
                        onClick={() => setStepStatus("bankInfo")}
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

export default EducationInfo;