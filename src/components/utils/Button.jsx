import React from 'react'

function Button({type = 'button', icon: Icon, onClick, style = "", iconRight, iconFlip, loading, children, ...props}) { //icon as icon component
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex h-fit self-center cursor-pointer items-center justify-center gap-3 rounded-md px-4 py-2 text-sm font-semibold text-white bg-pink-600 transition 
                ${iconRight && ' flex-row-reverse '}
                ${style}`}
            {...props}
        >
            {Icon && <Icon className={iconFlip ? "transform -scale-x-100" : "" + (loading ? "animate-spin": "")} size={18} />}
            {children}
        </button>
    )
}

export default Button;