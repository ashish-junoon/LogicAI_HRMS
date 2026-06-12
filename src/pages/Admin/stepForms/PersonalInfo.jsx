import React from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useNavigate, useParams } from 'react-router-dom';
import SelectInput from '../../../components/fields/SelectInput';
import { Redo } from 'lucide-react';

const PersonalInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const navigate = useNavigate();
    return (
        <>
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
                        <img src={`https://avatars.dicebear.com/api/initials/${route.id}.svg`} alt="avatar" className='w-32 h-32 rounded-full mx-auto mb-4' />
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
                        label="Aadhar Number"
                        required
                        placeholder="Enter Aadhar number"
                        // value={documents.aadharNumber}
                        // onChange={handleChange('aadharNumber')}
                    />
                    <TextInput
                        label="PAN Number"
                        required
                        placeholder="Enter PAN number"
                        // value={documents.panNumber}
                        // onChange={handleChange('panNumber')}
                    />

                    <div className="col-span-full mb-2">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above information is accurate and complete.</label>
                    </div>
                    
                    <SelectInput 
                        label="Gender"
                        options={[
                            {label:"male", value:"male"},
                            {label:"female", value:"female"},
                            {label:"other", value:"other"},
                        ]}
                    />
                    <TextInput
                        label="DOB"
                        placeholder="Enter date of birth"
                        value="1990-01-01"
                        onChange={() => { }}
                    />
                    <TextInput
                        label="Marital Status"
                        placeholder="Enter marital status"
                        value="Single"
                        onChange={() => { }}
                    />
                    <SelectInput 
                        label="Marital Status"
                        options={[
                            {label:"single", value:"single"},
                            {label:"single", value:"single"},
                        ]}
                    />
                    <TextInput
                        label="Blood Group"
                        placeholder="Enter blood group"
                        value="O+"
                        onChange={() => { }}
                    />
                    <TextInput
                        label="Nationality"
                        placeholder="Enter nationality"
                        value="Indian"
                        onChange={() => { }}
                    />
                    <TextInput
                        label="Known Languages"
                        placeholder="Enter known languages"
                        value="English, Hindi"
                        onChange={() => { }}
                    />
                </div>
                <div className='flex justify-end gap-3'>
                     {/* <Button
                        style='!bg-gray-800 hover:!bg-gray-700'
                        icon={Redo}
                        iconFlip
                        onClick={() => setStepStatus("companyInfo")}
                    >
                        Go Back
                    </Button> */}
                    <Button
                        type="submit"
                        onClick={() => setStepStatus("companyInfo")}
                    >
                        Save & Continue
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PersonalInfo;