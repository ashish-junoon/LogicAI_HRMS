import React, { useMemo, useState } from 'react'
import Button from '../../components/utils/Button'
import { CircleX, SquareCheckBig } from 'lucide-react'
import SearchInput from '../../components/utils/SearchInput'

const sampleRequests = [
  { id: 1, name: 'Alice Johnson', role: 'Frontend Dev', dateRange: 'May 20 - May 21, 2026', type: 'Annual Leave', status: 'pending' },
  { id: 2, name: 'Bob Smith', role: 'Product Manager', dateRange: 'May 22, 2026', type: 'Sick Leave', status: 'pending' },
  { id: 3, name: 'Clara Green', role: 'QA Engineer', dateRange: 'May 15, 2026', type: 'Annual Leave', status: 'approved' },
]

const Tab = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm font-medium transition ${active ? 'bg-linear-to-r from-pink-500 to-violet-500 text-white' : 'bg-gray-100 text-gray-600'}`}
  >
    {children}
  </button>
)

const LeaveCard = ({ req, onApprove, onReject }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-linear-to-br from-pink-400 to-violet-600 flex items-center justify-center text-white font-semibold">{req.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>

        <div>
          <div className="text-sm font-semibold text-gray-900">{req.name}</div>
          <div className="text-xs text-gray-500">{req.role} • {req.type}</div>
          <div className="text-xs text-gray-400 mt-1">{req.dateRange}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {req.status === 'pending' ? (
          <>
            <SquareCheckBig size={24} color='blue' className='cursor-pointer' onClick={() => onApprove(req.id)} />
            <CircleX size={24} color='red' className='cursor-pointer' onClick={() => onReject(req.id)} />
          </>
        ) : (
          <div className={`px-3 py-1 text-sm rounded-full ${req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{req.status}</div>
        )}
      </div>
    </div>
  )
}

const ManageLeaves = () => {
  const [tab, setTab] = useState('all')
  const [requests, setRequests] = useState(sampleRequests)
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (tab === 'all') return requests
    return requests.filter(r => (tab === 'pending' ? r.status === 'pending' : r.status === 'approved'))
  }, [tab, requests])

  function handleApprove(id) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  }

  function handleReject(id) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  }

  return (
    <div className="flex h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Leaves</h1>
            <p className="mt-1 text-sm text-gray-500">Create & manage leaves</p>
          </div>

        </div>


        {/* main content  */}
        <div className='grid grid-cols-3 gap-6'>
          {/* left side  */}
          <div className='space-y-6 col-span-2'>
            <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-200 w-full'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>Team Leave Requests</h3>
                  <p className='text-xs text-gray-500'>Review and manage team leave requests</p>
                </div>

                <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />


                {/* <div className='flex items-center gap-3'>
                  <Tab active={tab === 'all'} onClick={() => setTab('all')}>All ({requests.length})</Tab>
                  <Tab active={tab === 'pending'} onClick={() => setTab('pending')}>Pending ({requests.filter(r=>r.status==='pending').length})</Tab>
                  <Tab active={tab === 'approved'} onClick={() => setTab('approved')}>Approved ({requests.filter(r=>r.status==='approved').length})</Tab>
                </div> */}
              </div>

              <div className='mt-6 space-y-3'>
                {filtered.length === 0 ? (
                  <div className='flex flex-col items-center justify-center py-12 text-center text-gray-400'>
                    <div className='mb-4 text-4xl'>📅</div>
                    <div>No leave requests</div>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {filtered.map(r => (
                      <LeaveCard key={r.id} req={r} onApprove={handleApprove} onReject={handleReject} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='space-y-6 col-span-1'>
            <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-200 w-full'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-900'>This Month</h3>
                <div className='text-xs text-gray-500'>May 2026</div>
              </div>

              <div className='grid grid-cols-7 gap-2 text-center text-xs text-gray-400'>
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => {
                  const isToday = day === 28
                  const isLeave = [20, 21, 22].includes(day)
                  return (
                    <div key={day} className={`py-2 rounded-lg ${isToday ? 'bg-linear-to-br from-pink-800 to-pink-500 text-white' : isLeave ? 'bg-pink-500 text-white' : 'bg-transparent text-gray-400'}`}>{day}</div>
                  )
                })}
              </div>

              <div className='mt-4 space-y-2'>
                <div className='flex items-center gap-2'><div className='h-3 w-3 rounded-full bg-linear-to-br from-pink-800 to-pink-500' /> <div className='text-xs text-gray-500'>Today</div></div>
                <div className='flex items-center gap-2'><div className='h-3 w-3 rounded-full bg-pink-500 text-white' /> <div className='text-xs text-gray-500'>Leave Days</div></div>
              </div>

            </div>

            <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-200 w-full'>
              <h3 className='text-lg font-semibold text-gray-900'>Leave Policy</h3>

              <ul className='mt-4 space-y-3 text-sm text-gray-500'>
                <li className='flex items-start gap-3'>
                  <svg className='h-5 w-5 text-green-400 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path></svg>
                  <div>Earned leaves carry forward to next year</div>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ManageLeaves;