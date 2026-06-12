import React, { useState } from 'react'
import KPI from '../../components/utils/KPI'
import { AlertCircle, Calendar, Eye, Footprints, LeafyGreen, LocateOff, LucideGitGraph, MailWarning, MessageSquareWarning, UsersIcon, WindArrowDownIcon } from 'lucide-react'
import DataTable from 'react-data-table-component'
import Chip from '../../components/utils/Chip'
import SearchInput from '../../components/utils/SearchInput'

const kpiData = [
  { label: 'Total Employees', value: 20, unit: null, icon: UsersIcon, color: '#ec4899', bgColor: '#fce7f3', },
  { label: 'Present Today', value: '15', unit: null, icon: LeafyGreen, color: '#dc2626', bgColor: '#fee2e2', },
  { label: 'Absent Today', value: '06', unit: null, icon: AlertCircle, color: '#0284c7', bgColor: '#e0f2fe', },
  { label: 'On Leave Today', value: 23, unit: null, icon: MessageSquareWarning, color: '#f59e0b', bgColor: '#fef3c7', },
  { label: 'Late Arrivals', value: 23, unit: null, icon: Footprints, color: '#f59e0b', bgColor: '#fef3c7', },
]

const departmentAttendance = [
  { name: 'IT', total: '42', present: '42', absent: '2', late: '4' },
  { name: 'Sales', total: '40', present: '40', absent: '0', late: '4' },
  { name: 'Marketing', total: '47', present: '47', absent: '7', late: '4' },
  { name: 'HR', total: '35', total: '35', present: '35', absent: '7', late: '4' },
  { name: 'Operations', total: '35', present: '35', absent: '5', late: '4' },
]

const puchoutTime = new Date(Date.now() + 6 * 36e5).toLocaleTimeString();

const employeeAttendance = [
  { empId: 'EMP1260', name: 'Alice Alan', department: 'IT', status: 'present', punchIn: new Date().toLocaleTimeString(), punchOut: puchoutTime },
  { empId: 'EMP1261', name: 'Justin Bewver', department: 'Sales', status: 'absent', punchIn: new Date().toLocaleTimeString(), punchOut: puchoutTime },
  { empId: 'EMP1262', name: 'Alakh Panday', department: 'Operations', status: 'leave', punchIn: new Date().toLocaleTimeString(), punchOut: puchoutTime },
  { empId: 'EMP1263', name: 'Vladir Putin', department: 'Sales', status: 'late', punchIn: new Date().toLocaleTimeString(), punchOut: puchoutTime },
  { empId: 'EMP1264', name: 'Donald Duck', department: 'HR', status: 'present', punchIn: new Date().toLocaleTimeString(), punchOut: puchoutTime },
]

const EmpAttendance = () => {

  const [query, setQuery] = useState('');

  const columns = [
    {
      name: 'Department Name',
      selector: row => row?.name,
    },
    {
      name: 'Total',
      selector: row => (row?.total ?? "N/A"),
    },
    {
      name: 'Present',
      selector: row => <span className='text-green-600 font-semibold'>{row?.present ?? "N/A"}</span>,
    },
    {
      name: 'Absent',
      selector: row => <span className='text-red-600 font-semibold'>{row?.absent ?? "N/A"}</span>,
    },
    {
      name: 'Late',
      selector: row => <span className='text-yellow-600 font-semibold'>{row?.late ?? "N/A"}</span>,
    },
    {
      name: 'Attendance %',

      selector: row => (
        <div className='flex gap-3 items-center'>
          {/* <progress max={100} value={84} className='h-2 bg-slate-100 rounded-full overflow-hidden' /> */}
          <div className="bg-gray-300 min-w-24 rounded-lg h-2 relative">
            <div className='w-[84%] bg-pink-400 absolute inset-0' />
          </div>
          <span>84%</span>
        </div>
      ),
    },
  ];

  const empColumns = [
    {
      name: 'ID',
      selector: row => row?.empId,
    },
    {
      name: 'Name',
      selector: row => (row?.name ?? "N/A"),
    },
    {
      name: 'Department',
      selector: row => row?.department ?? "N/A",
    },
    {
      name: 'Status',
      selector: row => <Chip title={row?.status ?? "N/A"} color={row?.status === "present" ? 'green' : 'red'} />,
    },
    {
      name: 'Punch In',
      selector: row => row?.punchIn ?? "N/A",
    },
    {
      name: 'Punch Out',
      selector: row => row?.punchOut ?? "N/A",
    },
    {
      name: 'Working Hours',
      selector: row => "8 hrs" ?? "N/A",
    },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Attendance
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage company-wide attendance, policies and compliance
            </p>
          </div>

          {/* <Button
            icon={Plus}
            iconRight
            onClick={() => { navigate('/onboarding/emp1260') }}
          >
            Add Employee
          </Button> */}
        </div>

        {/* KPI Cards */}
        <div className="flex flex-wrap gap-6 mb-8">
          {kpiData.map((item) => {
            return (
              <KPI
                key={item.label}
                label={item.label}
                value={item.value}
                unit={item?.unit}
                bgColor={item.bgColor}
                color={item.color}
                style={'h-fit min-w-56'}
                IconComponent={item['icon']}
              />
            )
          })}
        </div>


        {/* employee's attendance status  */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 mb-10">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Employee - Attendance Status</h2>
              <p className="text-sm text-gray-500">Date Selected : {new Date().toLocaleDateString()}</p>
            </div>
            <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
          </div>

          <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200">
            <DataTable.default
              columns={empColumns}
              data={employeeAttendance}
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





        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 mb-10">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Department-Wise Attendance</h2>
              <p className="text-sm text-gray-500">Today's attendance breakdown by department</p>
            </div>
            <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
          </div>

          <div className="overflow-hidden border rounded-tl-xl rounded-tr-xl border-slate-200 mb-10">
            <DataTable.default
              columns={columns}
              data={departmentAttendance}
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
    </div>
  )
}

export default EmpAttendance;