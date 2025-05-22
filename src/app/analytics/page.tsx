"use client"

import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import type { User, Department } from "@/types/user"
import { fetchUsers } from "@/services/api"
import { useBookmarks } from "@/store/useBookmarks"
import { ChartBarIcon, BookmarkIcon, UserGroupIcon } from "@heroicons/react/24/outline"

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { bookmarkedIds } = useBookmarks()

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (err) {
        console.error("Error loading users:", err)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Calculate department-wise average ratings
  const departmentRatings = users.reduce(
    (acc, user) => {
      if (!acc[user.department]) {
        acc[user.department] = { sum: 0, count: 0 }
      }
      acc[user.department].sum += user.performanceRating
      acc[user.department].count += 1
      return acc
    },
    {} as Record<Department, { sum: number; count: number }>,
  )

  const departments = Object.keys(departmentRatings) as Department[]
  const averageRatings = departments.map((dept) => departmentRatings[dept].sum / departmentRatings[dept].count || 0)

  // Department-wise ratings chart config
  const departmentChartData = {
    labels: departments,
    datasets: [
      {
        label: "Average Performance Rating",
        data: averageRatings,
        backgroundColor: ["rgba(99, 102, 241, 0.7)", "rgba(244, 114, 182, 0.7)", "rgba(45, 212, 191, 0.7)"],
        borderColor: ["rgba(99, 102, 241, 1)", "rgba(244, 114, 182, 1)", "rgba(45, 212, 191, 1)"],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const departmentChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Department-wise Average Performance Ratings",
        font: {
          family: "Inter, sans-serif",
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        padding: 12,
        titleFont: {
          family: "Inter, sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        cornerRadius: 6,
        displayColors: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  }

  // Mock data for bookmark trends over the last 6 months
  const monthLabels = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    return date.toLocaleString("default", { month: "short" })
  })

  // Generate mock bookmark trend data with a general upward trend
  const mockBookmarkTrends = [4, 6, 8, 7, 9, bookmarkedIds.length]

  const bookmarkChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Bookmarked Employees",
        data: mockBookmarkTrends,
        fill: true,
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        borderColor: "rgba(245, 158, 11, 0.8)",
        tension: 0.4,
        pointBackgroundColor: "rgba(245, 158, 11, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const bookmarkChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Bookmark Trends (Last 6 Months)",
        font: {
          family: "Inter, sans-serif",
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        padding: 12,
        titleFont: {
          family: "Inter, sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "Inter, sans-serif",
          size: 13,
        },
        cornerRadius: 6,
        displayColors: false,
      },
    },
    scales: {
      y: {
        min: 0,
        suggestedMax: Math.max(...mockBookmarkTrends) + 2,
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm mr-4">
              <ChartBarIcon className="h-6 w-6 text-indigo-500" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
              HR Analytics Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-80 animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-6"></div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm mr-4">
            <ChartBarIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
            HR Analytics Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department-wise Average Ratings Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="h-80">
              <Bar data={departmentChartData} options={departmentChartOptions} />
            </div>
          </div>

          {/* Bookmark Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="h-80">
              <Line data={bookmarkChartData} options={bookmarkChartOptions} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-md mr-3">
              <ChartBarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </span>
            Analytics Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-800/50 p-2 rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="ml-3 font-medium text-indigo-700 dark:text-indigo-300">Top Performing Department</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
                {departments.length > 0
                  ? departments[averageRatings.indexOf(Math.max(...averageRatings))]
                  : "Loading..."}
              </p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                Avg. Rating: {departments.length > 0 ? Math.max(...averageRatings).toFixed(1) : "N/A"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-800/30">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-lg">
                  <BookmarkIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="ml-3 font-medium text-amber-700 dark:text-amber-300">Current Bookmarks</h3>
              </div>
              <p className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-2">{bookmarkedIds.length}</p>
              <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                {bookmarkedIds.length > mockBookmarkTrends[4] ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    Increasing trend
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    Decreasing trend
                  </>
                )}
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-800/50 p-2 rounded-lg">
                  <UserGroupIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="ml-3 font-medium text-emerald-700 dark:text-emerald-300">Total Employees</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">{users.length}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Across {departments.length} departments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
