import React, { useState, useEffect } from 'react'
import { Settings, LogOut, Home, Users, Calendar, FileText, Briefcase, HelpCircle, BarChart3, X, SquareArrowRightExit, Coffee, Notebook, LayoutList, PartyPopper, Handshake, ArrowUpNarrowWide, OrigamiIcon, TreesIcon, IndianRupee, DoorOpen, Users2, CalendarArrowUp, LucideWaves, CalendarMinus, StickyNoteIcon, ReceiptPoundSterling, BadgeMinus, Map, ChevronDown, File, FileArchive, FileAxis3dIcon, ToolCase, Cog, Braces } from 'lucide-react'
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen }) => {

    const { pathname } = useLocation();
    // console.log(pathname)

    const navigate = useNavigate();

    const { logout, user } = useAuth();

    // admin menu tabs
    const menuItems = [
        { icon: Home, label: 'Overview', path: '/admin/dashboard' },
        { icon: ArrowUpNarrowWide, label: 'Onboard', path: '/admin/onboarding', menu: 'Employees' },
        { icon: DoorOpen, label: 'Offboard', path: '/admin/offboarding', menu: 'Employees' },
        { icon: Users2, label: 'Employees', path: '/admin/employees' },
        { icon: Calendar, label: 'Attendance', path: '/admin/attendance' },
        { icon: BarChart3, label: 'Payroll', path: '/admin/payroll' },
        { icon: IndianRupee, label: 'Benefits', path: '/admin/benefits', menu: 'Payroll' },
        { icon: BadgeMinus, label: 'Deductions', path: '/admin/deductions', menu: 'Payroll' },
        { icon: TreesIcon, label: 'Organization', path: '/admin/organization' },
        { icon: ToolCase, label: 'Assets', path: '/admin/manage-assets'},
        { icon: Users2, label: 'Users', path: '/admin/users', },
        { icon: CalendarArrowUp, label: 'Holidays', path: '/admin/holidays', menu: 'Attendance' },
        { icon: CalendarMinus, label: 'Leaves', path: '/admin/leaves', menu: 'Attendance' },
        // { icon: FileAxis3dIcon, label: 'Documents', path: '/admin/documents', menu: 'Employees' },
        // { icon: StickyNoteIcon, label: 'Recruitment', path: '/admin/recruitment', menu: 'Employees' },
        { icon: ReceiptPoundSterling, label: 'Reports', path: '/admin/reports' },
        { icon: Map, label: 'Field Employees', path: '/admin/field', menu: 'Employees' },
        // master pages 
        { icon: Braces, label: 'Offer Letters', path: '/admin/master/offer-letter', menu: 'Master'},
        { icon: Braces, label: 'Pages', path: '/admin/master/pages', menu: 'Master'},
        { icon: Braces, label: 'Branches', path: '/admin/master/branches', menu: 'Master'},
        { icon: Braces, label: 'Designations', path: '/admin/master/designations', menu: 'Master'},
        { icon: Braces, label: 'Departments', path: '/admin/master/departments', menu: 'Master'},
        { icon: Braces, label: 'Managers', path: '/admin/master/managers', menu: 'Master'},
        { icon: Braces, label: 'Leave Types', path: '/admin/master/leave-types', menu: 'Master'},
        { icon: Braces, label: 'States', path: '/admin/master/states', menu: 'Master'},
        { icon: Braces, label: 'Cities', path: '/admin/master/cities', menu: 'Master'},
    ]

    // employee menu tabs
    const EmpMenuItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Calendar, label: 'Calander', path: '/attendance' },
        { icon: BarChart3, label: 'Holidays', path: '/holidays' },
        { icon: Coffee, label: 'Leaves', path: '/leaves' },
        { icon: Notebook, label: 'Payslips', path: '/payslips' },
        { icon: LayoutList, label: 'Task List', path: '/task-list' },
        { icon: Handshake, label: 'Interact', path: '/interact' },
        { icon: FileArchive, label: 'Documents', path: '/documents' },
    ]

    const supportItems = [
        { icon: HelpCircle, label: 'Help center', path: '/help' },
        { icon: Settings, label: 'Setting', path: '/settings' },
    ]

    const actionItems = [
        { icon: SquareArrowRightExit, label: 'Logout', path: '/logout' },
    ]

    const [openGroups, setOpenGroups] = useState({});

    useEffect(() => {
        // auto-open group if current pathname matches one of its children
        const groupsToOpen = {};
        menuItems.forEach(it => {
            if (it.menu) {
                const parent = menuItems.find(p => p.label === it.menu);
                if (parent && pathname === it.path) groupsToOpen[parent.label] = true;
            }
        });
        if (Object.keys(groupsToOpen).length) setOpenGroups(prev => ({ ...prev, ...groupsToOpen }));
    }, [pathname]);

    const toggleGroup = (name) => setOpenGroups(prev => ({ ...prev, [name]: !prev[name] }));

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
                className={`fixed lg:static w-64 h-screen bg-white border-r border-gray-200 p-6 pe-3 overflow-y-auto transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <X size={24} />
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2 mb-8 cursor-pointer">
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
                        {user.role === 'admin' ? (
                            <>
                                {/* Render normal items with explicit parents or no menu property */}
                                {menuItems.map((item) => {
                                    if (item.menu) return null;

                                    const children = menuItems.filter(mi => mi.menu === item.label);
                                    const isActive = pathname === item.path || children.some(c => c.path === pathname);

                                    return (
                                        <div key={item.label}>
                                            <div
                                                onClick={() => { if (item.path) navigate(item.path); if (children.length) toggleGroup(item.label); }}
                                                className={`flex items-center justify-between gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700 ${isActive ? 'bg-pink-100 text-pink-700' : 'hover:bg-pink-50 hover:text-pink-600'} transition`}>
                                                <div className='flex items-center gap-3'>
                                                    <item.icon size={20} />
                                                    <span>{item.label}</span>
                                                </div>
                                                {children.length > 0 && (
                                                    <ChevronDown size={16} className={`text-gray-400 transform transition-transform duration-200 ${openGroups[item.label] ? 'rotate-180' : ''}`} />
                                                )}
                                            </div>

                                            {children.length > 0 && (
                                                <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out mt-1 space-y-1 pl-6 ${openGroups[item.label] ? 'max-h-60' : 'max-h-0'}`}>
                                                    {children.map(child => (
                                                        <div
                                                            key={child.label}
                                                            onClick={() => navigate(child.path)}
                                                            className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700 ${pathname === child.path ? 'bg-pink-100 text-pink-700' : 'hover:bg-pink-50 hover:text-pink-600'} transition`}>
                                                            <child.icon size={16} />
                                                            <span className='text-sm'>{child.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}

                                {/* Render orphaned menu groups (items with menu property that don't have a parent) */}
                                {Array.from(
                                    new Set(
                                        menuItems
                                            .filter(it => it.menu && !menuItems.some(mi => mi.label === it.menu && !mi.menu))
                                            .map(it => it.menu)
                                    )
                                ).map(menuName => {
                                    const children = menuItems.filter(mi => mi.menu === menuName);
                                    return (
                                        <div key={menuName}>
                                            <div
                                                onClick={() => toggleGroup(menuName)}
                                                className={`flex items-center justify-between gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition`}>
                                                <div className='flex items-center gap-3'>
                                                    <span>{menuName}</span>
                                                </div>
                                                <ChevronDown size={16} className={`text-gray-400 transform transition-transform duration-200 ${openGroups[menuName] ? 'rotate-180' : ''}`} />
                                            </div>

                                            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out mt-1 space-y-1 pl-6 ${openGroups[menuName] ? 'max-h-auto' : 'max-h-0'}`}>
                                                {children.map(child => (
                                                    <div
                                                        key={child.label}
                                                        onClick={() => navigate(child.path)}
                                                        className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700 ${pathname === child.path ? 'bg-pink-100 text-pink-700' : 'hover:bg-pink-50 hover:text-pink-600'} transition`}>
                                                        <child.icon size={16} />
                                                        <span className='text-sm'>{child.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            EmpMenuItems.map((item) => (
                                <div
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700  ${pathname === item.path ? "bg-pink-100 text-pink-700" : "hover:bg-pink-50 hover:text-pink-600"} transition`}

                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </div>
                            ))
                        )}
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
                                className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700  ${pathname === item.path ? "bg-pink-100 text-pink-700" : "hover:bg-pink-50 hover:text-pink-600"} transition`}

                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Action Section */}
                <div className='mb-5'>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-4 mt-8">Actions</p>
                    <nav className="space-y-2">
                        {actionItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={logout}
                                className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition w-full"
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className='text-pink-800 font-semibold text-sm text-center bg-white py-1 rounded-full -mb-2 bg-linear-to-r from-transparent via-pink-200 to-transparent'>
                    © Powered by LogicAI
                </div>
            </div>
        </>
    )
}

export default Sidebar;