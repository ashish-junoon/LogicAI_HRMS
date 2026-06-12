import { Search } from 'lucide-react';
import React from 'react'

function SearchInput({ query, setQuery, placeholder = 'Search...' }) {

    return (
        <div className="relative">
            <input
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none"
            />
            <Search className="absolute right-3 top-1/4 text-gray-400" size={16} />
        </div>
    )
}

export default SearchInput;