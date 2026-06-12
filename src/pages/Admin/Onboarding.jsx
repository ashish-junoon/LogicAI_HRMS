import { Calendar, Plus, Sparkles, SquareArrowOutUpRight, Users } from 'lucide-react';
import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import KPI from '../../components/utils/KPI';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/utils/SearchInput';

// Sample recent onboardings data
const recentOnboards = [
    {
        id: 'OB-001',
        name: 'Alex Thompson',
        role: 'Senior Software Engineer',
        department: 'Engineering',
        startDate: 'Oct 20, 2025',
        progress: 72,
        email: 'alex.t@company.com',
        phone: '+1 (555) 111-2222',
        completedSteps: ['Personall Info', 'Company Info'],
        currentStep: 'Employment Info'
    },
    {
        id: 'OB-002',
        name: 'Priya Sharma',
        role: 'Product Designer',
        department: 'Product',
        startDate: 'Nov 02, 2025',
        progress: 45,
        email: 'priya.s@company.com',
        phone: '+91 98765 43210',
        completedSteps: ['Personall Info'],
        currentStep: 'Company Info'
    }
]

const kpiData = [
    { label: 'Total Onboards', value: '99', icon: 'users', color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'Completed', value: '15', icon: 'users', color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'In Progress', value: '06', icon: 'calendar', color: '#0284c7', bgColor: '#e0f2fe', },
    { label: 'Pending', value: 23, icon: 'sparkles', color: '#f59e0b', bgColor: '#fef3c7', },
]

const Onboarding = () => {

    const navigate = useNavigate();

    const [startOnboarding, setStartOnboarding] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [query, setQuery] = useState('');

    const toggleExpand = (id) => {
        setExpanded((s) => ({ ...s, [id]: !s[id] }));
    }

    const handleContinue = (id) => {
        console.log('Continue onboarding for', id);
        // navigation or onboarding flow will be wired later
    }

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Employee Onboarding
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Onboard new hires with ease
                        </p>
                    </div>

                    <Button
                        icon={SquareArrowOutUpRight}
                        iconRight
                        onClick={() => { navigate('/admin/onboarding/emp1260') }}
                    >
                        Add Employee
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="flex flex-wrap gap-6 mb-8">
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
                                style={'h-fit w-52'}
                                IconComponent={IconComponent}
                            />
                        )
                    })}
                </div>


                {/* recent onboardings */}
                <div className="mt-6">
                    <div className='flex justify-between mb-4'>
                        <h2 className="text-lg font-semibold text-gray-900 self-center">Recent Onboardings</h2>
                        <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                    </div>

                    <div className="space-y-4">
                        {recentOnboards.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-indigo-500 to-pink-500  text-white flex items-center justify-center font-semibold">
                                        {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-md font-semibold text-gray-900">{item.name}</h3>
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">in progress</span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">{item.role} • {item.department}</p>
                                                <p className="text-xs text-gray-400 mt-1">Start: {item.startDate} • Current: {item.currentStep}</p>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-linear-to-r from-blue-400 to-emerald-400" style={{ width: `${item.progress}%` }} />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2">{item.progress}%</p>
                                            </div>
                                        </div>

                                        {expanded[item.id] && (
                                            <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="text-sm text-gray-700 flex items-center gap-6">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path></svg>
                                                            <span>{item.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"></path></svg>
                                                            <span>{item.phone}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button onClick={() => handleContinue(item.id)} style={'bg-pink-600 text-white'}>Continue Onboarding</Button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800 mb-2">Completed Steps:</p>
                                                    <div className="flex gap-3 flex-wrap">
                                                        {item.completedSteps.map((s) => (
                                                            <div key={s} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">{s}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 flex items-center gap-3">
                                            <button onClick={() => toggleExpand(item.id)} className="text-sm font-medium text-pink-600 hover:text-pink-700">
                                                {expanded[item.id] ? 'Hide Details' : 'View Details'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Onboarding;