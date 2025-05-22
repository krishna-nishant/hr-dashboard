"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface Option {
  value: string | number
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selectedValues: (string | number)[] | null
  onChange: (values: (string | number)[] | null) => void
  placeholder: string
  label?: string
}

export default function MultiSelect({ options, selectedValues, onChange, placeholder, label }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleOption = (value: string | number) => {
    if (!selectedValues) {
      onChange([value])
      return
    }

    if (selectedValues.includes(value)) {
      const newValues = selectedValues.filter((v) => v !== value)
      onChange(newValues.length ? newValues : null)
    } else {
      onChange([...selectedValues, value])
    }
  }

  const clearAll = () => {
    onChange(null)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>}

      <button
        type="button"
        className="flex items-center justify-between w-full px-3.5 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 dark:text-gray-300 truncate">
          {selectedValues && selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
        </span>
        <div className="flex items-center">
          {selectedValues && selectedValues.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                clearAll()
              }}
              className="mr-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          <ChevronDownIcon
            className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md cursor-pointer transition-colors"
                onClick={() => toggleOption(option.value)}
              >
                <div
                  className={`h-4 w-4 rounded border flex items-center justify-center ${
                    selectedValues?.includes(option.value)
                      ? "bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selectedValues?.includes(option.value) && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <label className="ml-2.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{option.label}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
