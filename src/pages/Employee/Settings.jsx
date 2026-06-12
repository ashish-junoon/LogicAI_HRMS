import React, { useState } from 'react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const [form, setForm] = useState({
        name: 'Ravi Kumar',
        email: 'ravim70655@gmail.com',
        phone: '9876543210',
        department: 'Engineering',
        password: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Saved:', form);
    };

    return (
        <div className="flex bg-gray-50">
            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="mx-auto">

                    <h1 className="text-2xl font-bold mb-6 capitalize">
                        {activeTab} 
                        {/* Settings */}
                    </h1>

                    <form onSubmit={handleSave} className="space-y-6">

                        {/* PROFILE */}
                        {activeTab === 'profile' && (
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h2 className="text-lg font-semibold mb-4">
                                    Profile Information
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <label className="w-32 font-medium">Name:</label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled
                                            className="input outline-0 border-b border-gray-400 w-80"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="w-32 font-medium">Email:</label>
                                        <input
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            disabled
                                            className="input outline-0 border-b border-gray-400 w-80"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="w-32 font-medium">Phone:</label>
                                        <input
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            disabled
                                            className="input outline-0 border-b border-gray-400 w-80"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="w-32 font-medium">Department:</label>
                                        <input
                                            name="department"
                                            value={form.department}
                                            disabled
                                            className="input outline-0 border-b border-gray-400 w-80"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY */}
                        {activeTab === 'security' && (
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h2 className="text-lg font-semibold mb-4">
                                    Change Password
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password" className="input border-b border-gray-400 outline-0 w-60" />
                                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="input border-b border-gray-400 outline-0 w-60" />
                                </div>
                            </div>
                        )}

                        {/* PREFERENCES */}
                        {activeTab === 'preferences' && (
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h2 className="text-lg font-semibold mb-4">
                                    Preferences
                                </h2>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">
                                        Email Notifications
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => setNotifications(!notifications)}
                                        className={`w-12 h-6 flex items-center rounded-full p-1 transition 
                      ${notifications ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition 
                        ${notifications ? 'translate-x-6' : ''}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* SAVE BUTTON */}
                        {/* <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition"
                            >
                                Save Changes
                            </button>
                        </div> */}

                    </form>
                </div>
            </div>

            {/* Sidebar - desktop */}
            <div className="w-64 bg-white border-l border-gray-200 p-6 h-[87vh] hidden md:block">
                <h2 className="text-xl font-bold mb-6">Settings</h2>

                <nav className="space-y-2">
                    {['profile', 'security', 'preferences'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-2 rounded-lg capitalize transition 
                ${activeTab === tab
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* App Bar - mobile */}
            <div className="bg-white p-4 py-3 fixed md:hidden bottom-10 shadow-lg rounded-full left-1/2 -translate-x-1/2 w-2/3 min-w-fit">

                <nav className="flex align-middle gap-4">
                    {['profile', 'security', 'preferences'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-center self-center px-4 py-2 rounded-full capitalize transition 
                ${activeTab === tab
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Settings;