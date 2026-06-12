import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard.jsx';
import { useAuth } from './context/AuthContext.jsx';
import PrivateLayout from './components/layout/PrivateLayout.jsx';
import Home from './pages/Employee/Home.jsx';
import Attendance from './pages/Employee/Attendance.jsx';
import HolidaysList from './pages/Employee/HolidaysList.jsx';
import Settings from './pages/Employee/Settings.jsx';
import Information from './pages/Employee/Information.jsx';
import Leaves from './pages/Employee/Leaves.jsx';
import TasksList from './pages/Employee/TasksList.jsx';
import Payslips from './pages/Employee/Payslips.jsx';
import Interact from './pages/Employee/Interact.jsx';
import Onboarding from './pages/Admin/Onboarding.jsx';
import OnboardSteps from './pages/Admin/OnboardSteps.jsx';
import Organization from './pages/Admin/Organization.jsx';
import Payroll from './pages/Admin/Payroll.jsx';
import Benefits from './pages/Admin/Benefits.jsx';
import Offboarding from './pages/Admin/Offboarding.jsx';
import EmpPayroll from './pages/Admin/EmpPayroll.jsx';
import Employees from './pages/Admin/Employees.jsx';
import EmpAttendance from './pages/Admin/EmpAttendance.jsx';
import Users from './pages/Admin/Users.jsx';
import EmpHolidays from './pages/Admin/EmpHolidays.jsx';
import ManageLeaves from './pages/Admin/ManageLeaves.jsx';
import Recruitment from './pages/Admin/Recruitment.jsx';
import Reports from './pages/Admin/Reports.jsx';
import Deductions from './pages/Admin/Deductions.jsx';
import FieldEmployees from './pages/Admin/FieldEmployees.jsx';
import Documents from './pages/Employee/Documents.jsx';
import ManageDocuments from './pages/Admin/ManageDocuments.jsx';
import ManageAssets from './pages/Admin/ManageAssets.jsx';
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import ManageBranches from './pages/Admin/master/BranchList.jsx';
import ManageDesignation from './pages/Admin/master/Designation.jsx';
import ManageDepartments from './pages/Admin/master/Department.jsx';
import ManageLeaveTypes from './pages/Admin/master/LeaveTypes.jsx';
import ManageManagers from './pages/Admin/master/Managers.jsx';
import ManageStates from './pages/Admin/master/StateList.jsx';
import ManageCities from './pages/Admin/master/CityList.jsx';
import Permissions from './pages/Admin/Permissions.jsx';
import ManagePages from './pages/Admin/master/PagesList.jsx';
import ManageOL from './pages/Admin/master/OfferLetter.jsx';

const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <Router>
      <Routes>
        {!isAuthenticated ?
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
          :
          <>
          //adding layout using nested route approach
            <Route element={<PrivateLayout />}>
              {user.role === "admin" ?
                <>
                  <Route path="/admin">
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="onboarding" element={<Onboarding />} />
                    <Route path="onboarding/:id" element={<OnboardSteps />} />
                    <Route path="offboarding" element={<Offboarding />} />
                    <Route path="organization" element={<Organization />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="attendance" element={<EmpAttendance />} />
                    <Route path="payroll" element={<Payroll />} />
                    <Route path="payroll/:id" element={<EmpPayroll />} />
                    <Route path="benefits" element={<Benefits />} />
                    <Route path="deductions" element={<Deductions />} />
                    <Route path="users" element={<Users />} />
                    <Route path="holidays" element={<EmpHolidays />} />
                    <Route path="leaves" element={<ManageLeaves />} />
                    <Route path="documents" element={<ManageDocuments />} />
                    <Route path="recruitment" element={<Recruitment />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="field" element={<FieldEmployees />} />
                    <Route path="manage-assets" element={<ManageAssets />} />
                    <Route path="employee/:id" element={<ProfilePage />} />
                    <Route path="permissions/:id" element={<Permissions />} />
                    {/* master pages  */}
                    <Route path="master/branches" element={<ManageBranches />} />
                    <Route path="master/designations" element={<ManageDesignation />} />
                    <Route path="master/departments" element={<ManageDepartments />} />
                    <Route path="master/managers" element={<ManageManagers />} />
                    <Route path="master/leave-types" element={<ManageLeaveTypes />} />
                    <Route path="master/states" element={<ManageStates />} />
                    <Route path="master/cities" element={<ManageCities />} />
                    <Route path="master/pages" element={<ManagePages />} />
                    <Route path="master/offer-letter" element={<ManageOL />} />
                  </Route>
                  <Route path="settings" element={<Settings />} />
                  <Route path="help" element={<Information />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </> :
                <>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/holidays" element={<HolidaysList />} />
                  <Route path="/leaves" element={<Leaves />} />
                  <Route path="/payslips" element={<Payslips />} />
                  <Route path="/task-list" element={<TasksList />} />
                  <Route path="/interact" element={<Interact />} />
                  <Route path="/documents" element={<Documents />} />

                  {/* extra routes */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/help" element={<Information />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              }
            </Route>
            {/* <Route path="/test" element={<TestPage />} /> */}
          </>
        }
      </Routes>
    </Router>
  )
}

export default App;