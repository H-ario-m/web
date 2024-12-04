import React, { createContext, useContext, useState } from 'react';
import { mockProjects as initialProjects } from '../mockData';
import type { Project, User } from '../types';

interface ProjectContextType {
  projects: Project[];
  userProjects: Project[];
  matchedProjects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  joinProject: (projectId: string) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState(initialProjects);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [matchedProjects, setMatchedProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      tasks: []
    };
    setProjects([newProject, ...projects]);
  };

  const joinProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project && !userProjects.find(p => p.id === projectId)) {
      setUserProjects([project, ...userProjects]);
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      userProjects,
      matchedProjects,
      addProject,
      joinProject,
      currentProject,
      setCurrentProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}