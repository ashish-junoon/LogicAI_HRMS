import React from 'react'

function Button({type = 'type', icon: Icon, onClick, style = "", iconRight, children, ...props}) { //icon as icon component
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex h-fit self-center cursor-pointer items-center justify-center gap-3 rounded-md px-4 py-2 text-sm font-semibold text-white bg-pink-600 transition 
                ${iconRight && 'flex-row-reverse'}
                ${style}`}
            {...props}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    )
}

export default Button;