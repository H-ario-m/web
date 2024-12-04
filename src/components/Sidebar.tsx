import React from 'react';
import { Home, Briefcase, ListTodo, Users, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home, current: true },
  { name: 'Projects', icon: Briefcase, current: false },
  { name: 'Tasks', icon: ListTodo, current: false },
  { name: 'Contributors', icon: Users, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={'group flex items-center px-2 py-2 text-sm font-medium rounded-md ' +
                    (item.current
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                  }
                >
                  <item.icon
                    className={'mr-3 h-5 w-5 ' +
                      (item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500')
                    }
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}