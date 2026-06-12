import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/utils/Button';
import { Ellipsis, LogOutIcon, Plus, Sparkle, SquareArrowOutUpRight, Timer, UndoDot, FileDown, Send, Eye } from 'lucide-react';
import Chip from '../../components/utils/Chip';
import KPI from '../../components/utils/KPI';
import html2pdf from 'html2pdf.js';

const kpiData = [
    { label: 'Present', value: '20', unit: 'days', icon: 'users', color: '#10b981', bgColor: '#d1fae5', },
    { label: 'Late', value: '3', unit: 'days', icon: 'time', color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'Unpaid Leave', value: '2', unit: 'days', icon: 'progress', color: '#f97316', bgColor: '#ffedd5', },
    { label: 'Overtime', value: '3', unit: 'days', icon: 'sparkles', color: '#f59e0b', bgColor: '#fef3c7', },
]

const serviceData = [
    { service: 'Shampoo', count: 56, revenue: '₹4,820.00', commission: '10 %' },
    { service: 'Hair color', count: 24, revenue: '₹1,210.00', commission: '15 %' },
    { service: 'Hair cut', count: 40, revenue: '₹5,230.00', commission: '20 %' },
    { service: 'Creambath', count: 12, revenue: '₹800.00', commission: '8 %' },
]

const earningsData = [
    { label: 'Base Salary', value: '₹8,000.00' },
    { label: 'Allowances', value: '₹4,510.00' },
    { label: 'Commissions', value: '₹8,490.00' },
]

const deductionsData = [
    { label: 'Late Penalty', value: '₹820.00' },
    { label: 'Unpaid Leave', value: '₹1,200.00' },
    { label: 'Occupational Health', value: '₹800.00' },
    { label: 'Employment Insurance', value: '₹200.00' },
    { label: 'PPh21 Tax', value: '₹1,999.00' },
]

const EmpPayroll = () => {
    const navigate = useNavigate();
    const route = useParams();

    const renderSalarySlipHtml = () => {
        const employeeName = 'Vetrick Wilson';
        const employeeId = route.id || 'EMP1260';
        const department = 'Product Engineering';
        const designation = 'Software Engineer';
        const month = 'May 2027';
        const payDate = '31 May 2027';
        const netSalary = 25000;
        const totalDeductions = 2000;
        const totalEarnings = 30000;

        return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Payroll Slip</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: Arial, Helvetica, sans-serif;
}

body{
    background:#d8d2ca;
    padding:40px;
}

.payroll-container{
    width:800px;
    margin:auto;
    background:#fff;
    border:1px solid #999;
    padding:35px 40px 60px;
    position:relative;
    overflow:hidden;
}

/* Decorative Corners */
.top-left{
    position:absolute;
    top:0;
    left:0;
    width:120px;
    height:120px;
    background:linear-gradient(135deg,#ae275f 40%,transparent 40%);
}

.bottom-right{
    position:absolute;
    bottom:0;
    right:0;
    width:120px;
    height:120px;
    background:linear-gradient(315deg,#ae275f 40%,transparent 40%);
}

.header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:20px;
}

.logo{
    width:180px;
}

.logo img{
    width:80%;
}

.company-info{
    text-align:end;
    flex:1;
}

.company-info h1{
    font-size:42px;
    font-weight:700;
    color:#3f3939;
    line-height:1;
}

.company-info h2{
    font-size:42px;
    color:#ae275f;
    font-weight:700;
    margin-top:8px;
}

.divider{
    border:none;
    border-top:3px solid #4d4747;
    margin:15px 0 25px;
}

.employee-details{
    width:100%;
    margin-bottom:35px;
}

.employee-details table{
    border-collapse:collapse;
}

.employee-details td{
    padding:2px 10px 2px 0;
    font-size:18px;
    color:#444;
}

.section-title{
    font-size:22px;
    font-weight:700;
    margin-bottom:10px;
    color:#333;
}

.pay-table{
    width:100%;
    border-collapse:collapse;
    margin-bottom:20px;
}

.pay-table thead th{
    background:#ae275f;
    color:#fff;
    padding:10px;
    text-align:center;
    font-size:18px;
}

.pay-table td{
    border-bottom:2px solid #ae275f;
    padding:12px 8px;
    font-size:16px;
}

.pay-table td:first-child{
    border-right:2px solid #ae275f;
}

.total-row td{
    font-weight:bold;
    text-align:center;
    font-size:18px;
}

.summary{
    margin-top:20px;
    display:flex;
    justify-content:space-between;
}

.summary-left{
    font-size:18px;
    color:#333;
}

.summary-left div{
    margin-bottom:5px;
}

.signature{
    text-align:left;
    margin-top:40px;
    font-size:18px;
    color:#444;
}

.sign-name{
    margin-top:100px;
    font-size:18px;
}
</style>
</head>
<body>

<div class="payroll-container">

    <div class="top-left"></div>
    <div class="bottom-right"></div>

    <div class="header">
        <div class="logo">
            <!-- Replace with actual logo -->
            <img src="./logo.jpeg" alt="Logo">
        </div>

        <div class="company-info">
            <h1>Junoon Capital Services</h1>
            <h2>PAYROLL SLIP</h2>
        </div>
    </div>

    <hr class="divider">

    <div class="employee-details">
        <table>
            <tr>
                <td>Month</td>
                <td>:</td>
                <td>May 2027</td>
            </tr>
            <tr>
                <td>Employee Name</td>
                <td>:</td>
                <td>Avery Davis</td>
            </tr>
            <tr>
                <td>Employee ID</td>
                <td>:</td>
                <td>IC0123</td>
            </tr>
            <tr>
                <td>Department</td>
                <td>:</td>
                <td>Marketing</td>
            </tr>
            <tr>
                <td>Designation</td>
                <td>:</td>
                <td>Digital Marketing Specialist</td>
            </tr>
            <tr>
                <td>Pay Date</td>
                <td>:</td>
                <td>31 May 2027</td>
            </tr>
        </table>
    </div>

    <div class="section-title">Earnings</div>

    <table class="pay-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount (Rs)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Basic Salary</td>
                <td style="text-align:center;">₹3,000.00</td>
            </tr>
            <tr>
                <td>Housing Allowance</td>
                <td style="text-align:center;">₹500.00</td>
            </tr>
            <tr>
                <td>Transportation</td>
                <td style="text-align:center;">₹200.00</td>
            </tr>
            <tr>
                <td>Performance Bonus</td>
                <td style="text-align:center;">₹300.00</td>
            </tr>
            <tr class="total-row">
                <td>Total Earnings</td>
                <td>₹4,000.00</td>
            </tr>
        </tbody>
    </table>

    <div class="section-title">Deductions</div>

    <table class="pay-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount (Rs)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tax (Federal + State)</td>
                <td style="text-align:center;">₹3,000.00</td>
            </tr>
            <tr>
                <td>Health Insurance</td>
                <td style="text-align:center;">₹500.00</td>
            </tr>
            <tr>
                <td>Pension Contribution</td>
                <td style="text-align:center;">₹200.00</td>
            </tr>
            <tr class="total-row">
                <td>Total Deductions</td>
                <td>₹4,000.00</td>
            </tr>
        </tbody>
    </table>

    <div class="summary">
        <div class="summary-left">
            <div><strong>Net Pay</strong> : ₹3,300.00</div>
            <div><strong>Bank Account</strong> : 123 4567 890</div>
            <div><strong>Payment Mode</strong> : NEFT</div>
        </div>

        <div class="signature">
            Authorized by:<br>
            Finance Manager – Junoon Capital

            <div class="sign-name">
                Rohit Gupta
            </div>
        </div>
    </div>

</div>

</body>
</html>`;
    };

    const handleViewSlip = () => {
        const html = renderSalarySlipHtml();
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(html);
            newWindow.document.close();
        }
    };

    const handleExportPdf = () => {
        const iframe = document.createElement("iframe");

        // iframe.style.position = "fixed";
        // iframe.style.right = "0";
        // iframe.style.bottom = "0";
        // iframe.style.width = "0";
        // iframe.style.height = "0";
        // iframe.style.border = "0";

        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;

        doc.open();
        doc.write(renderSalarySlipHtml());
        doc.close();

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();

            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        };
    };

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-base font-bold text-gray-700 ">
                            Employee: <span className='uppercase text-lg font-mono text-gray-500'> {route.id}</span>
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Employee and payroll details
                        </p>
                    </div>

                    <Button
                        icon={UndoDot}
                        onClick={() => { navigate(-1) }}
                    >
                        Back
                    </Button>
                </div>

                {/* main content  */}
                <div className='grid grid-cols-2 gap-6'>
                    {/* left side  */}
                    <div className='space-y-6'>
                        <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-200 w-fit mx-auto'>
                            <div className='flex justify-between items-start mb-6'>
                                <div className='flex gap-4'>
                                    <img src="https://i.pravatar.cc/50" alt="avatar" className='rounded-full w-12 h-12' />
                                    <div className='space-y-1'>
                                        <div className='font-semibold text-gray-900'>Vetrick Wilson</div>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-gray-500 text-sm uppercase'>#EMP1260</span>
                                            <Chip title="Software Engineer" />
                                        </div>
                                    </div>
                                </div>
                                <Button style='!bg-white !text-black border border-gray-300 !text-sm'>View Details</Button>
                            </div>

                            {/* KPI Cards */}
                            <div className="flex flex-wrap gap-3">
                                {kpiData.map((item) => {
                                    const IconComponent = {
                                        users: LogOutIcon,
                                        time: Timer,
                                        progress: Ellipsis,
                                        sparkles: Sparkle
                                    }[item.icon]
                                    return (
                                        <KPI
                                            key={item.label}
                                            label={item.label}
                                            value={item.value}
                                            unit={item?.unit}
                                            bgColor={item.bgColor}
                                            color={item.color}
                                            style={'h-24 w-fit !min-w-28 !shadow-none px-4'}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        {/* Attendance Details */}
                        <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-200 mx-5'>
                            <p className='text-medium mb-2 '>Thursday, 26 Feb</p>
                            <div className='grid grid-cols-4 gap-3 border-gray-100 border rounded-lg p-2 px-4'>
                                <div className=''>
                                    <p className='text-lg font-semibold text-gray-900'>08:00</p>
                                    <p className='text-xs text-gray-500'>Clock in</p>
                                </div>
                                <div className=''>
                                    <p className='text-lg font-semibold text-gray-900'>18:10</p>
                                    <p className='text-xs text-gray-500'>Clock out</p>
                                </div>
                                <div className=''>
                                    <p className='text-lg font-semibold text-gray-900'>10 mins</p>
                                    <p className='text-xs text-gray-500'>Overtime</p>
                                </div>
                                <div className=''>
                                    <p className='text-lg font-semibold text-gray-900'>9 mins</p>
                                    <p className='text-xs text-gray-500'>Late</p>
                                </div>
                            </div>
                        </div>

                        {/* just to convert in pdf  */}
                        <div id="hiddenDiv" className='display:hidden'>
                        </div>

                        {/* Service Breakdown
                        <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-200'>
                            <h3 className='font-semibold text-gray-900 mb-4'>Service Breakdown</h3>
                            <div className='overflow-hidden rounded-2xl border border-slate-200'>
                                <table className='w-full text-sm'>
                                    <thead className='bg-slate-50 border-b border-slate-200'>
                                        <tr>
                                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>Service</th>
                                            <th className='px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase'>Count</th>
                                            <th className='px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase'>Revenue</th>
                                            <th className='px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase'>Commission(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-slate-200'>
                                        {serviceData.map((item) => (
                                            <tr key={item.service} className='hover:bg-slate-50'>
                                                <td className='px-4 py-3 text-gray-900 font-medium'>{item.service}</td>
                                                <td className='px-4 py-3 text-center text-gray-700'>{item.count}</td>
                                                <td className='px-4 py-3 text-center text-gray-700'>{item.revenue}</td>
                                                <td className='px-4 py-3 text-center'>
                                                    <span className='text-yellow-600 font-medium'>{item.commission}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>

                    {/* right side - Payroll Slip */}
                    <div className='rounded-xl bg-white p-6 shadow-sm border border-slate-200 h-fit'>
                        <div className='flex justify-between items-start mb-6'>
                            <div>
                                <h3 className='font-semibold text-gray-900'>Payroll Slip</h3>
                                <p className='text-sm text-gray-500 flex items-center gap-0 mt-2'>
                                    Salary breakdown
                                </p>
                            </div>
                        </div>

                        {/* Earnings */}
                        <div className='mb-6 pb-6 border-b border-slate-200'>
                            <h4 className='font-semibold text-gray-900 mb-4'>Earnings</h4>
                            <div className='space-y-3'>
                                {earningsData.map((item) => (
                                    <div key={item.label} className='flex justify-between text-sm'>
                                        <span className='text-gray-600'>{item.label}</span>
                                        <span className='text-gray-900 font-medium'>{item.value}</span>
                                    </div>
                                ))}
                                <div className='flex justify-between text-sm font-semibold pt-3 border-t border-slate-200'>
                                    <span className='text-gray-900'>Total</span>
                                    <span className='text-gray-900'>₹15,930.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className='mb-6 pb-6 border-b border-slate-200 bg-rose-50 mx-1 px-6 py-4 rounded-lg'>
                            <h4 className='font-semibold text-gray-900 mb-4'>Deductions</h4>
                            <div className='space-y-3'>
                                {deductionsData.map((item) => (
                                    <div key={item.label} className='flex justify-between text-sm'>
                                        <span className='text-gray-600'>{item.label}</span>
                                        <span className='text-gray-900 font-medium'>{item.value}</span>
                                    </div>
                                ))}
                                <div className='flex justify-between text-sm font-semibold pt-3 border-t border-rose-200'>
                                    <span className='text-gray-900'>Total</span>
                                    <span className='text-gray-900'>- ₹4,959.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Total Salary */}
                        <div className='mb-6 pb-6 border-b border-slate-200'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-600 font-medium'>Total Salary</span>
                                <span className='text-xl font-bold text-gray-900'>₹10,299.00</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex gap-3 justify-end'>
                            <Button style='!bg-gray-900 text-white !text-sm' icon={FileDown}
                                onClick={handleExportPdf}
                            >
                                Print
                            </Button>
                            <Button icon={Eye} onClick={handleViewSlip}>
                                View
                            </Button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default EmpPayroll