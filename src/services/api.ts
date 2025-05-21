import { User, DummyUser, Department } from '@/types/user';

// More realistic data with weighted distributions
const departments: Department[] = ['HR', 'Tech', 'Finance'];
const departmentWeights = {
  'HR': 0.3,      // 30% chance
  'Tech': 0.5,    // 50% chance
  'Finance': 0.2  // 20% chance
};

// Helper for weighted random selection
const getWeightedRandomDepartment = (): Department => {
  const rand = Math.random();
  let threshold = 0;
  
  for (const dept of departments) {
    threshold += departmentWeights[dept];
    if (rand < threshold) {
      return dept;
    }
  }
  
  return 'Tech'; // Fallback
};

// Performance ratings with a normal-ish distribution (more 3s and 4s than 1s and 5s)
const getRealisticPerformanceRating = (): number => {
  const distribution = [1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5];
  return distribution[Math.floor(Math.random() * distribution.length)];
};

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=20');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the data
    return data.users.map((user: DummyUser) => ({
      ...user,
      department: getWeightedRandomDepartment(),
      performanceRating: getRealisticPerformanceRating(),
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw to handle in the component
  }
}; 