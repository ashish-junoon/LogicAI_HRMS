import React from 'react';
import {
  Briefcase,
  Cake,
  CalendarDays,
  Filter,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import Chip from './utils/Chip';

const departments = [
  'All Departments',
  'Engineering',
  'HR',
  'Design',
  'Marketing',
  'Finance',
];

const postTypes = [
  {
    label: 'Birthdays',
    icon: Cake,
  },
  {
    label: 'New Joinings',
    icon: Briefcase,
  },
  {
    label: 'Announcements',
    icon: Sparkles,
  },
  {
    label: 'Events',
    icon: CalendarDays,
  },
];

function FilterCard() {
  return (
    <div className="sticky top-6 mr-12 hidden h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm xl:block">

      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-8">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
            <Filter size={18} className="text-gray-700" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Feed Filters
            </h2>

            <p className="text-sm text-gray-500">
              Customize your feed
            </p>
          </div>
        </div>

        <button className="text-sm font-medium text-gray-500 transition hover:text-red-500">
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Search
        </label>

        <input
          type="text"
          placeholder="Search posts..."
          className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
        />
      </div>

      {/* Date Range */}
      {/* <div className="mb-3">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Date Range
        </label>

        <div className="grid grid-cols-2 gap-3">

          <input
            type="date"
            className="h-8 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />

          <input
            type="date"
            className="h-8 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
          />
        </div>
      </div> */}

      {/* Department */}
      <div className="mb-3">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Department
        </label>

        <select className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm outline-none transition focus:border-gray-400 focus:bg-white">

          {departments.map((dept) => (
            <option key={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Post Type */}
      <div className="mb-3">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Post Type
        </label>

        <select className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm outline-none transition focus:border-gray-400 focus:bg-white">

          {postTypes.map((postType) => (
            <option key={postType}>
             {postType.label}
            </option>
          ))}
        </select>
      </div>

      {/* Trending Tags */}
      <div className="mb-5">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Tags
        </label>

        <div className="flex flex-wrap gap-2">

          {[
            '#Birthday',
            '#Promotion',
          ].map((tag) => (
            <Chip title={tag} color='gray' />
          ))}
        </div>
      </div>

      {/* Footer */}
      <button className="flex h-8 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-semibold text-white transition hover:bg-black">
        <Users size={16} />
        Apply Filters
      </button>
    </div>
  );
}

export default FilterCard;