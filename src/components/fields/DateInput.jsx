import ErrorMsg from '../utils/ErrorMsg'

const DateInput = ({ label, id, type = "date", required, style = "", error, ...props }) => {

    return (
        <div className="mb-0">
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                {label}{required ? <span className="text-danger text-sm">*</span> : ""}
            </label>

            <div className='relative'>
                <input
                    id={id}
                    type={type}
                    className={`h-9 w-full rounded-lg border border-gray-200 px-2 text-sm outline-none transition focus:border-gray-400 focus:bg-white ${style}`}
                    {...props} // type
                />
            </div>
            {error ? (
                <ErrorMsg error={error} />
            ) : null}
        </div>
    )
}

export default DateInput