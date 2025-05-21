'use client';

import { useEffect, useState } from 'react';
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
  ChartOptions,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { User, Department } from '@/types/user';
import { fetchUsers } from '@/services/api';
import { useBookmarks } from '@/store/useBookmarks';

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarkedIds } = useBookmarks();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error loading users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Calculate department-wise average ratings
  const departmentRatings = users.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = { sum: 0, count: 0 };
    }
    acc[user.department].sum += user.performanceRating;
    acc[user.department].count += 1;
    return acc;
  }, {} as Record<Department, { sum: number; count: number }>);

  const departments = Object.keys(departmentRatings) as Department[];
  const averageRatings = departments.map(
    (dept) => departmentRatings[dept].sum / departmentRatings[dept].count || 0
  );

  // Department-wise ratings chart config
  const departmentChartData = {
    labels: departments,
    datasets: [
      {
        label: 'Average Performance Rating',
        data: averageRatings,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const departmentChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Department-wise Average Performance Ratings',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Mock data for bookmark trends over the last 6 months
  const monthLabels = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return date.toLocaleString('default', { month: 'short' });
  });

  // Generate mock bookmark trend data with a general upward trend
  const mockBookmarkTrends = [4, 6, 8, 7, 9, bookmarkedIds.length];

  const bookmarkChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Bookmarked Employees',
        data: mockBookmarkTrends,
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.3,
      },
    ],
  };

  const bookmarkChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bookmark Trends (Last 6 Months)',
      },
    },
    scales: {
      y: {
        min: 0,
        suggestedMax: Math.max(...mockBookmarkTrends) + 2,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            HR Analytics
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-80 animate-pulse">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          HR Analytics
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department-wise Average Ratings Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
            <div className="h-80">
              <Bar data={departmentChartData} options={departmentChartOptions} />
            </div>
          </div>
          
          {/* Bookmark Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
            <div className="h-80">
              <Line data={bookmarkChartData} options={bookmarkChartOptions} />
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Analytics Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 dark:text-blue-300">Top Performing Department</h3>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                {departments.length > 0 ? 
                  departments[averageRatings.indexOf(Math.max(...averageRatings))] : 
                  'Loading...'}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Avg. Rating: {departments.length > 0 ? 
                  Math.max(...averageRatings).toFixed(1) : 
                  'N/A'}
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-amber-700 dark:text-amber-300">Current Bookmarks</h3>
              <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 mt-2">
                {bookmarkedIds.length}
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                {bookmarkedIds.length > mockBookmarkTrends[4] ? 
                  '↑ Increasing trend' : 
                  '↓ Decreasing trend'}
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="font-medium text-green-700 dark:text-green-300">Total Employees</h3>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200 mt-2">
                {users.length}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Across {departments.length} departments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 