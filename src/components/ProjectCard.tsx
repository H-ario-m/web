import React from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card group">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-100">{project.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            project.status === 'active' ? 'bg-green-900/50 text-green-400 border border-green-700' :
            project.status === 'completed' ? 'bg-blue-900/50 text-blue-400 border border-blue-700' :
            'bg-gray-800 text-gray-400 border border-gray-700'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{project.tasks.length} tasks</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="btn-primary">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}