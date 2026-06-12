import React, { useState } from 'react'

const TextInput = ({ label, id, type = "text", required, icon, style = "", error, hideEye, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="mb-0">
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                {label}{required ? <span className="text-danger text-sm">*</span> : ""}
            </label>

            <div className='relative'>
                {icon && <div className="absolute inset-y-0 inset-s-0 flex items-center ps-2 pointer-events-none">
                    <Icon name={icon} size={20} />
                </div>}
                <input
                    id={id}
                    type={type}
                    //   placeholder="Search posts..."
                    className={`h-9 w-full rounded-lg border border-gray-200 px-2 text-sm outline-none transition focus:border-gray-400 focus:bg-white ${style}`}
                    {...props} // type
                />
                {type === "password" && !hideEye && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute inset-y-0 inset-e-0 flex items-center pe-3.5 pointer-events-auto"
                    >
                        <Icon name={showPassword ? "RiEyeOffLine" : "RiEyeLine"} size={22} />
                    </button>
                )}
            </div>
            {/* {error ? (
                <ErrorMsg error={error} />
            ) : null} */}
        </div>
    )
}

export default TextInput