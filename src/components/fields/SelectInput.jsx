import React from 'react'
import ErrorMsg from '../utils/ErrorMsg';

const SelectInput = ({ label, options, error, ...props }) => {
    return (
        <>
            <div>
                {label && <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                </label>}
                <select
                    className="w-full px-3 py-2 rounded-lg bg-white outline-gray-300 border border-gray-300 text-sm"
                    {...props}
                >
                    <option value="">Select</option>
                    {options?.map((option, index) => (
                        // <optgroup label='test'>
                            <option key={index} value={option?.value} className='capitalize'>{option?.label}</option>
                        // </optgroup>
                    ))}
                </select>
                {error ? (
                    <ErrorMsg error={error} />
                ) : null}
            </div>
        </>
    )
}

export default SelectInput;