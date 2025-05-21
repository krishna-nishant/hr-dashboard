interface Project {
  id: number;
  name: string;
  role: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  startDate: string;
  endDate?: string;
  description: string;
  completion: number;
}

interface ProjectsTabProps {
  projects: Project[];
}

export default function ProjectsTab({ projects }: ProjectsTabProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No projects assigned to this employee yet.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Assigned Projects ({projects.length})
      </h3>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Role: {project.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {project.startDate} {project.endDate ? `- ${project.endDate}` : ''}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                {project.description}
              </p>
              
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
                  <span>Progress</span>
                  <span>{project.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${project.completion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 