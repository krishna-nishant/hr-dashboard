"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { User } from "@/types/user"
import { fetchUsers } from "@/services/api"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import TabNavigation from "@/components/employee/TabNavigation"
import OverviewTab from "@/components/employee/OverviewTab"
import ProjectsTab from "@/components/employee/ProjectsTab"
import FeedbackTab from "@/components/employee/FeedbackTab"
import { generateEmployeeDetails } from "@/utils/mockDataGenerator"

export default function EmployeePage() {
  const { id } = useParams()
  const [employee, setEmployee] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "feedback">("overview")
  const [employeeDetails, setEmployeeDetails] = useState<any>(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true)
        const users = await fetchUsers()
        const foundEmployee = users.find((user) => user.id.toString() === id)

        if (foundEmployee) {
          setEmployee(foundEmployee)
          // Generate mock data for the employee
          setEmployeeDetails(generateEmployeeDetails(foundEmployee))
        } else {
          setError("Employee not found")
        }
      } catch (err) {
        setError("Failed to load employee data")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEmployee()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-4 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="ml-6 flex-1">
                <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mb-2"></div>
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-4 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Details</h1>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-xl text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Employee not found"}</p>
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img
                src={employee.image || `/placeholder-avatar.png`}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 ring-2 ring-white dark:ring-gray-800"
              />
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {employee.firstName} {employee.lastName}
                </h2>
                <div className="flex items-center mt-1">
                  <span className="px-2.5 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full mr-2">
                    {employee.department}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full">
                    {employee.performanceRating}/5 Rating
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Employee ID: {employee.id}</p>
              </div>
            </div>
          </div>

          <TabNavigation
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as "overview" | "projects" | "feedback")}
          />

          <div className="p-6">
            {activeTab === "overview" && <OverviewTab employee={employee} details={employeeDetails} />}
            {activeTab === "projects" && <ProjectsTab projects={employeeDetails?.projects} />}
            {activeTab === "feedback" && <FeedbackTab feedback={employeeDetails?.feedback} />}
          </div>
        </div>
      </div>
    </div>
  )
}
