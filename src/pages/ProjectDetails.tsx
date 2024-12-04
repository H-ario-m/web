import React from 'react';
import { ArrowLeft, Users, Calendar, Clock } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import ProjectChat from '../components/ProjectChat';

export default function ProjectDetails() {
  const { currentProject, setCurrentProject } = useProjects();

  if (!currentProject) return null;

  return (
    <div className="h-screen flex">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <button
            onClick={() => setCurrentProject(null)}
            className="flex items-center text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="card p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-white">{currentProject.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentProject.status === 'active'
                  ? 'bg-green-900/50 text-green-400 border border-green-700'
                  : 'bg-blue-900/50 text-blue-400 border border-blue-700'
              }`}>
                {currentProject.status}
              </span>
            </div>

            <div className="mt-4 flex items-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>5 Contributors</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(currentProject.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Active</span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
              <p className="text-gray-300">{currentProject.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-4">Tasks</h2>
              {currentProject.tasks.map((task) => (
                <div key={task.id} className="card p-4 mb-4">
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <p className="text-gray-400 mt-1">{task.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Budget: ${task.budget}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'open'
                        ? 'bg-green-900/50 text-green-400 border border-green-700'
                        : task.status === 'in-progress'
                        ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                        : 'bg-blue-900/50 text-blue-400 border border-blue-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-96 border-l border-gray-700 bg-gray-800">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Project Chat</h2>
          </div>
          <ProjectChat />
        </div>
      </div>
    </div>
  );
}