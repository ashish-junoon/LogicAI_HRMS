
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import NotificationShade from '../Notifications'

const PrivateLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* TopBar */}
                <TopBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} setNotificationOpen={setNotificationOpen} />

                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>

            </div>

            <NotificationShade isOpen={notificationOpen} setIsOpen={setNotificationOpen} />
        </div>
    )
}

export default PrivateLayout