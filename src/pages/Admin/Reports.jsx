import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { CalendarArrowDown, CalendarArrowUp, ChartSplineIcon, ClipboardClock, FilterIcon, IndianRupee, Plus, UsersIcon } from 'lucide-react';
import KPI from '../../components/utils/KPI';

const kpiData = [
    { label: 'Total Employees', value: '225', icon: UsersIcon, color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'Avg. Attendance', value: '15', unit: "%", icon: CalendarArrowUp, color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'Total Payroll', value: '600k', unit: "", icon: IndianRupee, color: '#0284c7', bgColor: '#e0f2fe', },
    // { label: 'Avg. Performance', value: '94', unit: "%", icon: ChartSplineIcon, color: '#0284c7', bgColor: '#e0f2fe', },
];

const reportData = [
    {
        id: 1,
        title: 'Monthly Attendance Summary',
        description: 'Detailed attendance report for October 2025',
        category: 'Attendance',
        owner: 'HR Admin',
        date: 'Oct 15, 2025',
        size: '2.4 MB',
        downloads: '45 downloads',
        label: 'PDF',
        icon: ClipboardClock,
    },
    {
        id: 2,
        title: 'Q3 2025 Payroll Report',
        description: 'Complete payroll summary for Q3 2025',
        category: 'Payroll',
        owner: 'Finance Team',
        date: 'Oct 1, 2025',
        size: '5.1 MB',
        downloads: '28 downloads',
        label: 'Excel',
        icon: IndianRupee,
    },
]

const quickActions = [
    { id: 1, title: 'Attendance Report', icon: ClipboardClock },
    { id: 2, title: 'Payroll Summary', icon: IndianRupee },
    { id: 3, title: 'Employee List', icon: UsersIcon },
    { id: 4, title: 'Performance Report', icon: ChartSplineIcon },
]

const Reports = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex h-full bg-gray-50">
                <div className="flex-1 overflow-y-auto p-6">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Reports
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create, generate and download reports
                            </p>
                        </div>

                        {/* <Button
                            icon={Plus}
                            iconRight
                            onClick={() => { setIsModalOpen(true) }}
                        >
                            Add Report
                        </Button> */}
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

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {reportData.map((report) => {
                                    const IconComponent = report.icon
                                    return (
                                        <div key={report.id} className="rounded-xl border border-slate-200 p-5 shadow-sm">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-pink-600 shadow-sm">
                                                    <IconComponent className="h-6 w-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-base font-semibold text-gray-900">{report.title}</h3>
                                                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                                                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                                        <span className="rounded-lg bg-white px-3 py-1 text-slate-500 shadow-sm">{report.category}</span>
                                                        <span>{report.owner}</span>
                                                        <span>•</span>
                                                        <span>{report.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end justify-between gap-3">
                                                    <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-violet-600 shadow-sm">{report.label}</span>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        <span>{report.size}</span>
                                                        <span>•</span>
                                                        <span>{report.downloads}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex flex-wrap items-center justify-start gap-3">
                                                <button className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">View</button>
                                                <button className="rounded-lg bg-pink-500 px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90">Download</button>
                                            </div>
                                        </div>
                                    )})}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900">Generate</h3>
                                <div className="mt-6 space-y-3">
                                    {quickActions.map((action) => (
                                        <button key={action.id} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm font-medium text-gray-700 transition hover:bg-white">
                                            <action.icon className="h-5 w-5 text-pink-500" />
                                            {action.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Reports;