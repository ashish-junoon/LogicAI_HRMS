import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { Calendar, Ellipsis, LogOut, LogOutIcon, Plus, Sparkle, Sparkles, SquareArrowOutUpLeft, SquareArrowOutUpRight, Timer, Users } from 'lucide-react';
import KPI from '../../components/utils/KPI';
import OffboardingList from '../../components/OffboardingList';
import Modal from '../../components/utils/Modal';
import SearchInput from '../../components/utils/SearchInput';

const kpiData = [
    { label: 'Total Exits', value: '2', icon: 'users', color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'To be Approved', value: '15', icon: 'time', color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'In Progress', value: '06', icon: 'progress', color: '#0284c7', bgColor: '#e0f2fe', },
    { label: 'Completed', value: 23, icon: 'sparkles', color: '#f59e0b', bgColor: '#fef3c7', },
]

const Offboarding = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    return (
        <>
            <div className="flex h-full bg-gray-50">
                <div className="flex-1 overflow-y-auto p-6">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Employee Offboarding
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Offboard employees with ease
                            </p>
                        </div>

                        {/* <Button
                            icon={SquareArrowOutUpRight}
                            iconRight
                            onClick={() => { navigate('/offboarding') }}
                        >
                            Offboard
                        </Button> */}
                    </div>


                    {/* KPI Cards */}
                    <div className="flex flex-wrap gap-6 mb-8">
                        {kpiData.map((item) => {
                            const IconComponent = {
                                users: LogOutIcon,
                                time: Timer,
                                progress: Ellipsis,
                                sparkles: Sparkle
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

                    <div className='w-full flex justify-end mb-4'>
                        <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                    </div>
                    <OffboardingList />
                </div>
            </div>
        </>
    )
}

export default Offboarding;