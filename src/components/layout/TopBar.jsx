import { Menu, Search, Bell, Settings, LogOut, Home, Users, Calendar, FileText, Briefcase, HelpCircle, BarChart3, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// TopBar Component
const TopBar = ({ isOpen, setIsOpen, setNotificationOpen }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-5">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                    <Menu size={24} />
                </button>

                {/* Search Bar */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-4 py-2 gap-2">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-80"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative text-gray-600 hover:text-gray-900 transition"
                    onClick={() => setNotificationOpen(true)}
                >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Settings */}
                <button className="text-gray-600 hover:text-gray-900 transition"
                    onClick={()=> navigate('/settings')}
                >
                    <Settings size={20} />
                </button>

                {/* Profile */}
                {user.role === "admin" ?
                    <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold">
                            A
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
                    </div>
                    :
                    <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold">
                            A
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:inline">Employee</span>
                    </div>
                }
            </div>
        </div >
    )
}

export default TopBar;