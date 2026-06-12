import React, { useRef, useState } from 'react'
import Button from '../../components/utils/Button';
import Modal from '../../components/utils/Modal';
import { FileArchive, FileText, Download, Trash2, Eye, Plus, Upload, FileAxis3D, Edit, Trash, Send } from 'lucide-react';
import SelectInput from '../../components/fields/SelectInput';
import SearchInput from '../../components/utils/SearchInput';
import DataTable from 'react-data-table-component';
import Chip from '../../components/utils/Chip';

const sampleDocs = [
    {
        id: 1,
        user: 'Sample Employee',
        document: 'Salary_Slip_Jan_2026.pdf',
        type: 'Salary Slip',
        size: 124000,
        status: 'Uploaded',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedAt: '2026-05-10'
    },
    {
        id: 2,
        user: 'Sample Employee',
        document: 'Offer_Letter.pdf',
        type: 'Offer Letter',
        size: 45000,
        status: 'Sent',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedAt: '2025-12-01'
    },
    {
        id: 3,
        user: 'Sample Employee',
        document: 'Appointment_Letter.pdf',
        type: 'Appointment Letter',
        size: 82000,
        status: 'Uploaded',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedAt: '2026-04-15'
    },
    {
        id: 4,
        user: 'Sample Employee',
        document: 'Experience_Certificate.pdf',
        type: 'Experience Certificate',
        size: 60000,
        status: 'Failed',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedAt: '2026-03-20'
    },
]

const sampleCards = [
    {
        id: 'card-1',
        document: 'Salary_Slip_Jan_2026.pdf',
        type: 'Salary Slip',
        size: 124000,
        uploadedAt: '2026-05-10',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
        id: 'card-2',
        document: 'Offer_Letter.pdf',
        type: 'Offer Letter',
        size: 45000,
        uploadedAt: '2025-12-01',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
        id: 'card-3',
        document: 'Appointment_Letter.pdf',
        type: 'Appointment Letter',
        size: 82000,
        uploadedAt: '2026-04-15',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    // {
    //     id: 'card-4',
    //     document: 'Experience_Certificate.pdf',
    //     type: 'Experience Certificate',
    //     size: 60000,
    //     uploadedAt: '2026-03-20',
    //     url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    // },
]

const formatSize = (bytes) => {
    if (!bytes) return '—'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const formatDate = (d) => {
    try { return new Date(d).toLocaleDateString() } catch { return d }
}

const Documents = () => {
    const [showCreate, setShowCreate] = useState(false)
    const [docs, setDocs] = useState(sampleDocs)
    const [query, setQuery] = useState('')
    const [formData, setFormData] = useState({ user: '', document: '', type: '', status: 'Uploaded' })
    const fileRef = useRef()

    const handleUpload = (e) => {
        e.preventDefault()
        const file = fileRef.current.files[0]
        if (!file) return

        const newDoc = {
            id: Date.now(),
            user: formData.user || 'Unknown',
            document: formData.document || file.name,
            type: formData.type || 'Document',
            status: formData.status || 'Uploaded',
            size: file.size,
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
        }

        setDocs(prev => [newDoc, ...prev])
        setShowCreate(false)
        setFormData({ user: '', document: '', type: '', status: '' })
        fileRef.current.value = null
    }

    const handleDelete = (id) => {
        setDocs(prev => prev.filter(d => d.id !== id))
    }

    const columns = [
        {
            name: 'User',
            selector: row => row?.user ?? "N/A",
        },
        {
            name: 'Document Name',
            selector: row => row?.document ?? "N/A",
        },
        {
            name: 'Document Type',
            selector: row => row?.type ?? "N/A",
        },
        {
            name: 'Document Size',
            selector: row => formatSize(row?.size),
        },
        {
            name: 'Status',
            selector: row => {
                const status = row?.status ?? 'N/A'
                const color = status === 'Uploaded' ? 'green' : status === 'Sent' ? 'blue' : status === 'Failed' ? 'red' : 'gray'
                return <Chip title={status} color={color} />
            }
        },
        {
            name: 'Uploaded At',
            selector: row => formatDate(row?.uploadedAt) ?? "N/A",
        },
        {
            name: 'Actions',
            selector: row => (
                <div className="flex gap-4 p-0 rounded-md">
                    <Eye size={18} color='blue' className='cursor-pointer' />
                    <Send size={18} color='blue' className='cursor-pointer' />
                    <Trash size={18} color='red' className='cursor-pointer' />
                </div>
            ),
        },
    ];

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Documents</h1>
                        <p className="mt-1 text-sm text-gray-500">Upload and manage your personal documents</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* <SearchInput query={query} setQuery={setQuery} /> */}

                        {/* <Button icon={FileArchive} onClick={() => setShowCreate(true)}>Upload</Button> */}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                    {sampleCards.map(doc => (
                        <div key={doc.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm min-w-64">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                                        <FileText className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold text-gray-900">{doc.document}</h3>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Sample • {doc.type} • {formatSize(doc.size)}</p>

                                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                            <span>Uploaded: {formatDate(doc.uploadedAt)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <button onClick={() => window.open(doc.url, '_blank')} className="p-1 py-0 rounded-md hover:bg-gray-100">
                                        <Eye className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <a href={doc.url} download={doc.document} className="p-1 rounded-md hover:bg-gray-100">
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </a>
                                    <button className="p-1 rounded-md hover:bg-gray-100 opacity-50 cursor-not-allowed">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {sampleCards.length === 0 && (
                        <div className="col-span-full grid grid-cols-1 flex-1 h-64 rounded-lg border bg-white p-6 text-center text-gray-500">
                            <div className='place-self-center'>
                                <FileAxis3D className='inline-block' size={20} /> No documents found
                            </div>
                        </div>
                    )}
                </div>

                {/* employee's document status table  */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 mb-10">
                    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">All Documents</h2>
                            {/* <p className="text-sm text-gray-500">Currently: 23</p> */}
                        </div>

                        <div className='flex gap-3'>
                            <SearchInput query={query} setQuery={setQuery} />
                            <Button icon={FileArchive} onClick={() => setShowCreate(true)}>Upload</Button>
                        </div>
                    </div>

                    <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
                        <DataTable.default
                            columns={columns}
                            data={docs}
                            pagination
                            highlightOnHover
                            striped
                            customStyles={
                                {
                                    headRow: {
                                        style: {
                                            backgroundColor: '#f3f4f6',
                                            borderBottomWidth: '1px',
                                            borderBottomColor: '#e5e7eb',
                                            borderTopLeftRadius: '10px',
                                            borderTopRightRadius: '10px',
                                            fontWeight: '700'
                                        },
                                    },
                                }}
                        />
                    </div>
                </div>
            </div>

            {/* Upload modal */}
            <Modal
                title="Upload Document"
                description="Add a document to your personal documents"
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
            >
                <form id="uploadDoc" onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">File (*pdf)</label>
                        <input ref={fileRef} type="file" accept='.pdf' className="w-full text-sm border border-gray-200 p-2 rounded-md" />
                    </div>                 

                    <div className="grid gap-4 sm:grid-cols-2">
                        <SelectInput
                            label={"Document Type"}
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            options={[
                                { label: "Offer Letter", value: "Offer Letter" },
                                { label: "Salary Slip", value: "Salary Slip" },
                                { label: "Certificate", value: "Certificate" },
                                { label: "Other", value: "Other" },
                            ]}
                        />

                        <SelectInput
                            label={"Send To"}
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            options={[
                                { label: "Mr. Rohit (IT)", value: "Rohit" },
                                { label: "Praveen Gautam(IT)", value: "Praveen" },
                                { label: "Prakash (Sales)", value: "Prakash" },
                            ]}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" iconRight icon={Upload}>Upload</Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Documents;