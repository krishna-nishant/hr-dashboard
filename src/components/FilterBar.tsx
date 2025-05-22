"use client"

import { useState } from "react"
import type { Department } from "@/types/user"
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline"
import MultiSelect from "./MultiSelect"

interface FilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedDepartments: Department[] | null
  onDepartmentChange: (departments: Department[] | null) => void
  selectedRatings: number[] | null
  onRatingChange: (ratings: number[] | null) => void
  onReset: () => void
  totalCount: number
  filteredCount: number
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedDepartments,
  onDepartmentChange,
  selectedRatings,
  onRatingChange,
  onReset,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const departmentOptions = [
    { value: "HR", label: "Human Resources" },
    { value: "Tech", label: "Technology" },
    { value: "Finance", label: "Finance" },
  ]

  const ratingOptions = [
    { value: 1, label: "1 Star" },
    { value: 2, label: "2 Stars" },
    { value: 3, label: "3 Stars" },
    { value: 4, label: "4 Stars" },
    { value: 5, label: "5 Stars" },
  ]

  const isFiltered = !!searchTerm || !!selectedDepartments || !!selectedRatings

  // Type-safe handlers for MultiSelect
  const handleDepartmentChange = (values: (string | number)[] | null) => {
    const departments = values as Department[] | null
    onDepartmentChange(departments)
  }

  const handleRatingChange = (values: (string | number)[] | null) => {
    const ratings = values as number[] | null
    onRatingChange(ratings)
  }

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name, email or department..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-20 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="p-1 mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 mr-2 rounded-lg transition-all duration-200 ${
              showFilters
                ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {isFiltered ? <FunnelIcon className="h-5 w-5" /> : <AdjustmentsHorizontalIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Filter section */}
      {showFilters && (
        <div className="mt-5 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <MultiSelect
                options={departmentOptions}
                selectedValues={selectedDepartments as (string | number)[] | null}
                onChange={handleDepartmentChange}
                placeholder="Select departments"
                label="Department"
              />
            </div>
            <div className="flex-1">
              <MultiSelect
                options={ratingOptions}
                selectedValues={selectedRatings as (string | number)[] | null}
                onChange={handleRatingChange}
                placeholder="Select ratings"
                label="Performance Rating"
              />
            </div>
          </div>
          {isFiltered && (
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium text-indigo-600 dark:text-indigo-400">{filteredCount}</span> of{" "}
                <span className="font-medium">{totalCount}</span> employees
              </div>
              <button
                onClick={onReset}
                className="px-3 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
