import { DocumentTextIcon as DocumentIcon } from "@heroicons/react/24/outline"
import type { Project } from "@/types/employee"

interface ProjectsTabProps {
  projects: Project[] | undefined;
}

export default function ProjectsTab({ projects }: ProjectsTabProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          This employee hasn&apos;t been assigned to any projects yet.
        </p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "On Hold":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-md mr-2">
          <DocumentIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </span>
        Assigned Projects ({projects.length})
      </h3>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm"
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-lg">{project.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Role: {project.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {project.startDate} {project.endDate ? `- ${project.endDate}` : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-5">{project.description}</p>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{project.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${project.completion}%`,
                      backgroundColor:
                        project.completion >= 80
                          ? "#10b981" // green-500
                          : project.completion >= 40
                            ? "#3b82f6" // blue-500
                            : "#f59e0b", // amber-500
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}