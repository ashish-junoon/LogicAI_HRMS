import React, { useState } from 'react'
import Button from './utils/Button'
import { Calendar, Eye, MessageSquare, CreditCard, Cross, CircleX } from 'lucide-react'
import Modal from './utils/Modal'

const SmallStat = ({ title, value, onClick }) => (
    <div className="flex-1 rounded-2xl border border-slate-50 bg-slate-50 px-4 py-3 cursor-pointer" onClick={onClick} >
        <p className="text-sm text-slate-600">{title}</p>
        <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
)

const OffboardingCard = ({ employee = {} }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        name = 'Unknown',
        empId = 'EMP000',
        role = '',
        dept = '',
        manager = '',
        lastWorkingDay = '',
        progress = 0,
        assets = '0 / 0 Returned',
        clearance = '0 / 0 Completed',
        exitInterview = 'Pending',
        status = 'In Progress',
        assetDetails = null,
    } = employee

    const returnedMatch = assets.match(/(\d+)\s*\/\s*(\d+)/)
    const returnedCount = returnedMatch ? Number(returnedMatch[1]) : 0
    const totalAssets = returnedMatch ? Number(returnedMatch[2]) : 3

    const assetList = assetDetails || [
        { name: 'Laptop', tag: 'JSP-LAP-2024-001', returned: returnedCount >= 1 },
        { name: 'Headset', tag: 'JSP-HSD-2024-002', returned: returnedCount >= 2 },
        { name: 'Charger', tag: 'JSP-CHG-2024-003', returned: returnedCount >= 3 },
    ].slice(0, totalAssets)

    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()

    const statusClass = (s) => {
        if (!s) return 'text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full'
        if (s.toLowerCase().includes('progress')) return 'text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full'
        if (s.toLowerCase().includes('completed')) return 'text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full'
        if (s.toLowerCase().includes('failed')) return 'text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full'
        return 'text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full'
    }

    return (
        <>
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center text-lg font-semibold">{initials}</div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-900">{name}</h3>
                        <p className="text-sm opacity-90">{empId} • {role}</p>

                        <div className="mt-3 flex items-center gap-3">
                            <span className={`${statusClass(status)}`}>{status}</span>
                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">Resignation</span>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> <span>Last Working Day:</span></div>
                        <div className="font-medium">{lastWorkingDay}</div>
                    </div>
                    <Button icon={CircleX} iconRight style='mt-5 !bg-red-500'>
                        Reject
                    </Button>
                </div>
            </div>

            <div className="mt-4 mx-2">
                <p className="text-sm text-slate-700 mb-2">Clearance Progress</p>
                <div className="w-full rounded-full bg-slate-100 h-3 overflow-hidden">
                    <div className="h-full rounded-full bg-linear-to-r from-pink-400 to-red-400" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <SmallStat title="Assets" value={assets} onClick={()=>setIsModalOpen(true)} />
                {/* <SmallStat title="Clearance" value={clearance} /> */}
                <SmallStat title="Exit Interview" value={exitInterview} />
            </div>

            {/* <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Button style={'bg-pink-600 text-white'}> <Eye className="mr-2 h-4 w-4" /> View Details</Button>
        <Button style={''}> <MessageSquare className="mr-2 h-4 w-4" /> Exit Interview</Button>
        <Button style={' text-pink-500'}> <CreditCard className="mr-2 h-4 w-4" /> Settlement</Button>
      </div> */}
        </div>

        

      {/* modal  */}
      <Modal
        title={'Asset Return Details'}
        description={'Read-only asset return status for this offboarding employee.'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{name}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{assets}</h3>
            <p className="text-sm text-slate-500">Asset return progress for offboarding clearance.</p>
          </div>

          <div className="space-y-3">
            {assetList.map((item, index) => (
              <label key={`${item.tag}-${index}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <input
                  type="checkbox"
                  checked={item.returned}
                  disabled
                  className="h-4 w-4 accent-pink-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.tag}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs ${item.returned ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {item.returned ? 'Returned' : 'Pending'}
                </span>
              </label>
            ))}
          </div>

          {/* <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            These checkboxes are disabled because this modal is only for review.
          </div> */}
        </div>
      </Modal>
        
        </>
    )
}

export default OffboardingCard
