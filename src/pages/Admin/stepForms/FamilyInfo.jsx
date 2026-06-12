import React, { useState } from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useParams } from 'react-router-dom';
import { Redo } from 'lucide-react';
import SelectInput from '../../../components/fields/SelectInput';

const FamilyInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const [family, setFamily] = useState({
        maritalStatus: '',
        spouseName: '',
        spouseOccupation: '',
        spouseContact: '',
        numberOfDependents: '',
        fatherName: '',
        motherName: '',
        emergencyContactName: '',
        emergencyContactRelation: '',
        emergencyContactPhone: '',
    });

    const handleChange = (field) => (e) => {
        setFamily(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('documentInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <SelectInput
                        label="Marital Status"
                        required
                        options={[
                            { label: 'Married', value: 'married' },
                            { label: 'Unmarried', value: 'unmarried' },
                        ]}
                        value={family.maritalStatus}
                        onChange={handleChange('maritalStatus')}
                    />
                    {family.maritalStatus === "married" ? <>
                        <TextInput
                            label="Spouse Name"
                            placeholder="Enter spouse name"
                            value={family.spouseName}
                            onChange={handleChange('spouseName')}
                        />
                        <TextInput
                            label="Spouse Contact"
                            placeholder="Enter spouse contact number"
                            value={family.spouseContact}
                            onChange={handleChange('spouseContact')}
                        />
                    </> : <>
                        <TextInput
                            label="Father's Name"
                            placeholder="Enter father's name"
                            value={family.fatherName}
                            onChange={handleChange('fatherName')}
                        />
                        <TextInput
                            label="Mother's Name"
                            placeholder="Enter mother's name"
                            value={family.motherName}
                            onChange={handleChange('motherName')}
                        />
                    </>}
                    <TextInput
                        label="Number of Dependents"
                        placeholder="Enter number of dependents"
                        value={family.numberOfDependents}
                        onChange={handleChange('numberOfDependents')}
                    />

                    <TextInput
                        label="Emergency Contact Name"
                        required
                        placeholder="Enter emergency contact name"
                        value={family.emergencyContactName}
                        onChange={handleChange('emergencyContactName')}
                    />
                    <TextInput
                        label="Emergency Contact Relationship"
                        required
                        placeholder="Enter relationship"
                        value={family.emergencyContactRelation}
                        onChange={handleChange('emergencyContactRelation')}
                    />
                    <TextInput
                        label="Emergency Contact Phone"
                        required
                        placeholder="Enter emergency contact phone"
                        value={family.emergencyContactPhone}
                        onChange={handleChange('emergencyContactPhone')}
                    />
                    <div className="col-span-full">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above family information is accurate and complete.</label>
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

export default FamilyInfo;