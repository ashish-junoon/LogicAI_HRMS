import React, { useState } from 'react'
import { Users, Calendar, BarChart3 } from 'lucide-react'


// Dashboard Component
const Dashboard = () => {
    
    return (
                // {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600 text-sm mt-1">Default / Home</p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Stat Cards */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-600 text-sm mb-2">Total Present</p>
                                    <p className="text-4xl font-bold text-gray-900">99</p>
                                </div>
                                <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                                    <Users className="text-pink-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-600 text-sm mb-2">Total Absent</p>
                                    <p className="text-4xl font-bold text-gray-900">15</p>
                                </div>
                                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                                    <Users className="text-red-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-600 text-sm mb-2">Total On Leave</p>
                                    <p className="text-4xl font-bold text-gray-900">06</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Calendar className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-600 text-sm mb-2">Total Employee</p>
                                    <p className="text-4xl font-bold text-gray-900">120</p>
                                </div>
                                <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center">
                                    <Users className="text-pink-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Team Performance Chart */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Team Performance</h3>
                            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Chart placeholder</p>
                            </div>
                        </div>

                        {/* Total Employee Pie Chart */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Total Employee</h3>
                            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Chart placeholder</p>
                            </div>
                        </div>
                    </div>

                    {/* Employee Status Table */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Employee Status</h3>
                            <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                                View All →
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">ID</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Job role</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">TL</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: '2583', name: 'John Smith', role: 'UI/UX Designer', status: 'Active', tl: 'Sheldon V' },
                                        { id: '2587', name: 'Anika Deewan', role: 'React Developer', status: 'Active', tl: 'Kailn C' },
                                        { id: '2589', name: 'Ahmad Baik', role: 'Graphic Designer', status: 'Inactive', tl: 'Kanya F' },
                                    ].map((emp) => (
                                        <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-pink-600 font-medium">{emp.id}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{emp.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{emp.role}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active'
                                                        ? 'bg-pink-100 text-pink-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{emp.tl}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <button className="text-gray-400 hover:text-gray-600">
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