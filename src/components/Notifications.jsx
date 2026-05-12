import { X, Bell } from 'lucide-react';
import { useState } from 'react';

const NotificationShade = ({ isOpen, setIsOpen }) => {

    // dummy notifications (replace with API data)
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Attendance Marked", desc: "You checked in at 9:05 AM", time: "2 min ago" },
        { id: 2, title: "Payroll Processed", desc: "March salary credited", time: "1 hr ago" },
        { id: 3, title: "New Holiday घोषित", desc: "Company holiday on Friday", time: "Yesterday" },
    ]);

    const clearAll = () => setNotifications([]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Notification Drawer */}
            <div
                className={`fixed top-0 right-0 h-screen w-80 bg-white border-l border-gray-200 shadow-lg z-50 transform transition-transform duration-300 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <Bell size={20} />
                        <h2 className="font-semibold text-lg">Notifications</h2>
                    </div>

                    <button onClick={() => setIsOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center px-4 py-2 border-b text-sm">
                    <span className="text-gray-500">
                        {notifications.length} items
                    </span>
                    <button
                        onClick={clearAll}
                        className="text-pink-600 hover:underline"
                    >
                        Clear all
                    </button>
                </div>

                {/* Notification List */}
                <div className="overflow-y-auto h-[calc(100%-110px)]">
                    {notifications.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">
                            No notifications
                        </p>
                    ) : (
                        notifications.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border-b border-gray-300 hover:bg-gray-50 transition cursor-pointer"
                            >
                                <h3 className="text-sm font-medium text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    {item.desc}
                                </p>
                                <span className="text-xs text-gray-400 mt-2 block">
                                    {item.time}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default NotificationShade;