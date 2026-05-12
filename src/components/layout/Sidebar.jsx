import { Settings, LogOut, Home, Users, Calendar, FileText, Briefcase, HelpCircle, BarChart3, X, SquareArrowRightExit, Coffee, Notebook, LayoutList } from 'lucide-react'
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen }) => {

    const { pathname } = useLocation();
    console.log(pathname)

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    // admin menu tabs
    const menuItems = [
        { icon: Home, label: 'Overview', path: '/dashboard' },
        { icon: BarChart3, label: 'Payroll', path: '/payroll' },
        { icon: Calendar, label: 'Attendance', path: '/attendance' },
    ]

    // employee menu tabs
    const EmpMenuItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Calendar, label: 'Attendance', path: '/attendance' },
        { icon: BarChart3, label: 'Holidays', path: '/holidays' },
        { icon: Coffee, label: 'Leaves', path: '/leaves' },
        { icon: Notebook, label: 'Payslips', path: '/payslips' },
        { icon: LayoutList, label: 'Task List', path: '/task-list' },
    ]

    const supportItems = [
        { icon: HelpCircle, label: 'Help center', path: '/help' },
        { icon: Settings, label: 'Setting', path: '/settings' },
    ]

    const actionItems = [
        { icon: SquareArrowRightExit, label: 'Logout', path: '/logout' },
    ]

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#00000013] lg:hidden z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static w-58 h-screen bg-white border-r border-gray-200 p-6 pe-3 overflow-y-auto transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <X size={24} />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-6 bg-pink-500 transform rotate-45"></div>
                        <div className="w-6 h-6 bg-gray-900 transform rotate-45"></div>
                    </div>
                    <span className="font-bold text-lg text-gray-900">HRMS</span>
                </div>

                {/* General Section */}
                <div className="mb-8">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-4">General</p>
                    <nav className="space-y-2">
                        {user.role === 'admin' && menuItems.map((item) => (
                            <div
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700  ${pathname === item.path ? "bg-pink-100 text-pink-700" : "hover:bg-pink-50 hover:text-pink-600"} transition`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                        {user.role !== 'admin' && EmpMenuItems.map((item) => (
                            <div
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700  ${pathname === item.path ? "bg-pink-100 text-pink-700" : "hover:bg-pink-50 hover:text-pink-600"} transition`}

                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Support Section */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-4">Support</p>
                    <nav className="space-y-2">
                        {supportItems.map((item) => (
                            <a
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700  ${pathname === item.path ? "bg-pink-100 text-pink-700" : "hover:bg-pink-50 hover:text-pink-600"} transition`}

                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Action Section */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-4 mt-8">Actions</p>
                    <nav className="space-y-2">
                        {actionItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={logout}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition w-full"
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidebar;