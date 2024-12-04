import React from 'react';
import { DollarSign, Clock, ArrowUpRight } from 'lucide-react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="card divide-y divide-gray-700/50">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 hover:bg-gray-700/30 transition-colors duration-200 group">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-200 flex items-center">
                {task.title}
                <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </h4>
              <p className="mt-1 text-sm text-gray-400 line-clamp-2">{task.description}</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                task.status === 'open' ? 'bg-green-900/50 text-green-400 border border-green-700' :
                task.status === 'in-progress' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' :
                'bg-blue-900/50 text-blue-400 border border-blue-700'
              }`}>
                {task.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-gray-400">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="mr-4">${task.budget}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}