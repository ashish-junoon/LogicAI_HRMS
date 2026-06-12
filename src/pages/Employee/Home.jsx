import React, { useState } from 'react';
import {
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  Clock3,
  FileText,
  LogIn,
  LogOut,
} from 'lucide-react';
import {
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/utils/Button';
import KPI from '../../components/utils/KPI';

const Home = () => {
  const navigate = useNavigate();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState('--:--');

  const handleClockToggle = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockTime(timeString);
    setIsClockedIn(!isClockedIn);
  };

  const holidayItems = [
    { date: '15 Aug', day: 'Saturday', name: 'Independence Day' },
    { date: '28 Aug', day: 'Friday', name: 'Raksha Bandhan' },
  ];

  const kpiData = [
    { label: 'Today\'s Hours', value: '7.5', icon: 'time', color: '#ec4899', bgColor: '#fdf2f8' },
    { label: 'Weekly Attendance', value: '5/5', icon: 'checkmark-circle', color: '#10b981', bgColor: '#f0fdf4' },
    { label: 'Pending Requests', value: '2', icon: 'document-text', color: '#f59e0b', bgColor: '#fffbeb' },
    { label: 'Upcoming Leaves', value: '1', icon: 'calendar', color: '#2563eb', bgColor: '#eff6ff' },
  ];

  const iconMap = {
    time: Clock3,
    'checkmark-circle': CheckCircle2,
    'document-text': FileText,
    calendar: CalendarIcon,
  };

  const attendanceData = [
    { x: "Present", y: 12 },
    { x: "Absent", y: 4 },
    { x: "Leave", y: 2 },
  ];

  const COLORS = ["#86efac", "#fca5a5", "#fdba74"];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hello, Ravi</h1>
          <p className="text-gray-600 text-sm mt-1">Employee Dashboard</p>
        </div>
        <div className="rounded-lg px-4 py-2 shadow-sm">
          <p className="text-xl font-semibold text-gray-900">May 18, 2026</p>
        </div>
      </div>

      {/* Clock In/Out Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {isClockedIn ? 'Punch In' : 'Punch Out'}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {isClockedIn ? `Since ${clockTime}` : 'Ready to start work'}
            </p>
          </div>
          <Button
            onClick={handleClockToggle}
            style={`${isClockedIn ? 'bg-red-500' : '!bg-green-500'}`}
            icon={isClockedIn ? LogOut : LogIn}
          >
            {isClockedIn ? 'Punch Out' : 'Punch In'}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((item) => {
          const IconComponent = iconMap[item.icon];
          return (
            <KPI
              key={item.label}
              label={item.label}
              value={item.value}
              bgColor={item.bgColor}
              color={item.color}
              IconComponent={IconComponent}
            />
          );
        })}
      </div>

      {/* Team Performance and Holiday Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Team Performance</h2>
              <p className="text-sm text-gray-500 mt-1">Weekly trends for your team and attendance.</p>
            </div>
            <button className="text-sm font-medium text-pink-600 hover:text-pink-700">Details</button>
          </div>
          <div className="h-72 flex items-center justify-center rounded-xl bg-gray-50 border border-dashed border-gray-200">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Holiday Overview</h3>
              <p className="text-sm text-gray-500 mt-1">Upcoming holidays...</p>
            </div>
            <CalendarIcon className="text-blue-600" size={22} />
          </div>

          <div className="space-y-4">
            {holidayItems.map((holiday) => (
              <div
                key={holiday.date}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white border border-gray-200 px-3 py-2 text-center">
                    <p className="text-sm font-semibold text-gray-900">{holiday.date}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{holiday.day}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{holiday.name}</p>
                    <p className="text-xs text-gray-500">General holiday</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-700">Upcoming</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/holidays')}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            View More
            <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </div>

      {/* Attendance Info and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Attendance Info</h3>
              <p className="text-sm text-gray-500 mt-1">Your attendance summary for the current week.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center justify-center">
            <VictoryPie
              data={attendanceData}
              colorScale={COLORS}
              innerRadius={120}
              padAngle={5}
              height={300}
              width={300}
              cornerRadius={10}
              startAngle={-125}
              theme={VictoryTheme.material}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              labelComponent={<VictoryTooltip />}
              style={{ labels: { fontSize: 12, fill: '#374151' } }}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {attendanceData.map((item, index) => (
              <div key={item.x} className="bg-gray-50 rounded-lg p-3 text-center h-fit">
                <div className="h-3 w-3 mx-auto rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <p className="mt-1 text-sm font-semibold text-gray-900">{item.x}</p>
                <p className="text-xs text-gray-500">{item.y} days</p>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit w-fit">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500 mt-1">Latest actions from your profile and attendance.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <CheckCircle2 size={20} className="text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Clocked in at 9:00 AM</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <FileText size={20} className="text-yellow-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Leave request submitted</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <Clock3 size={20} className="text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Completed 8 hours</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;