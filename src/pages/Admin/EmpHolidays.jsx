import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { Calendar, CalendarCheck, CalendarCheck2Icon, Edit, Plus, Search, Trash, UsersIcon } from 'lucide-react';
import KPI from '../../components/utils/KPI';
import Chip from '../../components/utils/Chip';
import Modal from '../../components/utils/Modal';
import TextInput from '../../components/fields/TextInput';
import SelectInput from '../../components/fields/SelectInput';
import { useFormik } from 'formik';
import SearchInput from '../../components/utils/SearchInput';


const kpiData = [
    { label: 'Total Holidays', value: '2', icon: Calendar, color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'National', value: '15', unit: "", icon: CalendarCheck2Icon, color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'General', value: '06', unit: "", icon: CalendarCheck, color: '#0284c7', bgColor: '#e0f2fe', },
];

const holidays = [
    {
        name: "Good Friday",
        date: "2026-04-03",
        type: "Restricted",
    },
    {
        name: "Independence Day",
        date: "2026-08-15",
        type: "General",
    },
    {
        name: "Christmas",
        date: "2026-12-25",
        type: "General",
    },
];

const EmpHolidays = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');

    const holidayType = ""
    const filteredHoliday = holidayType
        ? holidays.filter(
            (holiday) => holiday?.type?.toLowerCase() === holidayType
        )
        : holidays;

    const holidayFormik = useFormik({

    })

    return (
        <>
            <div className="flex h-full bg-gray-50">
                <div className="flex-1 overflow-y-auto p-6">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Manage Holidays
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create & manage holidays for employees
                            </p>
                        </div>

                        <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Holiday
                        </Button>
                    </div>

                    {/* KPI Cards */}
                    <div className="flex flex-wrap gap-6 mb-8">
                        {kpiData.map((item) => {
                            return (
                                <KPI
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    unit={item?.unit}
                                    bgColor={item.bgColor}
                                    color={item.color}
                                    style={'h-fit min-w-56'}
                                    IconComponent={item['icon']}
                                />
                            )
                        })}
                    </div>

                    {/* holiday section */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
                        <div className="flex flex-col gap-4">
                            {/* Header */}
                            <div className="flex items-center justify-between -mt-1">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Holidays 2026-2027
                                </h2>
                                <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                            </div>
                            {/* Holiday List */}
                            <div className="flex flex-col gap-3">
                                {filteredHoliday.map((holiday, index) => {
                                    const date = new Date(holiday.date);

                                    return (
                                        <div
                                            key={index}
                                            className="
                                        flex items-center justify-between
                                        p-4 rounded-lg border border-gray-200
                                        hover:bg-gray-50 transition
                                        "
                                        >

                                            {/* Left: Date */}
                                            <div className="flex items-center gap-4">

                                                <div className="
                                            w-12 h-12 rounded-lg
                                            bg-gray-100 flex flex-col items-center justify-center
                                        ">
                                                    <span className="text-sm font-semibold text-gray-800">
                                                        {date.getDate()}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500">
                                                        {date.toLocaleString('default', { month: 'short' })}
                                                    </span>
                                                </div>

                                                {/* Holiday Info */}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 flex gap-2">
                                                        {holiday.name}
                                                        <Chip
                                                            title={holiday?.type}
                                                            color={holiday?.type === "General" ? 'green' : 'yellow'}
                                                            style={"!px-1.5 !py-0.5"}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        {"holiday description"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex gap-2'>
                                                <div className="flex gap-4 p-2 rounded-md">
                                                    <Edit size={18} color='blue' className='cursor-pointer' />
                                                    <Trash size={18} color='red' className='cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* modal  */}
            <Modal
                title={'Add Holiday'}
                description={'create holidays for employees'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='userForm'
            >
                <form id="userForm" onSubmit={holidayFormik.handleSubmit} >
                    <div className="space-y-4">

                        {/* <div className="grid grid-cols-2 gap-3">
                            <TextInput
                                label={"First Name"}
                                placeholder="e.g. John"
                                {...holidayFormik.getFieldProps('firstName')}
                                error={holidayFormik.touched.firstName && holidayFormik.errors.firstName}
                            />

                            <TextInput
                                label={"Last Name"}
                                placeholder="e.g. Sena"
                                {...holidayFormik.getFieldProps('lastName')}
                                error={holidayFormik.touched.lastName && holidayFormik.errors.lastName}
                            />
                        </div> */}

                        <div>
                            <TextInput
                                label={"Title"}
                                placeholder="e.g. independence"
                            />
                        </div>

                        {/* description */}
                        <div>
                            <label className="text-sm text-gray-700 mb-1 block font-medium">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                {...holidayFormik.getFieldProps('description')}
                                placeholder="Enter description for holiday..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                            />
                            {holidayFormik.touched.holiday && holidayFormik.errors.holiday ? (
                                <ErrorMsg error={holidayFormik.errors.holiday} />
                            ) : null}
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <SelectInput
                                label={"Holiday Type"}
                                {...holidayFormik.getFieldProps('holidayType')}
                                options={[
                                    { label: "General", value: "General" },
                                    { label: "Special", value: "Special" },
                                    { label: "Restricted", value: "Restricted" },
                                ]}
                                error={holidayFormik.touched.holidayType && holidayFormik.errors.holidayType}
                            />

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    {...holidayFormik.getFieldProps('date')}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                />
                                {holidayFormik.touched.date && holidayFormik.errors.date ? (
                                    <ErrorMsg error={holidayFormik.errors.date} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EmpHolidays;