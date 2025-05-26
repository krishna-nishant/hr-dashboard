import { User } from '@/types/user';
import type { Project, EmployeeDetails, Feedback } from '@/types/employee';

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random date within the past year
const getRandomDate = (monthsAgo = 12): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - getRandomInt(0, monthsAgo));
  date.setDate(getRandomInt(1, 28));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Generate random Indian addresses
const generateAddress = (): string => {
  const doorNumbers = ['#123', 'Flat 4B', '7/A', '203', '42', '101/D', 'Villa 9'];
  const streetNames = ['Nehru Road', 'Gandhi Street', 'MG Road', 'Patel Nagar', 'Krishna Lane', 'Juhu Beach Road', 'Connaught Place'];
  const areas = ['Andheri East', 'Bandra West', 'Indiranagar', 'Koramangala', 'Salt Lake', 'Adyar', 'Aundh'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];
  const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Uttar Pradesh', 'Gujarat'];
  const pinCodes = ['400001', '500082', '560001', '600001', '700001', '110001', '411001'];
  
  const doorNumber = getRandomElement(doorNumbers);
  const streetName = getRandomElement(streetNames);
  const area = getRandomElement(areas);
  const city = getRandomElement(cities);
  const state = getRandomElement(states);
  const pinCode = getRandomElement(pinCodes);
  
  return `${doorNumber}, ${streetName}, ${area}, ${city}, ${state} - ${pinCode}`;
};

// Generate random Indian phone numbers
const generatePhone = (): string => {
  // Generate a 10-digit Indian mobile number with common prefixes
  const prefixes = ['91', '70', '80', '90', '98', '99', '63', '73'];
  const prefix = getRandomElement(prefixes);
  const rest = Math.floor(10000000 + Math.random() * 90000000); // 8 digit number
  
  return `+91 ${prefix}${rest}`;
};

// Generate random bios
const generateBio = (user: User): string => {
  const intros = [
    `${user.firstName} is a dedicated professional with a strong background in ${user.department}.`,
    `As a valued member of our ${user.department} team, ${user.firstName} brings exceptional skills to the table.`,
    `${user.firstName} joined our company in ${getRandomDate(36)} after completing education from IIT/IIM and has been an integral part of the ${user.department} department.`
  ];
  
  const skills = {
    'HR': ['recruitment', 'employee relations', 'training', 'benefits administration', 'onboarding', 'conflict resolution'],
    'Tech': ['full-stack development', 'cloud architecture', 'data analysis', 'UI/UX design', 'cybersecurity', 'system administration'],
    'Finance': ['financial analysis', 'budgeting', 'forecasting', 'risk assessment', 'investment analysis', 'tax planning']
  };
  
  const departmentSkills = skills[user.department as keyof typeof skills] || skills['HR'];
  const selectedSkills = [
    getRandomElement(departmentSkills),
    getRandomElement(departmentSkills.filter(s => s !== departmentSkills[0])),
    getRandomElement(departmentSkills.filter(s => s !== departmentSkills[0] && s !== departmentSkills[1]))
  ];
  
  const middles = [
    `${user.firstName} specializes in ${selectedSkills[0]} and ${selectedSkills[1]}, and has demonstrated remarkable skill in ${selectedSkills[2]}.`,
    `With expertise in ${selectedSkills[0]}, ${selectedSkills[1]}, and ${selectedSkills[2]}, ${user.firstName} consistently delivers exceptional results.`,
    `${user.firstName}'s areas of expertise include ${selectedSkills[0]}, ${selectedSkills[1]}, and ${selectedSkills[2]}.`
  ];
  
  const conclusions = [
    `Outside of work, ${user.firstName} enjoys cricket, classical music, and spending time with family.`,
    `${user.firstName} holds a degree from Delhi University and is currently pursuing additional certifications in their field.`,
    `When not working, ${user.firstName} can be found volunteering in the community and practicing yoga.`
  ];
  
  return `${getRandomElement(intros)}\n\n${getRandomElement(middles)}\n\n${getRandomElement(conclusions)}`;
};

// Generate random performance history
const generatePerformanceHistory = (user: User) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [new Date().getFullYear() - 1, new Date().getFullYear()];
  
  // Generate 3-5 random performance reviews
  const count = getRandomInt(3, 5);
  const performanceHistory = [];
  
  // Track used months to avoid duplicates
  const usedMonthYears: string[] = [];
  
  for (let i = 0; i < count; i++) {
    let month, year, monthYear;
    
    // Ensure no duplicate month/year combinations
    do {
      month = getRandomElement(months);
      year = getRandomElement(years);
      monthYear = `${month} ${year}`;
    } while (usedMonthYears.includes(monthYear));
    
    usedMonthYears.push(monthYear);
    
    // Base rating around user's current rating with some variance
    const baseRating = user.performanceRating;
    let rating = baseRating + getRandomInt(-1, 1);
    rating = Math.max(1, Math.min(5, rating)); // Keep within 1-5 range
    
    // Generate comments based on rating
    let comment;
    if (rating >= 4) {
      comment = getRandomElement([
        `${user.firstName} consistently exceeds expectations. Excellent work on all assigned tasks.`,
        `Outstanding performance this period. Demonstrated leadership and initiative.`,
        `Excellent contributor who goes above and beyond requirements. A valuable team member.`
      ]);
    } else if (rating === 3) {
      comment = getRandomElement([
        `${user.firstName} meets all job requirements and occasionally exceeds expectations.`,
        `Solid performance. Completes assigned tasks on time with good quality.`,
        `Reliable team member who consistently delivers on commitments.`
      ]);
    } else {
      comment = getRandomElement([
        `${user.firstName} is improving but needs to focus on meeting deadlines consistently.`,
        `Performance meets some expectations but needs improvement in key areas.`,
        `Has potential but requires additional support and guidance.`
      ]);
    }
    
    performanceHistory.push({
      month: `${month} ${year}`,
      rating,
      comment
    });
  }
  
  // Sort by month and year (newest first)
  return performanceHistory.sort((a, b) => {
    const aDate = new Date(a.month);
    const bDate = new Date(b.month);
    return bDate.getTime() - aDate.getTime();
  });
};

// Generate random projects
const generateProjects = (user: User): Project[] => {
  const projectCount = getRandomInt(1, 4);
  const projects: Project[] = [];
  
  const projectNames = {
    'HR': ['Employee Onboarding Redesign', 'Corporate Diwali Event', 'Talent Acquisition Program', 'HR Policy Update', 'Performance Review System', 'Company Culture Initiative'],
    'Tech': ['E-commerce Platform', 'Payments App Development', 'Cloud Migration', 'Data Security Enhancement', 'Legacy System Upgrade', 'AI Implementation'],
    'Finance': ['FY23 Budget Planning', 'GST Compliance', 'Financial Reporting Automation', 'Investment Analysis', 'Tax Compliance Review', 'Accounting System Upgrade']
  };
  
  const roles = {
    'HR': ['HR Specialist', 'Project Lead', 'Recruiting Manager', 'Training Coordinator', 'HR Analyst'],
    'Tech': ['Developer', 'Project Manager', 'UX Designer', 'System Architect', 'Data Analyst', 'QA Specialist'],
    'Finance': ['Financial Analyst', 'Project Lead', 'Budget Coordinator', 'Accounting Specialist', 'Investment Advisor']
  };
  
  const descriptions = {
    'HR': [
      'Streamlining the employee onboarding process to improve new hire experience and reduce time-to-productivity.',
      'Reviewing and updating employee benefits to enhance satisfaction and retention.',
      'Implementing new recruitment strategies to attract top talent across departments.'
    ],
    'Tech': [
      'Developing a new responsive design with improved user experience and modern framework implementation.',
      'Creating a cross-platform mobile application to extend our digital reach and user engagement.',
      'Transitioning on-premise infrastructure to cloud-based solutions for improved scalability.'
    ],
    'Finance': [
      'Creating comprehensive budget plans and forecasts for the upcoming fiscal year.',
      'Identifying opportunities for cost reduction while maintaining operational efficiency.',
      'Implementing automated reporting solutions to streamline month-end processes.'
    ]
  };
  
  const statuses: Array<Project['status']> = ['In Progress', 'Completed', 'On Hold'];
  const departmentProjects = projectNames[user.department as keyof typeof projectNames] || projectNames['HR'];
  const departmentRoles = roles[user.department as keyof typeof roles] || roles['HR'];
  const departmentDescriptions = descriptions[user.department as keyof typeof descriptions] || descriptions['HR'];
  
  // Track used projects to avoid duplicates
  const usedProjects: string[] = [];
  
  for (let i = 0; i < projectCount; i++) {
    let projectName;
    
    // Ensure no duplicate projects
    do {
      projectName = getRandomElement(departmentProjects);
    } while (usedProjects.includes(projectName));
    
    usedProjects.push(projectName);
    
    const status = getRandomElement(statuses);
    const role = getRandomElement(departmentRoles);
    const description = getRandomElement(departmentDescriptions);
    
    const startDate = getRandomDate(12);
    let endDate = undefined;
    const completion = status === 'Completed' ? 100 : getRandomInt(10, 90);
    
    if (status === 'Completed') {
      // Generate an end date after the start date
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setMonth(startDateObj.getMonth() + getRandomInt(1, 3));
      endDate = endDateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    projects.push({
      id: i + 1,
      name: projectName,
      role,
      status,
      startDate,
      endDate,
      description,
      completion
    });
  }
  
  return projects;
};

// Generate random feedback
const generateFeedback = (): Feedback[] => {
  const feedbackCount = getRandomInt(0, 5);
  const feedback: Feedback[] = [];
  
  const names = ['Rahul Sharma', 'Priya Patel', 'Amit Singh', 'Neha Gupta', 'Vikram Mehta', 'Ananya Desai', 'Raj Malhotra'];
  const types: Array<Feedback['type']> = ['peer', 'manager', 'self'];
  
  const positiveComments = [
    'Consistently delivers high-quality work and meets deadlines.',
    'Excellent team player who supports colleagues and contributes positively to team culture.',
    'Shows great initiative and problem-solving skills.',
    'Communicates effectively and keeps stakeholders informed.',
    'Demonstrates strong leadership qualities and mentors junior team members.'
  ];
  
  const mixedComments = [
    'Generally meets expectations, but could improve on meeting deadlines.',
    'Strong technical skills, but communication could be more consistent.',
    'Works well independently, but could contribute more in team settings.',
    'Good work quality, but sometimes takes on too much without asking for help.',
    'Effective in current role, but needs to develop more strategic thinking for advancement.'
  ];
  
  const constructiveComments = [
    'Needs to improve time management and meeting deadlines.',
    'Should work on communication frequency and transparency.',
    'Could benefit from more active participation in team discussions.',
    'Technical skills need development through additional training.',
    'Would benefit from more structured approach to project management.'
  ];
  
  for (let i = 0; i < feedbackCount; i++) {
    const rating = getRandomInt(2, 5);
    const type = getRandomElement(types);
    
    let from;
    if (type === 'self') {
      from = 'Self Assessment';
    } else if (type === 'manager') {
      from = 'Team Manager';
    } else {
      from = getRandomElement(names);
    }
    
    let comments;
    if (rating >= 4) {
      comments = positiveComments;
    } else if (rating === 3) {
      comments = mixedComments;
    } else {
      comments = constructiveComments;
    }
    
    feedback.push({
      id: i + 1,
      from,
      date: getRandomDate(6),
      rating,
      message: getRandomElement(comments),
      type
    });
  }
  
  return feedback.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  });
};

// Main function to generate all employee details
export const generateEmployeeDetails = (user: User): EmployeeDetails => {
  return {
    address: generateAddress(),
    phone: generatePhone(),
    bio: generateBio(user),
    performanceHistory: generatePerformanceHistory(user),
    projects: generateProjects(user),
    feedback: generateFeedback()
  };
}; 