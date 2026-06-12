import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useState } from 'react';
import Button from '../../components/utils/Button';
import Modal from '../../components/utils/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorMsg from '../../components/utils/ErrorMsg';
import TextInput from '../../components/fields/TextInput';
import SelectInput from '../../components/fields/SelectInput';

const events = [
    { title: 'Leave', start: new Date() },
    { title: 'Comp Off', start: new Date() },
]

const attendanceData = [
    { date: "2026-05-01", status: "Present" },
    { date: "2026-05-05", status: "Week Off" },
    { date: "2026-05-05", status: "Leave" },
    { date: "2026-05-06", status: "Holiday" },
    { date: "2026-05-07", status: "Half Day" },
    { date: "2026-05-10", status: "Absent" },
];

function handleEventClick(info) {
    console.log("Event: " + info.event.title);
}

function handleEvents(events) {
    console.log("All events:", events);
}

const Attendance = () => {
    const [editable, setEditable] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [rangeStart, setRangeStart] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 22);
    });

    const rangeEnd = new Date(
        rangeStart.getFullYear(),
        rangeStart.getMonth() + 1,
        22
    );


    function handleDateClick(info) {
        const dateStr = formatLocalDate(info.date);
        const attendanceRecord = attendanceData.find((record) => record.date === dateStr);
        const statusMessage = attendanceRecord ? attendanceRecord.status : 'No attendance record';

        // alert(`Date: ${dateStr}\nStatus: ${statusMessage}`);
        setIsModalOpen(true);
        regularizeFormik.setFieldValue('fromDate', dateStr);
        regularizeFormik.setFieldValue('toDate', dateStr);
    }

    const regularizeFormik = useFormik({
        initialValues: {
            leaveType: '',
            fromDate: '',
            toDate: '',
            reason: '',
            rm: '',
        },
        validationSchema: Yup.object({
            leaveType: Yup.string().required('leave type is required'),
            fromDate: Yup.string().required('from date is required'),
            toDate: Yup.string().required('to date is required'),
            reason: Yup.string().required('reason is required'),
            rm: Yup.string().required('select a reporting manager'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log(values)
            } catch (error) {
                console.log(error);
                toast.error(error?.message || "Something went wrong");
            }
        }
    });

    return (
        <>
            <div className='p-6 bg-background'>
                {/* custom topbar  */}
                <div className='flex justify-between mb-5'>
                    <div className="text-3xl font-bold text-gray-900">Calander</div>
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
                    headerToolbar={{
                        left: 'multiMonthYear today',
                        center: 'title',
                        right: 'prev,next'
                    }}
                    // initialView='dayGridMonth'
                    initialView="customView"

                    views={{
                        customView: {
                            type: "dayGrid",
                            // duration: { days: 8 },

                            visibleRange(currentDate) {
                                return {
                                    start: new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth() - 1,
                                        22
                                    ),

                                    end: new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth(),
                                        22
                                    )
                                }
                            }
                        }
                    }}
                    // multiMonthMaxColumns={5}
                    weekends={true} // show weekends
                    eventContent={renderEventContent}
                    // editable={editable}
                    // selectable={editable}
                    // reactive 
                    events={events}
                    select={(info) => {
                        console.log("Start:", info.startStr);
                        console.log("End:", info.endStr);
                    }}
                    dateClick={handleDateClick}
                    // selectMirror={true}
                    dayMaxEvents={1}
                    // loads once // not reactive // not recommended
                    // initialEvents={[
                    //     {
                    //         title: "event1",
                    //         date: "2026-04-03",
                    //         color: "green"
                    //     },
                    //     {
                    //         title: "event2",
                    //         date: "2026-04-04",
                    //         color: "red"
                    //     }
                    // ]}
                    eventClick={handleEventClick}
                    // updates the event array
                    eventsSet={handleEvents}

                    //cell content
                    dayCellContent={renderCellContent}

                    // cell ui
                    dayCellClassNames={renderCellUI}
                />
            </div>

            {/* modal  */}
            <Modal
                title={'Select an Action'}
                description={'Want to regularize?'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formId='regularizeForm'
            >
                <form id="regularizeForm" onSubmit={regularizeFormik.handleSubmit} >
                    <div className="space-y-4">
                        {/* Leave Type */}
                        <SelectInput
                            label="Leave Type"
                            {...regularizeFormik.getFieldProps('leaveType')}
                            options={[
                                { label: "Regularize", value: "regularize" }
                            ]}
                            error={regularizeFormik.touched.leaveType && regularizeFormik.errors.leaveType}
                        />

                        {/* Date Range */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-700 mb-1 block">
                                    From Date
                                </label>
                                <input
                                    type="date"
                                    {...regularizeFormik.getFieldProps('fromDate')}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                />
                                {regularizeFormik.touched.fromDate && regularizeFormik.errors.fromDate ? (
                                    <ErrorMsg error={regularizeFormik.errors.fromDate} />
                                ) : null}
                            </div>

                            <div>
                                <label className="text-xs text-gray-700 mb-1 block">
                                    To Date
                                </label>
                                <input
                                    type="date"
                                    {...regularizeFormik.getFieldProps('toDate')}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                />
                                {regularizeFormik.touched.toDate && regularizeFormik.errors.toDate ? (
                                    <ErrorMsg error={regularizeFormik.errors.toDate} />
                                ) : null}
                            </div>
                        </div>

                        {/* Half Day Option */}
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="halfday" />
                            <label htmlFor="halfday" className="text-sm text-gray-700">
                                Apply for Half Day
                            </label>
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="text-xs text-gray-700 mb-1 block">
                                Reason
                            </label>
                            <textarea
                                rows={3}
                                {...regularizeFormik.getFieldProps('reason')}
                                placeholder="Enter reason for leave..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                            />
                            {regularizeFormik.touched.reason && regularizeFormik.errors.reason ? (
                                <ErrorMsg error={regularizeFormik.errors.reason} />
                            ) : null}
                        </div>

                        <div>
                            <TextInput
                                label={"CC:"}
                                placeholder="Add , separated emails"
                            />
                        </div>

                        {/* Reporting Manager */}
                        <div>
                            <label className="text-xs text-gray-700 mb-1 block">
                                Reporting Manager
                            </label>
                            <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                {...regularizeFormik.getFieldProps('rm')}
                            >
                                <option>Jane Smith</option>
                            </select>
                            {regularizeFormik.touched.rm && regularizeFormik.errors.rm ? (
                                <ErrorMsg error={regularizeFormik.errors.rm} />
                            ) : null}
                        </div>
                    </div>
                </form>
            </Modal>

        </>
    )
}

function renderEventContent(eventInfo) {
    return (
        <>
            <div className='flex flex-col ps-5' >
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </div>
        </>
    )
}

//     arg.date           // Date object
// arg.dayNumberText  // "1", "2", etc.
// arg.isToday        // true/false
// arg.isPast
// arg.isFuture
function renderCellContent(arg) {
    const dateStr = formatLocalDate(arg.date);

    let record = attendanceData.find(d => d.date === dateStr);

    if (isSunday(arg.date) || is2ndSaturday(arg.date)) {
        record = { status: "Off Day" };
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-1">
            {/* Day number */}
            <div className="text-sm font-semibold text-gray-700 mb-1">
                {arg.dayNumberText}
            </div>

            {/* Attendance status indicator */}
            {record && (
                <div
                    className={`
                            px-1.5 py-0.5 flex items-center justify-center rounded-full
                            ${statusColor(record)} contrast-125
                            text-black text-xs font-semibold
                            shadow-sm
                            hover:scale-110 transition-transform duration-150
                            cursor-pointer
                            `}
                    title={record.status} // tooltip on hover
                >
                    {/* Optional: first letter for quick view */}
                    {/* {record.status.charAt(0)} */}
                    {record.status}
                </div>
            )}
        </div>
    );
}

function renderCellUI(arg) {
    const dateStr = formatLocalDate(arg.date);
    const record = attendanceData.find(d => d.date === dateStr);

    if (isSunday(arg.date) || is2ndSaturday(arg.date)) {
        return ["bg-gray-100 h-32"];
    }

    return [`${statusColor(record)} h-32`];

}

const isSunday = (date) => {
    return date.getDay() === 0;
}


const is2ndSaturday = (date) => {
    return date.getDay() === 6 && ((date.getDate() - 1) / 7) >= 1 && ((date.getDate() - 1) / 7) < 2;
}

const statusColor = (record) => {
    if (!record) return ["bg-white"];

    switch (record.status) {
        case "Present":
            return [`bg-green-100`];

        case "Absent":
            return [`bg-red-100`];

        case "Leave":
            return [`bg-yellow-100`];

        case "Late":
            return [`bg-gray-100`];

        case "Holiday":
            return [`bg-pink-100`];

        case "Week Off":
            return [`bg-pink-100`];

        case "Half Day":
            return [`bg-gray-100`];

        default:
            return ["bg-white"];
    }
}

const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export default Attendance;