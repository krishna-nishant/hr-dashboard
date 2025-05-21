import { UserIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: UserIcon
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: DocumentTextIcon
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: ChatBubbleLeftRightIcon
    }
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap
                ${isActive 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-5 h-5 mr-2 ${isActive ? 'text-blue-500 dark:text-blue-400' : ''}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
} 