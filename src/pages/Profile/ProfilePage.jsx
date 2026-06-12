import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, MoreVertical, Mail, Eye, AlertTriangle, MessageSquare, Wrench, UserPen, IndianRupee, Box, FileArchiveIcon, GraduationCap } from 'lucide-react'
import Button from '../../components/utils/Button'
import Modal from '../../components/utils/Modal'

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('personal-info')

    const tabs = [
        { id: 'personal-info', label: 'Personal Information', icon: UserPen },
        { id: 'payroll', label: 'Payroll', icon: IndianRupee },
        { id: 'assets', label: 'Assets', icon: Box, badge: 3 },
        { id: 'documents', label: 'Document', icon: FileArchiveIcon, badge: 8 },
        { id: 'training', label: 'Training', icon: GraduationCap },
    ]

    const employee = {
        name: 'Mr. John',
        empId: 'EMP07',
        status: 'Active',
        lastClocked: 'A few seconds ago',
        lastMessaged: '2 Days ago',
        email: 'panji@company.com',
    }

    const sampleAssets = [
        { id: 1, asset_id: 'JSP-LAP-2024-001', serial: 'DLL5430X12345', type: 'Laptop', model: 'Lenovo X1 Carbon', condition: 'New', value: '₹120000', status: 'Assigned', assignedTo: employee.name, assignedOn: '2024-06-01' },
        { id: 2, asset_id: 'JSP-MOB-2024-002', serial: 'IPN13X5678', type: 'Mobile', model: 'iPhone 13', condition: 'Used', value: '₹45000', status: 'Assigned', assignedTo: employee.name, assignedOn: '2024-09-15' },
    ]

    const [issueModalOpen, setIssueModalOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [issueText, setIssueText] = useState('')

    const initials = employee.name.split(' ').map(n => n[0]).join('').toUpperCase()

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto">

                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="h-16 w-16 shrink-0 rounded-full bg-linear-to-br from-blue-500 to-pink-500 text-white flex items-center justify-center text-2xl font-bold">
                                {initials}
                            </div>

                            {/* Info */}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 inline-block">{employee.name}</h1>
                                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium ms-2">● Active</span>
                                {/* <p className="text-sm text-gray-500 mt-1">
                                    Employee ID: <span className='font-medium text-gray-900'>EMP1260</span>
                                </p> */}

                                <div className="mt-3 grid grid-cols-3 gap-6 text-sm">
                                    <div>
                                        <p className="text-xs text-gray-500">Last Check In</p>
                                        <p className="font-medium text-gray-900">{employee.lastClocked}</p>
                                    </div>
                                    {/* <div>
                                        <p className="text-xs text-gray-500">Last Messaged</p>
                                        <p className="font-medium text-gray-900">{employee.lastMessaged}</p>
                                    </div> */}
                                    <div>
                                        <p className="text-xs text-gray-500">Employee ID</p>
                                        <p className="font-medium text-gray-900">{employee?.empId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <ChevronLeft className="h-5 w-5 text-gray-600" />
                            </button>
                            <span className="text-sm text-gray-600 px-2">1 of 32</span>
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <MoreVertical className="h-5 w-5 text-gray-600" />
                            </button>
                            <Button style="!bg-pink-600">
                                Mail <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 bg-white">
                    <div className="px-6">
                        <div className="flex items-center gap-1 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-4 flex items-center text-sm font-medium border-b-2 whitespace-nowrap transition ${activeTab === tab.id
                                        ? 'border-pink-600 text-pink-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="inline-block mr-1">{<tab.icon size={16} />}</span>
                                    {tab.label}
                                    {tab.badge && (
                                        <span className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'personal-info' && (
                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                                <button className="text-pink-600 hover:text-pink-700 font-medium">Edit</button>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Full Name</p>
                                    <p className="mt-2 text-gray-900 font-medium">{employee.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Gender</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Marital Status</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Religion</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Place of Birth</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Birthdate</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Blood Type</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Age</p>
                                    <p className="mt-2 text-gray-900 font-medium">—</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contract' && (
                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract</h2>
                            <p className="text-gray-500">Contract information coming soon...</p>
                        </div>
                    )}

                    {activeTab === 'payroll' && (
                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payroll</h2>
                            <p className="text-gray-500">No payslips yet...</p>
                        </div>
                    )}

                    {activeTab === 'assets' && (
                        <div className="">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Assets Assigned</h2>
                                <p className="text-sm text-gray-500">Assigned items for this employee</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {sampleAssets.map(asset => (
                                    <div key={asset.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="h-12 w-12 shrink-0 rounded-lg bg-linear-to-br from-indigo-400 to-pink-400 text-white flex items-center justify-center text-lg font-semibold">
                                                    {asset.type[0]}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900">{asset.model}</h3>
                                                    <p className="mt-1 text-xs text-gray-500">{asset.type} • {asset.asset_id}</p>
                                                    <div className="mt-2 text-xs text-gray-500 space-y-1">
                                                        <div>Serial: <span className="font-medium text-gray-900">{asset.serial}</span></div>
                                                        <div>Condition: <span className="inline-block ml-1 rounded-full px-2 py-0.5 text-xs text-gray-700 bg-slate-100">{asset.condition}</span></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <div className="text-sm font-medium text-gray-900">{asset.value}</div>
                                                <div className="text-xs text-gray-500">Assigned: {asset.assignedOn}</div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <button title="Message" onClick={() => window.alert('Message about: ' + asset.model)} className="p-2 rounded-md hover:bg-gray-100">
                                                        <MessageSquare className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <button title="Raise Issue" onClick={() => { setSelectedAsset(asset); setIssueModalOpen(true) }} className="p-2 rounded-md hover:bg-gray-100">
                                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Modal title={selectedAsset ? `Raise Issue - ${selectedAsset.name}` : 'Raise Issue'} description={'Report an issue for this asset'} isOpen={issueModalOpen} onClose={() => { setIssueModalOpen(false); setIssueText(''); setSelectedAsset(null) }}>
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">Asset: <span className="font-medium text-gray-900">{selectedAsset?.name}</span></p>
                                    <label className="block text-sm text-gray-700">Issue description</label>
                                    <textarea value={issueText} onChange={(e) => setIssueText(e.target.value)} rows={4} className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Describe the problem..." />
                                    <div className="flex justify-end gap-3">
                                        <Button onClick={() => { setIssueModalOpen(false); setIssueText(''); setSelectedAsset(null) }} style={'bg-gray-100 text-gray-700'}>Cancel</Button>
                                        <Button onClick={() => { console.log('Issue raised for', selectedAsset, issueText); setIssueModalOpen(false); setIssueText(''); setSelectedAsset(null) }}>Submit Issue</Button>
                                    </div>
                                </div>Payroll information coming soon...
                            </Modal>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
                            <p className="text-gray-500">No documents yet...</p>
                        </div>
                    )}

                    {activeTab === 'training' && (
                        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Training</h2>
                            <p className="text-gray-500">No training info yet...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage