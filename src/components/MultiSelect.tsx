import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: (string | number)[] | null;
  onChange: (values: (string | number)[] | null) => void;
  placeholder: string;
  label?: string;
}

export default function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder,
  label
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (value: string | number) => {
    if (!selectedValues) {
      onChange([value]);
      return;
    }
    
    if (selectedValues.includes(value)) {
      const newValues = selectedValues.filter(v => v !== value);
      onChange(newValues.length ? newValues : null);
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const clearAll = () => {
    onChange(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 dark:text-gray-300">
          {selectedValues && selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder}
        </span>
        <div className="flex items-center">
          {selectedValues && selectedValues.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
              className="mr-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          <ChevronDownIcon className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                onClick={() => toggleOption(option.value)}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={selectedValues?.includes(option.value) || false}
                  onChange={() => {}}
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 