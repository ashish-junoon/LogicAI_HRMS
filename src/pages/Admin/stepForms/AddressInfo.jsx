import React, { useState } from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { Redo } from 'lucide-react';

const AddressInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        Address: '',
        City: '',
        State: '',
        PostalCode: '',
        permanentAddress: '',
        permanentCity: '',
        permanentState: '',
        permanentPostalCode: '',
        country: '',
        landmark: '',
    });

    const handleChange = (field) => (e) => {
        setFormValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('bankInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <TextInput
                        label="Address"
                        required
                        placeholder="Enter  address"
                        value={formValues.Address}
                        onChange={handleChange('Address')}
                    />
                    <TextInput
                        label="City"
                        required
                        placeholder="Enter  city"
                        value={formValues.City}
                        onChange={handleChange('City')}
                    />
                    <TextInput
                        label="State"
                        required
                        placeholder="Enter  state"
                        value={formValues.State}
                        onChange={handleChange('State')}
                    />
                    <TextInput
                        label="Postal Code"
                        required
                        placeholder="Enter  postal code"
                        value={formValues.PostalCode}
                        onChange={handleChange('PostalCode')}
                    />
                    <TextInput
                        label="Permanent Address"
                        required
                        placeholder="Enter permanent address"
                        value={formValues.permanentAddress}
                        onChange={handleChange('permanentAddress')}
                    />
                    <TextInput
                        label="Permanent City"
                        required
                        placeholder="Enter permanent city"
                        value={formValues.permanentCity}
                        onChange={handleChange('permanentCity')}
                    />
                    <TextInput
                        label="Permanent State"
                        required
                        placeholder="Enter permanent state"
                        value={formValues.permanentState}
                        onChange={handleChange('permanentState')}
                    />
                    <TextInput
                        label="Permanent Postal Code"
                        required
                        placeholder="Enter permanent postal code"
                        value={formValues.permanentPostalCode}
                        onChange={handleChange('permanentPostalCode')}
                    />
                    <TextInput
                        label="Country"
                        required
                        placeholder="Enter country"
                        value={formValues.country}
                        onChange={handleChange('country')}
                    />
                    <TextInput
                        label="Landmark / Nearest Location"
                        placeholder="Enter landmark"
                        value={formValues.landmark}
                        onChange={handleChange('landmark')}
                    />
                    <div className="col-span-full">
                        <input type="checkbox"id="confirm"className="mr-2"/>
                        <label htmlFor="confirm"className="text-sm text-gray-600">I confirm that the above address information is accurate and complete.</label>
                    </div>
                </div>
                <div className='flex justify-end gap-4'>
                    <Button
                        style='!bg-gray-800 hover:!bg-gray-700'
                        icon={Redo}
                        iconFlip
                        onClick={() => setStepStatus("employmentInfo")}
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

export default AddressInfo;