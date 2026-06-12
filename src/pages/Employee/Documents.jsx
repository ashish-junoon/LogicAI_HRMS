import React, { useRef, useState } from 'react'
import Button from '../../components/utils/Button';
import Modal from '../../components/utils/Modal';
import { FileArchive, FileText, Download, Trash2, Eye, Plus, Search, Upload, FileAxis3D } from 'lucide-react';
import SelectInput from '../../components/fields/SelectInput';

const sampleDocs = [
    {
        id: 1,
        name: 'Resume.pdf',
        type: 'Resume',
        size: 124000,
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedAt: '2026-05-10'
    },
    {
        id: 2,
        name: 'Offer_Letter.pdf',
        type: 'HR',
        size: 45000,
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadedAt: '2025-12-01'
    },
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
    const fileRef = useRef()

    const filtered = docs.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.type.toLowerCase().includes(query.toLowerCase()))

    const handleUpload = (e) => {
        e.preventDefault()
        const file = fileRef.current.files[0]
        if (!file) return

        const newDoc = {
            id: Date.now(),
            name: file.name,
            type: file.type || 'Document',
            size: file.size,
            url: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString()
        }

        setDocs(prev => [newDoc, ...prev])
        setShowCreate(false)
        fileRef.current.value = null
    }

    const handleDelete = (id) => {
        setDocs(prev => prev.filter(d => d.id !== id))
    }

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
                        <p className="mt-1 text-sm text-gray-500">Upload and manage your personal documents</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                placeholder="Search documents"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-64 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none"
                            />
                            <Search className="absolute right-2 top-1/4 text-gray-400 " size={16} />
                        </div>

                        <Button icon={FileArchive} onClick={() => setShowCreate(true)}>Upload</Button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {filtered.map(doc => (
                        <div key={doc.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm min-w-64">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                                        <FileText className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-semibold text-gray-900">{doc.name}</h3>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">{doc.type} • {formatSize(doc.size)}</p>

                                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                            <span>Uploaded: {formatDate(doc.uploadedAt)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <button onClick={() => window.open(doc.url, '_blank')} className="p-1 py-0 rounded-md hover:bg-gray-100">
                                        <Eye className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <a href={doc.url} download={doc.name} className="p-1 rounded-md hover:bg-gray-100">
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </a>
                                    <button onClick={() => handleDelete(doc.id)} className="p-1 rounded-md hover:bg-gray-100">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="col-span-full grid grid-cols-1 flex-1 h-64 rounded-lg border bg-white p-6 text-center text-gray-500">
                            <div className='place-self-center'>
                                <FileAxis3D className='inline-block' size={20} /> No documents found
                            </div>
                        </div>
                    )}
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
                            <label className="mb-1 block text-sm font-medium text-gray-700">File</label>
                            <input ref={fileRef} type="file" className="w-full text-sm  border border-gray-200 p-2 rounded-md" />
                        </div>

                        {/* <div>
                            <label className="mb-1 block text-xs font-medium text-gray-700">Document Type</label>
                            <input name="type" placeholder="e.g., Resume, ID, Certificate" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
                        </div> */}
                        <SelectInput
                            label={"Document Type"}
                            options={[
                                { label: "Bank", Value: "Bank" },
                                { label: "Education", Value: "Education" },
                                { label: "Other", Value: "Other" },
                            ]}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" iconRight icon={Upload}>Upload</Button>
                        </div>
                    </form>
                </Modal>

            </div>
        </div>
    )
}

export default Documents;