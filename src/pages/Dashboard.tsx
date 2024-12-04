import React, { useState } from 'react';
import { PlusCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import TaskList from '../components/TaskList';
import ProjectModal from '../components/ProjectModal';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { projects, userProjects, matchedProjects, setCurrentProject } = useProjects();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'my-projects' | 'matched'>('all');

  const displayProjects = activeTab === 'all' 
    ? projects 
    : activeTab === 'my-projects'
    ? userProjects
    : matchedProjects;

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          {user?.role === 'client' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Project
            </button>
          )}
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Active Projects', value: projects.length, icon: TrendingUp, color: 'bg-indigo-500' },
            { name: 'My Projects', value: userProjects.length, icon: PlusCircle, color: 'bg-green-500' },
            { name: 'Contributors', value: '38', icon: Users, color: 'bg-yellow-500' },
            { name: 'Total Earnings', value: '$4,200', icon: DollarSign, color: 'bg-pink-500' },
          ].map((stat) => (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 text-white p-1 rounded ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">{stat.name}</dt>
                    <dd className="text-lg font-semibold text-white">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveTab('my-projects')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'my-projects'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              My Projects
            </button>
            <button
              onClick={() => setActiveTab('matched')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'matched'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Matched Projects
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <div key={project.id} onClick={() => setCurrentProject(project)}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {activeTab === 'my-projects' && userProjects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-white mb-4">Recent Tasks</h2>
            <TaskList tasks={userProjects.flatMap(p => p.tasks).slice(0, 5)} />
          </div>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}