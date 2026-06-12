import React from 'react'

const KPI = ({ label, value, unit, bgColor, color, IconComponent, description, style }) => {
    return (
        <div
            key={label}
            className={`bg-white rounded-xl shadow-sm p-4 border border-gray-200 max-w-72 ${style}`}
        >
            <div className="flex justify-between items-start gap-4">
                <div>
                    <p className="text-sm text-gray-500 mb-2">{label}</p>
                    <p className="text-3xl font-bold text-gray-800">{value} <span className='text-base text-gray-600'>{unit}</span></p>
                </div>
                {IconComponent && (
                    <div className="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center">
                        <IconComponent className="text-pink-600" size={26} />
                    </div>
                )}
            </div>
            <div>
                {description && <p className="mt-3 text-sm text-gray-500">{description}</p>}
            </div>
        </div>
    )
}

export default KPI;