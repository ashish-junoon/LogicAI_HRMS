import React from 'react';
import { Clock, ArrowRightLeft, CheckCircle, User } from 'lucide-react';

const activityIcons = {
    created: <Clock size={14} />,
    moved: <ArrowRightLeft size={14} />,
    completed: <CheckCircle size={14} className="text-green-600" />,
    assigned: <User size={14} />,
};

const ActivitySidebar = ({ isOpen, onClose, activities = [] }) => {
    return (
        <div
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-white shadow-sm border-l border-gray-200
        ${isOpen ? 'w-72' : 'w-0'}`}
        >
            <div
                className={`w-72 h-full flex flex-col transition-opacity duration-500
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            >

                <div className="p-4 border-b border-gray-200">
                    <div className='flex justify-between mb-2' >
                        <h3 className="text-sm font-semibold text-gray-700">
                            Task Performance
                        </h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            ✕
                        </button>
                    </div>

                    {/* chart placeholder */}
                    <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-3">
                        Pie Chart Placeholder
                    </div>

                    {/* legends */}
                    <div className="flex justify-between text-xs gap-2">
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                            Pending
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            Progress
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            Completed
                        </div>
                    </div>
                </div>

                {/* activity timeline */}
                <div className="flex-1 overflow-y-auto p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                        Recent Activities
                    </h3>

                    {activities.length === 0 && (
                        <p className="text-sm text-gray-400">No activity yet</p>
                    )}

                    <div className="relative border-l border-gray-200 ms-4 space-y-6">
                        {activities.map((item) => (
                            <div key={item.id} className="relative -ms-6">

                                {/* timeline dot */}
                                <div className="absolute w-4 h-4 top-1 left-1 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                                    <div className="text-gray-500">
                                        {activityIcons[item.type] || <Clock size={12} />}
                                    </div>
                                </div>

                                {/* content */}
                                <div className="flex gap-3">
                                    {/* avatar */}
                                    <div className="w-12 h-12 rounded-full border-8 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                                        {item.user?.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-sm text-gray-800 leading-snug">
                                            <span className="font-medium">{item.user}</span>{' '}
                                            {item?.type} {item?.task}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {item.time}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ActivitySidebar;