import { Calendar, Plus, Sparkles, SquareArrowOutUpRight, Users } from 'lucide-react';
import React, { useState } from 'react'
import Button from '../../components/utils/Button';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/utils/SearchInput';

// Sample recent PreScreenings data
const candidatesData = [
    {
        id: 'OB-001',
        name: 'Alex Thompson',
        role: 'Senior Software Engineer',
        status: 'pending',
    },
    {
        id: 'OB-002',
        name: 'Priya Sharma',
        role: 'Product Designer',
        status: 'pending',
    }
]

const PreScreening = () => {

    const navigate = useNavigate();

    const [startPreScreening, setStartPreScreening] = useState(false);
    const [expanded, setExpanded] = useState({});
    const [query, setQuery] = useState('');
    const [candidates, setCandidates] = useState(candidatesData);

    const toggleExpand = (id) => {
        setExpanded((s) => ({ ...s, [id]: !s[id] }));
    }

    const handleAccept = (id) => {
        setCandidates(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, status: 'accepted' }
                    : item
            )
        );
    };

    const handleReject = (id) => {
        setCandidates(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, status: 'rejected' }
                    : item
            )
        );
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Employee PreScreening
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Onboard new hires with ease
                        </p>
                    </div>

                    <Button
                        icon={SquareArrowOutUpRight}
                        iconRight
                        onClick={() => { navigate('/admin/interview') }}
                    >
                        Add for Interview
                    </Button>
                </div>


                {/* recent PreScreenings */}
                <div className="mt-6">
                    <div className='flex justify-between mb-4'>
                        <h2 className="text-lg font-semibold text-gray-900 self-center">Recent PreScreenings</h2>
                        <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                    </div>

                    <div className="space-y-4">
                        {candidates.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm p-4"
                            >
                                <div className="flex items-center justify-between">

                                    {/* Left */}
                                    <div className="flex items-center gap-4">

                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                            {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                        </div>

                                        <div>

                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-slate-900">
                                                    {item.name}
                                                </h3>

                                                <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                                                    Pending Review
                                                </span>
                                            </div>

                                            <p className="text-sm text-slate-600 mt-1">
                                                Applied for <span className="font-medium">{item.role}</span>
                                            </p>

                                            <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                                                <span>Exp: 4.5 Years</span>
                                                <span>Current: Infosys</span>
                                                <span>Interview: 28 Jun 2026</span>
                                                <span>Recruiter: Priya Sharma</span>
                                            </div>

                                        </div>

                                    </div>

                                    {/* Right */}
                                    <div className="flex items-center gap-3">
                                        {item.status === 'pending' ? (
                                            <>
                                                <Button
                                                    style="!bg-green-600"
                                                    onClick={() => handleAccept(item.id)}
                                                >
                                                    Accept
                                                </Button>

                                                <Button
                                                    style="!bg-red-500"
                                                    onClick={() => handleReject(item.id)}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <span
                                                className={`px-3 mr-5 py-1 rounded-full text-sm font-medium ${item.status === 'accepted'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {item.status === 'accepted' ? 'Accepted' : 'Rejected'}
                                            </span>
                                        )}
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

export default PreScreening;