import { useState, useMemo } from 'react';
import { User, Department } from '@/types/user';

type FilterOptions = {
  departments: Department[] | null;
  ratings: number[] | null;
}

export function useSearch(users: User[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    departments: null,
    ratings: null
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Filter by search term
      const matchesSearch = !searchTerm || 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Filter by department
      const matchesDepartment = !filters.departments?.length || 
        (filters.departments && filters.departments.includes(user.department));
      
      if (!matchesDepartment) return false;
      
      // Filter by performance rating
      const matchesRating = !filters.ratings?.length || 
        (filters.ratings && filters.ratings.includes(user.performanceRating));
      
      return matchesRating;
    });
  }, [users, searchTerm, filters.departments, filters.ratings]);

  const updateDepartmentFilters = (departments: Department[] | null) => {
    setFilters(prev => ({
      ...prev,
      departments
    }));
  };

  const updateRatingFilters = (ratings: number[] | null) => {
    setFilters(prev => ({
      ...prev,
      ratings
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      departments: null,
      ratings: null
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateDepartmentFilters,
    updateRatingFilters,
    resetFilters,
    filteredUsers
  };
} 