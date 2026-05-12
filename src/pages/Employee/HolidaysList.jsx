import React, { useState } from 'react';
import {
    CalendarIcon,
    CheckCircle2,
    Clock3,
    FileText,
    LogIn,
    LogOut,
} from 'lucide-react';

const HolidaysList = () => {

    const [holidayType, setHolidayType] = useState('');
    
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
    
    const kpiData = [
        { label: 'All', value: holidays.length, icon: 'time', color: '#ec4899', bgColor: '#fdf2f8', type: '' },
        { label: 'Restricted Holidays', value: holidays?.filter(holiday => holiday?.type === "Restricted").length, icon: 'checkmark-circle', color: '#10b981', bgColor: '#f0fdf4', type: 'restricted' },
        { label: 'General Holidays', value: holidays?.filter(holiday => holiday?.type === "General").length, icon: 'document-text', color: '#f59e0b', bgColor: '#fffbeb', type: 'general' },
    ];

    const filteredHoliday = holidayType
        ? holidays.filter(
            (holiday) => holiday?.type?.toLowerCase() === holidayType
        )
        : holidays;

    const iconMap = {
        time: Clock3,
        'checkmark-circle': CheckCircle2,
        'document-text': FileText,
        calendar: CalendarIcon,
    };

    return (
        <div className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Holidays</h1>
                <p className="text-gray-600 text-sm mt-1">Holidays, 2026</p>
            </div>

            {/* KPI Cards */}
            <div className="mb-4">
                <div className="flex gap-4 overflow-x-auto pb-2 lg:gap-4 lg:overflow-x-visible">
                    {kpiData.map((item) => {
                        return (
                            <div
                                key={item.label}
                                onClick={() => setHolidayType(item.type)}
                                className={`
                                    rounded-xl px-2 border min-w-50 lg:min-w-0 w-fit cursor-pointer
                                    transition-all duration-150 ease-out

                                    ${item.type === holidayType
                                        ? `
                                        bg-pink-300 border-gray-200 text-white
                                        shadow-inner translate-y-0.5 scale-[0.98] font-semibold
                                    `
                                        : `
                                        bg-white border-gray-200 shadow-sm
                                        hover:shadow-md hover:-translate-y
                                        active:shadow-inner active:translate-y-0.5 active:scale-[0.98]
                                    `}
                                `}
                            >
                                <div className="flex justify-between item-center p-2 gap-4">
                                    <div className='flex items-center'>
                                        <p className="text-xl">{item.label}</p>
                                        {/* <p className="text-gray-600 text-md">{item.label}</p> */}
                                    </div>
                                    <div
                                        className="min-w-7 h-7 rounded-lg flex items-center justify-center self-center"
                                        style={{ backgroundColor: item.bgColor }}
                                    >
                                        {/* <IconComponent size={28} color={item.color} /> */}
                                        <div className='text-lg font-semibold text-black'>
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* holiday section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
                <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between -mt-1">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Upcoming Holidays
                        </h2>
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
                                            <p className="text-sm font-medium text-gray-900">
                                                {holiday.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {date.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Type badge */}
                                    <div
                                        className={`
                                            text-xs px-3 py-1 rounded-full font-medium
                                            ${holiday.type === "General"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"}
                                        `}
                                    >
                                        {holiday.type}
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HolidaysList