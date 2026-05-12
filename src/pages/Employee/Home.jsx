import React, { useState } from 'react';
import {
  CalendarIcon,
  CheckCircle2,
  Clock3,
  FileText,
  LogIn,
  LogOut,
} from 'lucide-react';
import {
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import Button from '../../components/utils/Button';

const Home = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState('--:--');

  const handleClockToggle = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockTime(timeString);
    setIsClockedIn(!isClockedIn);
  };

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hello, Ravi</h1>
        <p className="text-gray-600 text-sm mt-1">Employee Dashboard</p>
      </div>

      {/* Clock In/Out Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {isClockedIn ? 'Clocked In' : 'Clocked Out'}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {isClockedIn ? `Since ${clockTime}` : 'Ready to start work'}
            </p>
          </div>
          <Button
            onClick={handleClockToggle}
            style={`${isClockedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            icon={isClockedIn ? LogOut : LogIn}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-x-visible">
          {kpiData.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={item.label}
                className="bg-white rounded-xl shadow-sm p-0 border border-gray-200 min-w-50 lg:min-w-0"
              >
                <div className="flex justify-between items-start m-5">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{item.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{item.value}</p>
                  </div>
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center self-center"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <IconComponent size={28} color={item.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Team Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Team Performance</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>

        {/* Total Employee Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">
            Attendance Info.
          </h3>

          {/* Chart */}
          <div className="flex-1 p-4">
            <VictoryPie
              data={attendanceData}
              colorScale={COLORS}
              innerRadius={130}
              padAngle={5}
              height={300}
              width={300}
              cornerRadius={10}
              startAngle={-125}
              theme={VictoryTheme.clean}
              labels={({ datum }) => `${datum.x}: ${datum.y} days`}
              labelComponent={<VictoryTooltip />}
              style={{
                labels: {
                  fontSize: 12,
                  fill: "#374151",
                },
              }}
            />
          </div>

          {/* Legend / Summary */}
          <div className="flex gap-3 justify-center">
            {attendanceData.map((item, index) => (
              <div
                key={item.x}
                className="bg-white rounded-lg px-1 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {item.x}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3 border-b border-gray-100">
              <CheckCircle2 size={20} className="text-green-500" />
              <p className="flex-1 text-gray-700 text-sm">Clocked in at 9:00 AM</p>
              <span className="text-gray-400 text-xs">Today</span>
            </div>
            <div className="flex items-center gap-4 py-3 border-b border-gray-100">
              <FileText size={20} className="text-yellow-500" />
              <p className="flex-1 text-gray-700 text-sm">Leave request submitted</p>
              <span className="text-gray-400 text-xs">Yesterday</span>
            </div>
            <div className="flex items-center gap-4 py-3">
              <Clock3 size={20} className="text-gray-500" />
              <p className="flex-1 text-gray-700 text-sm">Completed 8 hours</p>
              <span className="text-gray-400 text-xs">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;