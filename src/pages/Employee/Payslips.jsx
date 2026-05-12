import { Download, Plus, SquareArrowRightExit, SquareChartGantt } from 'lucide-react';
import React from 'react'
import Button from '../../components/utils/Button';

const dummyData = {
  basic: 50000,
  hra: 23000,
  convinience: 500,
  hra: 23000,
  condvinience: 500,
  hra: 23000,
  conavinience: 500,
  'special allowance': 2000
};

const dummyTax = {
  'Income Tax': 50000,
  'Provident Fund': 25000
};

const Payslips = () => {
  return (
    <div className='flex grid-cols-12 h-full'>
      {/* content  */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* header */}
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payslips</h1>
            <p className="text-gray-600 text-sm mt-1">{new Date().toLocaleDateString('en-IN', { month: 'long' })}, {new Date().getFullYear()}</p>
          </div>
          <div className='flex gap-4 self-center'>
            <Button icon={Download} iconRight />
            <select name="months" id="months" className='min-w-32 bg-white px-2 rounded-sm outline-none border border-gray-200'>
              <option value="april">April 2026</option>
              <option value="may">May 2026</option>
              <option value="june">June 2026</option>
            </select>
          </div>
        </div>

        {/* main content  */}
        <div className='grid grid-cols-12 gap-4'>

          {/* earnings */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 col-span-4 flex flex-col">
            <div className="p-2 ps-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Earnings</h2>
            </div>

            <div className='text-sm text-gray-500 font-medium py-2 bg-gray-50 flex justify-end px-4'>
              Amount (₹)
            </div>

            <div className="flex-1 divide-y divide-gray-200">
              {Object.entries(dummyData).map(([key, value]) => (
                <div key={key} className='flex justify-between px-4 py-2'>
                  <div className="text-gray-600 capitalize">{key}</div>
                  <div className="text-gray-800 font-medium">{value}</div>
                </div>
              ))}
            </div>

            <div className='bg-green-50 flex justify-between px-4 py-3 font-semibold text-green-700'>
              <div>Total</div>
              <div>₹ 75,500</div>
            </div>
          </div>


          {/* deductions */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 col-span-4 flex flex-col">
            <div className="p-2 ps-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Deductions</h2>
            </div>

            <div className='text-sm text-gray-500 font-medium py-2 bg-gray-50 flex justify-end px-4'>
              Amount (₹)
            </div>

            <div className="flex-1 divide-y divide-gray-200">
              {Object.entries(dummyTax).map(([key, value]) => (
                <div key={key} className='flex justify-between px-4 py-2'>
                  <div className="text-gray-600 capitalize">{key}</div>
                  <div className="text-red-600 font-medium">- {value}</div>
                </div>
              ))}
            </div>

            <div className='bg-red-50 flex justify-between px-4 py-3 font-semibold text-red-700'>
              <div>Total</div>
              <div>₹ 12,000</div>
            </div>
          </div>


          {/* summary */}
          <div className=" col-span-4 flex flex-col">

            {/* employee details */}
            <div className='bg-white rounded-md shadow-sm border border-gray-200'>
              <div className="p-2 ps-4 border-b border-gray-200 ">
                <h2 className="text-lg font-semibold text-gray-900">Employee Details</h2>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-800">Rahul Sharma</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Employee ID</span>
                  <span className="font-medium text-gray-800">EMP1024</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Department</span>
                  <span className="font-medium text-gray-800">Finance</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Pay Period</span>
                  <span className="font-medium text-gray-800">May 2026</span>
                </div>
              </div>
            </div>

            {/* net pay */}
            <div className="border-t p-4 mt-4 rounded-md shadow-sm border border-gray-200 bg-white">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Total Earnings</span>
                <span className="font-medium text-gray-800">₹ 75,500</span>
              </div>

              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Total Deductions</span>
                <span className="font-medium text-red-600">₹ 12,000</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-green-700">
                <span>Net Pay</span>
                <span>₹ 63,500</span>
              </div>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default Payslips;