import React, { useState } from 'react'
import KPI from '../../components/utils/KPI'
import { Calendar, CircleX, Ellipsis, LogOutIcon, LucideGitGraph, Sparkle, Timer, UsersIcon, WindArrowDownIcon, Mail, Phone, Eye } from 'lucide-react'
import Button from '../../components/utils/Button'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../../components/utils/SearchInput'
import { employees } from '../../content/dummyData'

const kpiData = [
    { label: 'Total Employees', value: '2', icon: UsersIcon, color: '#ec4899', bgColor: '#fce7f3', },
    // { label: 'Avg. Performance', value: '15', unit: "%", icon: LucideGitGraph, color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'Avg. Attendance', value: '06', unit: "%", icon: Calendar, color: '#0284c7', bgColor: '#e0f2fe', },
    { label: 'On Leave Today', value: 23, icon: WindArrowDownIcon, color: '#f59e0b', bgColor: '#fef3c7', },
]

const employeeDetails = employees;

const SmallStat = ({ title, value }) => (
    <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
        <p className="text-xs text-slate-500">{title}</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
)

const Employees = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const filteredEmployees = employees.filter((emp) =>
        `${emp?.name} ${emp?.email} ${emp?.role} ${emp?.phone}`
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Manage Employees
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Onboard, view, edit employees
                        </p>
                    </div>

                    {/* <Button
                        icon={Plus}
                        iconRight
                        onClick={() => { navigate('/onboarding/emp1260') }}
                    >
                        Add Employee
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

                <div className="">
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">All Employees</h2>
                            {/* <p className="text-sm text-gray-500">Monitor each payout status in the current payroll batch.</p> */}
                        </div>
                        <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                    </div>

                    <div className='space-y-4 max-h-100 overflow-y-auto'>
                        {filteredEmployees.map((emp, i) => (
                            <div className="rounded-xl bg-white p-6 shadow-sm" key={i}>
                                <div className="flex items-center justify-between gap-6">
                                    {/* Left: avatar + name/role */}
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center text-lg font-semibold">AJ</div>
                                        <div className="min-w-0">
                                            <h3 className="text-md font-semibold text-gray-900 truncate">{emp?.name}</h3>
                                            <p className="text-sm text-gray-500 truncate">{emp?.role}</p>
                                        </div>
                                    </div>

                                    {/* Right: performance + attendance + menu */}
                                    <div className="flex items-center gap-5">
                                        <div className="hidden sm:flex items-center gap-6">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <span className="truncate">{emp?.email}</span>
                                            </div>

                                            <div className="flex items-center gap-2 min-w-0">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span className="truncate">{emp?.phone}</span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-left text-gray-500">Performance</p>
                                                <progress max={100} value={emp?.performance} className='w-12 h-2 bg-slate-100 rounded-full overflow-hidden' />
                                                {/* <div className="bg-gray-300 min-w-16 rounded-lg h-2 relative">
                                                    <div className='w-[84%] bg-pink-400 absolute inset-0' />
                                                </div> */}
                                                <span className="text-sm text-gray-900 font-semibold ml-2">{emp?.performance}%</span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-left text-gray-500">Attendance</p>
                                                <progress max={100} value={emp?.attendance} className='w-12 h-2 bg-slate-100 rounded-full overflow-hidden' />
                                                <span className="text-sm text-gray-900 font-semibold ml-2">{emp?.attendance}%</span>
                                            </div>
                                        </div>
                                        <button className="inline-flex h-9 w-9 bg-gray-100 items-center justify-center rounded-full hover:bg-slate-100 text-slate-500"
                                            onClick={() => navigate('/admin/employee/123')}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department Performance + Recent Activities */}
                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                        <div className="space-y-4">
                            {[{ label: 'Frontend', members: 8, value: 92 }, { label: 'Backend', members: 10, value: 88 }, { label: 'Design', members: 4, value: 90 }, { label: 'QA', members: 2, value: 87 }].map((d) => (
                                <div key={d.label}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-700">{d.label} <span className="text-sm text-gray-400">({d.members} members)</span></p>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">{d.value}%</div>
                                    </div>

                                    <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-linear-to-r from-blue-400 to-pink-400" style={{ width: `${d.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                        <div className="space-y-3">
                            {[{ title: 'Leave approved for David Brown', time: '2 hours ago' }, { title: 'Performance review completed for Alice Johnson', time: '5 hours ago' }, { title: 'New team member Emma Davis joined', time: '1 day ago' }].map((act) => (
                                <div key={act.title} className="bg-slate-50 rounded-lg p-4">
                                    <p className="text-sm font-semibold text-gray-900">{act.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Employees;