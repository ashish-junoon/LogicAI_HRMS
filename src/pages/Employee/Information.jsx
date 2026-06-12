import React, { useState } from "react";
import { Search, HelpCircle, FileText, Phone, Mail } from "lucide-react";

const Information = () => {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState('contact'); // default else 'request'

    const helpSections = [
        {
            title: "Getting Started",
            items: [
                "How to update your profile",
                "Understanding dashboard",
                "How to apply for leave",
            ],
        },
        {
            title: "Attendance & Leaves",
            items: [
                "Marking attendance",
                "Leave request process",
                "Holiday calendar usage",
            ],
        },
        {
            title: "Account & Security",
            items: [
                "Change password",
                "Update email/phone",
                "Notification preferences",
            ],
        },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Help & Information
                    </h1>
                    <p className="text-gray-600 text-sm mt-1">
                        Find answers and support for using HRMS
                    </p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl p-2 shadow-sm mb-6">
                    <div className="flex items-center gap-3">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search help topics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Help Sections */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {helpSections.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <HelpCircle size={18} className="text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {section.title}
                                </h2>
                            </div>

                            <ul className="space-y-2">
                                {section.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                                    >
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900">
                        Quick Help
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 cursor-pointer bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">
                            View Documentation
                        </button>
                        <button
                            onClick={() => setActiveTab('request')}
                            className="px-4 py-2 cursor-pointer border border-gray-300 shadow-xm rounded-lg text-sm hover:bg-gray-50">
                            Submit a Request
                        </button>
                    </div>
                </div>

                {activeTab === 'contact' ?
                    // {/* Contact Support */ }
                    (<div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900">
                            Contact Support
                        </h2>

                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex items-center gap-3">
                                <Mail size={16} />
                                <span>support@yourcompany.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={16} />
                                <span>+91 98765 43210</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FileText size={16} />
                                <span>Mon - Fri, 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>)
                    :
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900">
                            Submit a Request
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            <textarea
                                rows={4}
                                placeholder="Describe your issue..."
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">
                                    Submit
                                </button>

                                <button
                                    onClick={() => setActiveTab("contact")}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Information;