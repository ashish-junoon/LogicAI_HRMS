import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
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

const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    // <div className='text-3xl m-4'>HRMS Day 2</div>
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </> :
                <>
                <Route path="/dashboard" element={<Home/>} />
                <Route path="/attendance" element={<Attendance/>} />
                <Route path="/holidays" element={<HolidaysList/>} />
                <Route path="/leaves" element={<Leaves/>} />
                <Route path="/payslips" element={<Payslips />} />
                <Route path="/task-list" element={<TasksList/>} />

                {/* extra routes */}
                <Route path="/settings" element={<Settings/>} />
                <Route path="/help" element={<Information/>} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              }
            </Route>
          </>
        }
      </Routes>
    </Router>
  )
}

export default App;