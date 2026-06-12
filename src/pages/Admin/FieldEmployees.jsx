import React, { useEffect, useState } from 'react'
import Button from '../../components/utils/Button';
import { ChartLine, CircleArrowOutUpRight, ClipboardClock, Footprints, List, LucideMap, Map as MapIcon, MapPinCheckInside, Phone, Plus, RefreshCcw, ShieldCheck, UndoDot, UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import KPI from '../../components/utils/KPI';
import Chip from '../../components/utils/Chip';
import SearchInput from '../../components/utils/SearchInput';
import SelectInput from '../../components/fields/SelectInput';
import { fieldEmployees } from '../../content/dummyData';
import { APIProvider, Map, Marker, Polyline, useMap } from '@vis.gl/react-google-maps';

const kpiData = [
    { label: 'Total Field Employees', value: '2', icon: UsersIcon, color: '#ec4899', bgColor: '#fce7f3', },
    { label: 'Active Now', value: '15', unit: "", icon: CircleArrowOutUpRight, color: '#dc2626', bgColor: '#fee2e2', },
    { label: 'Visits Today', value: '06', unit: "", icon: MapPinCheckInside, color: '#0284c7', bgColor: '#e0f2fe', },
    { label: 'Avg. Distance Covered', value: '06', unit: "Km", icon: Footprints, color: '#0284c7', bgColor: '#e0f2fe', },
];

const employees = []

const FieldEmployees = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState('List');
    const [query, setQuery] = useState('');
    const [coordsData, setCoordsData] = useState([]);
    const [path, setPath] = useState([
        { lat: 28.593534, lng: 77.025797 },
        // { lat: 18.969700, lng: 72.819400 },
    ]);

    const handleRefresh = async () => {
        setIsLoading(true);
        await new Promise(res => setTimeout(() => res(), 1000)); // just wait for 2sec to mimic api
        setIsLoading(false);
    }

    // testing: fetching coordinates every 5 minutes
    useEffect(() => {
        let change = 0.001;
        let dir = -1;

        const id = setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPoint = {
                    lat: position.coords.latitude + (Math.random() / 500) + change * dir,
                    lng: position.coords.longitude + (Math.random() / 500) + change * dir,
                };

                setPath(prev => [...prev, newPoint]);

                change += 0.001;
                dir *= -1;
            });
        }, 1000 * 60 * 1); // every 5min

        return () => clearInterval(id);
    }, []);


    const getDistanceInMeters = (p1, p2) => {
        const R = 6371000;

        const toRad = d => (d * Math.PI) / 180;

        const dLat = toRad(p2.lat - p1.lat);
        const dLng = toRad(p2.lng - p1.lng);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(p1.lat)) *
            Math.cos(toRad(p2.lat)) *
            Math.sin(dLng / 2) ** 2;

        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const totalDistance = path.reduce((sum, point, i) => {
        if (i === 0) return sum;

        return sum + getDistanceInMeters(path[i - 1], point);
    }, 0);

    return (
        <div className="flex h-full bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Field Tracking
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Track field employees's distance, locations, etc.
                        </p>
                    </div>

                    <Button
                        icon={RefreshCcw}
                        iconRight
                        loading={isLoading}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="flex flex-wrap gap-6 mb-8">
                    {kpiData.map((item) => {
                        return (
                            <KPI
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                unit={item?.unit}
                                bgColor={item.bgColor}
                                color={item.color}
                                style={'h-fit min-w-56'}
                                IconComponent={item['icon']}
                            />
                        )
                    })}
                </div>

<div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            {/* <h2 className="text-xl font-semibold text-gray-900">All Employees</h2> */}
                            {/* <p className="text-sm text-gray-500">Monitor each payout status in the current payroll batch.</p> */}
                        </div>
                        <div className='flex gap-3'>
                            <SearchInput query={query} setQuery={setQuery} placeholder="Search employees" />
                            <SelectInput
                                
                                options={[
                                    { label: "Sales Agents", value: "Sales" },
                                    { label: "Survey Agents", value: "Survey" },
                                ]}
                            />
                        </div>
                    </div>
                <div className="flex gap-5">
                    
                    <div className="mb-10 flex-1">
                        
                        {tab === "Map" ? <div className='rounded-xl bg-white p-4 shadow-sm border border-slate-200 '>
                            {/* <GoogleMapUI /> */}
                            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                                <Map
                                    // style={{ width: '100vw', height: '100vh' }}
                                    className='w-full h-90'
                                    defaultCenter={{ lat: 28.593534, lng: 77.025797 }}
                                    // center={path[path.length - 1]}
                                    defaultZoom={17}
                                    gestureHandling='greedy'
                                    disableDefaultUI
                                >
                                    <Polyline
                                        path={path}
                                        // editable
                                        strokeColor={'#ff0000'}
                                        strokeWeight={4}
                                    />
                                    {/* <Marker position={{ lat: 28.593534, lng: 77.025797 }} /> */}
                                    {path.map((point, index) => (
                                        <Marker
                                            key={index}
                                            position={point}
                                            icon={{
                                                url:
                                                    "data:image/svg+xml;charset=UTF-8," +
                                                    encodeURIComponent(`
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                                                    <circle cx="6" cy="6" r="5" fill="#00d492"
                                                            stroke="#02895f" stroke-width="2"/>
                                                    </svg>
                                                `),
                                            }}
                                        />
                                    ))}
                                </Map>
                            </APIProvider>
                            <div className='mt-2'><span className='font-semibold'>Total Distance: </span> {(totalDistance / 1000).toFixed(2) + " km"}</div>
                        </div> : <ListUI setTab={setTab} />}
                    </div>
                    <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 mb-10 w-64 h-fit sticky top-0">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">View Mode</h2>
                                <div className="mt-2 space-x-3">
                                    <button
                                        className={`rounded-lg border border-slate-200 px-3 w-fit py-2 transition hover:border-pink-500 ${tab === "Map" && "text-pink-600"}`}
                                        onClick={() => setTab("Map")}
                                    >
                                        <MapIcon />
                                    </button>
                                    <button
                                        className={`rounded-lg border border-slate-200 px-3 w-fit py-2 transition hover:border-pink-500 ${tab === "List" && "text-pink-600"}`}
                                        onClick={() => setTab("List")}
                                    >
                                        <List />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-gray-900">Status</h2>
                                <div className="mt-2 space-y-3">
                                    <button className="flex items-center justify-between w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700 transition hover:border-pink-500 hover:text-pink-600">
                                        <span>All</span>
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-400"></span>
                                    </button>
                                    <button className="flex items-center justify-between w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700 transition hover:border-pink-500 hover:text-pink-600">
                                        <span>Active</span>
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                                    </button>
                                    <button className="flex items-center justify-between w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700 transition hover:border-pink-500 hover:text-pink-600">
                                        <span>Idle</span>
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                                    </button>
                                    <button className="flex items-center justify-between w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-gray-700 transition hover:border-pink-500 hover:text-pink-600">
                                        <span>Offline</span>
                                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function GoogleMapUI() {
    return (
        <div className="w-full h-100 rounded-lg overflow-hidden shadow-sm">
            <iframe
                title="Google Map"
                className="w-full h-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d56034.65895291345!2d77.024242!3d28.624781!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1780058021919!5m2!1sen!2sin"
            />
        </div>
    );
}

function ListUI({ setTab }) {

    const [query, setQuery] = useState('');

    return (
        <>
            {/* Field employee cards (use existing theme/style) */}
            <div className="space-y-6">

                {fieldEmployees.map(emp => (
                    <div key={emp.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                        <div className="flex items-start justify-between gap-6">

                            <div className="flex flex-col items-start">
                                <div className='flex gap-4'>
                                    <div className="h-12 w-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-semibold">{emp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900">{emp.name}</div>
                                        <div className="text-sm text-gray-500">{emp.role}</div>
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-x-10">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <div className="flex items-center gap-2 rounded-lg py-2">
                                            <div className="h-10 min-w-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                                                <MapPinCheckInside className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400">Current Location</div>
                                                <div className="text-sm font-medium text-gray-700">{emp.location}</div>
                                                <div className="text-xs text-gray-400">Last updated: {emp.updated}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 min-w-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                                                <ClipboardClock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500">Current Task</div>
                                                <div className="text-base font-semibold text-gray-900">Client Visit - TCS Mumbai Office</div>
                                                <div className="text-xs text-gray-400">Location: BKC, Mumbai</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: status and actions */}
                            <div className="flex flex-col items-end gap-3 w-48">
                                <Chip title={emp.status} />
                                <div className="text-end ">
                                    <Button icon={MapIcon} style='!mb-3 !rounded-xl !bg-white !text-black !border' onClick={() => setTab("Map")}>Track Live</Button>
                                    <Button icon={Phone} style='!ml-3 !rounded-xl !bg-white !text-black !border'>Call</Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                            <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-gray-700 flex items-center gap-1"><ChartLine className='inline-block' size={16} /> Distance: <span className="font-semibold">{emp.distance}</span></div>
                            <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-gray-700 flex items-center gap-1"><MapPinCheckInside className='inline-block' size={16} /> Visits Today: <span className="font-semibold">{emp.visits}</span></div>
                            <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-gray-700 flex items-center gap-1"><Footprints className='inline-block' size={16} /> Total Distance: <span className="font-semibold">{emp.total}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FieldEmployees;