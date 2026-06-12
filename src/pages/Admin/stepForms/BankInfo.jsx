import React, { useState } from 'react'
import TextInput from '../../../components/fields/TextInput';
import Button from '../../../components/utils/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { Redo } from 'lucide-react';

const BankInfo = ({ setStepStatus }) => {
    const route = useParams();
    console.log(route.id);

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        bankName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        branch: '',
        accountType: '',
        nomineeName: '',
        nomineeRelation: '',
        panNumber: '',
    });

    const handleChange = (field) => (e) => {
        setFormValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStepStatus('educationInfo');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-y-2 gap-x-5 mb-2">
                    <TextInput
                        label="Bank Name"
                        required
                        placeholder="Enter bank name"
                        value={formValues.bankName}
                        onChange={handleChange('bankName')}
                    />
                    <TextInput
                        label="Account Number"
                        required
                        placeholder="Enter account number"
                        value={formValues.accountNumber}
                        onChange={handleChange('accountNumber')}
                    />
                    <TextInput
                        label="Confirm Account Number"
                        required
                        placeholder="Re-enter account number"
                        value={formValues.confirmAccountNumber}
                        onChange={handleChange('confirmAccountNumber')}
                    />
                    <TextInput
                        label="IFSC Code"
                        required
                        placeholder="Enter IFSC code"
                        value={formValues.ifscCode}
                        onChange={handleChange('ifscCode')}
                    />
                    <TextInput
                        label="Branch"
                        required
                        placeholder="Enter branch name"
                        value={formValues.branch}
                        onChange={handleChange('branch')}
                    />
                    <TextInput
                        label="Account Type"
                        required
                        placeholder="Enter account type"
                        value={formValues.accountType}
                        onChange={handleChange('accountType')}
                    />
                    <TextInput
                        label="Nominee Name"
                        placeholder="Enter nominee name"
                        value={formValues.nomineeName}
                        onChange={handleChange('nomineeName')}
                    />
                    <TextInput
                        label="Nominee Relation"
                        placeholder="Enter nominee relation"
                        value={formValues.nomineeRelation}
                        onChange={handleChange('nomineeRelation')}
                    />
                    <div className="col-span-full">
                        <input type="checkbox" id="confirm" className="mr-2" />
                        <label htmlFor="confirm" className="text-sm text-gray-600">I confirm that the above bank information is accurate and complete.</label>
                    </div>
                </div>
                <div className='flex justify-end gap-4'>
                    <Button
                        style='!bg-gray-800 hover:!bg-gray-700'
                        icon={Redo}
                        iconFlip
                        onClick={() => setStepStatus("addressInfo")}
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

export default BankInfo;