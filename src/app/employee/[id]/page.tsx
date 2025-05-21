'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/types/user';
import { fetchUsers } from '@/services/api';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import TabNavigation from '@/components/employee/TabNavigation';
import OverviewTab from '@/components/employee/OverviewTab';
import ProjectsTab from '@/components/employee/ProjectsTab';
import FeedbackTab from '@/components/employee/FeedbackTab';
import { generateEmployeeDetails } from '@/utils/mockDataGenerator';

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');
  const [employeeDetails, setEmployeeDetails] = useState<any>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const users = await fetchUsers();
        const foundEmployee = users.find(user => user.id.toString() === id);
        
        if (foundEmployee) {
          setEmployee(foundEmployee);
          // Generate mock data for the employee
          setEmployeeDetails(generateEmployeeDetails(foundEmployee));
        } else {
          setError('Employee not found');
        }
      } catch (err) {
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-2">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="ml-6 flex-1">
                <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-2">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Details</h1>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl text-red-600 mb-2">Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error || 'Employee not found'}</p>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-4">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img 
                src={employee.image || `/placeholder-avatar.png`} 
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {employee.department} • {employee.performanceRating}/5 Rating
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                  Employee ID: {employee.id}
                </p>
              </div>
            </div>
          </div>

          <TabNavigation 
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as 'overview' | 'projects' | 'feedback')}
          />

          <div className="p-6">
            {activeTab === 'overview' && (
              <OverviewTab employee={employee} details={employeeDetails} />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab projects={employeeDetails?.projects} />
            )}
            {activeTab === 'feedback' && (
              <FeedbackTab feedback={employeeDetails?.feedback} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 