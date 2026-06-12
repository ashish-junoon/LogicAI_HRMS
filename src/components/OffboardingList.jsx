import React from 'react'
import OffboardingCard from './OffboardingCard'

const sample = [
  {
    name: 'Rajesh Kumar',
    empId: 'EMP001',
    role: 'Senior Software Engineer',
    dept: 'Engineering',
    manager: 'Priya Sharma',
    lastWorkingDay: '15 Dec 2025',
    progress: 65,
    assets: '1 / 3 Returned',
    clearance: '2 / 6 Completed',
    exitInterview: 'Pending',
    status: 'In Progress'
  },
  {
    name: 'Anjali Verma',
    empId: 'EMP045',
    role: 'Marketing Manager',
    dept: 'Marketing',
    manager: 'Vikram Singh',
    lastWorkingDay: '21 Oct 2025',
    progress: 100,
    assets: '3 / 3 Returned',
    clearance: '6 / 6 Completed',
    exitInterview: 'Completed',
    status: 'Completed'
  }
]

const OffboardingList = () => {
  return (
    <div className="space-y-6">
      {sample.map((emp) => (
        <OffboardingCard key={emp.empId} employee={emp} />
      ))}
    </div>
  )
}

export default OffboardingList
