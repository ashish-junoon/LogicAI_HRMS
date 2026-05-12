import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useState } from 'react';
import Button from '../../components/utils/Button';

const events = [
    { title: 'Leave', start: new Date() },
    { title: 'Comp Off', start: new Date() },
]

const attendanceData = [
    { date: "2026-04-01", status: "Present" },
    { date: "2026-04-02", status: "Absent" },
    { date: "2026-04-03", status: "Present" },
    { date: "2026-04-04", status: "Present" },
    { date: "2026-04-05", status: "Present" },
    { date: "2026-04-06", status: "Present" },
    { date: "2026-04-07", status: "Present" },
    { date: "2026-04-08", status: "Present" },
    { date: "2026-04-09", status: "Present" },
    { date: "2026-04-10", status: "Absent" },
];

function handleEventClick(info) {
    console.log("Event: " + info.event.title);
}

function handleEvents(events) {
    console.log("All events:", events);
}

const Attendance = () => {
    const [editable, setEditable] = useState(false);
    return (
        <div className='p-8 bg-background'>
            {/* custom topbar  */}
            <div className='flex justify-between'>
                <div className="text-4xl py-5">Attendance</div>
                <Button
                    style={`${!editable ? 'bg-pink-600' : 'bg-gray-400'} self-center`}
                    onClick={() => setEditable(!editable)}
                >
                    Edit
                </Button>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin]}
                headerToolbar={{
                    left: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,list',
                    center: 'title',
                    right: 'today prev,next'
                }}
                initialView='dayGridMonth'
                // multiMonthMaxColumns={5}
                weekends={true} // show weekends
                eventContent={renderEventContent}
                editable={editable}
                selectable={editable}
                // reactive 
                events={events}
                select={(info) => {
                    console.log("Start:", info.startStr);
                    console.log("End:", info.endStr);
                }}
                dateClick={(info) => {
                    console.log(info)
                }}
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
    const dateStr = arg.date.toISOString().slice(0, 10);

    const record = attendanceData.find(d => d.date === dateStr);

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
                            ${record.status === "Present"
                            ? "bg-green-500"
                            : record.status === "Absent"
                                ? "bg-red-500"
                                : "bg-yellow-400"
                        }
                            text-white text-xs font-bold
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
    const dateStr = arg.date.toISOString().slice(0, 10);
    const record = attendanceData.find(d => d.date === dateStr);

    if (!record) return [];

    if (record.status === "Present") {
        return ["bg-green-100 h-36"];
    }

    if (record.status === "Absent") {
        return ["bg-red-100 h-36"];
    }

    if (record.status === "Leave") {
        return ["bg-yellow-100 h-36"];
    }

    return ["h-36"];
}

export default Attendance;