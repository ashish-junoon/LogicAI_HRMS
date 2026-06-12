import React from 'react'
import { Users, Calendar, BarChart3, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import KPI from '../../components/utils/KPI'

// Dashboard Component
const Dashboard = () => {
    const navigate = useNavigate()

    const holidayItems = [
        { date: '15 Aug', day: 'Saturday', name: 'Independence Day' },
        { date: '28 Aug', day: 'Friday', name: 'Raksha Bandhan' },
    ]

    const kpiData = [
        { label: 'Present Today', value: '99', icon: 'users', color: '#ec4899', bgColor: '#fce7f3', description: 'Total employees present today' },
        { label: 'Absent Today', value: '15', icon: 'users', color: '#dc2626', bgColor: '#fee2e2', description: 'Unplanned absences.' },
        { label: 'On Leave', value: '06', icon: 'calendar', color: '#0284c7', bgColor: '#e0f2fe', description: 'Employees currently on leave.' },
        { label: 'Total Employees', value: 118, icon: 'sparkles', color: '#f59e0b', bgColor: '#fef3c7', description: 'Company workforce strength overview.' },
    ]

    return (
        <div className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 text-sm mt-1">Home / Dashboard</p>
                    </div>
                    <div className="rounded-lg px-4 py-2 shadow-sm">
                        <p className="text-xl font-semibold text-gray-900">May 18, 2026</p>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {kpiData.map((item) => {
                    const IconComponent = {
                        users: Users,
                        calendar: Calendar,
                        sparkles: Sparkles
                    }[item.icon]

                    return (
                        <KPI
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            bgColor={item.bgColor}
                            color={item.color}
                            style={'h-fit'}
                            IconComponent={IconComponent}
                            description={item.description}
                        />
                    )
                })}
            </div>

            {/* Charts and Holiday Overview */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Team Performance</h2>
                            <p className="text-sm text-gray-500 mt-1">This week's productivity and attendance trends.</p>
                        </div>
                        <button className="text-sm font-medium text-pink-600 hover:text-pink-700">Details</button>
                    </div>
                    <div className="h-72 flex items-center justify-center rounded-xl bg-gray-50 border border-dashed border-gray-200">
                        <p className="text-gray-500">Chart placeholder</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900"> Holidays</h2>
                            <p className="text-sm text-gray-500 mt-1">Holiday overview from company calendar.</p>
                        </div>
                        <Calendar className="text-blue-600" size={22} />
                    </div>

                    <div className="space-y-4">
                        {holidayItems.map((holiday) => (
                            <div key={holiday.date + holiday.name} className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-2">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-white border border-gray-200 px-3 py-2 text-center">
                                        <p className="text-sm font-semibold text-gray-900">{holiday.date}</p>
                                        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">{holiday.day}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{holiday.name}</p>
                                        <p className="text-xs text-gray-500">Company holiday</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/holidays')}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
                    >
                        View More
                        <ArrowRight className="ml-2" size={16} />
                    </button>
                </div>
            </div>

            {/* Employee Status Table */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Employee Status</h3>
                        <p className="text-sm text-gray-500 mt-1">Quick view of current employee activity.</p>
                    </div>
                    <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">View All →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700">ID</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Job role</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Team Lead</th>
                                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: '2583', name: 'John Smith', role: 'UI/UX Designer', status: 'Active', tl: 'Sheldon V' },
                                { id: '2587', name: 'Anika Deewan', role: 'React Developer', status: 'Active', tl: 'Kailn C' },
                                { id: '2589', name: 'Ahmad Baik', role: 'Graphic Designer', status: 'Inactive', tl: 'Kanya F' },
                            ].map((emp) => (
                                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-pink-600">{emp.id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{emp.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{emp.role}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${emp.status === 'Active'
                                                ? 'bg-pink-100 text-pink-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{emp.tl}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        <button className="rounded-full p-2 hover:bg-gray-100">
                                            <BarChart3 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;