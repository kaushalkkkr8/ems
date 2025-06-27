// src/context/AssignmentContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import api from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

export type Assignment = {
  engineerId: string;
  projectId: string;
  allocationPercentage: number;
  startDate?: string;
  endDate?: string;
  role?: string;
};

type AssignmentContextType = {
  assignments: Assignment[];
  createAssignment: (data: Assignment) => Promise<void>;
  getAssignments: () => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
};

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

// ----------- Provider ------------
export const AssignmentProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const navigate= useNavigate()

  const createAssignment = async (data: Assignment) => {
    try {
      const token = localStorage.getItem('token');
      if (!token){
        navigate("/")
        throw new Error('Authentication token missing');
      } 
        

      const res = await api.post('/assignments', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssignments((prev) => [...prev, res.data.assignment]); // assuming backend sends assignment
    } catch (err) {
      throw err;
    }
  };

  const getAssignments = async () => {
    try {
      const token = localStorage.getItem('token');
        if (!token){
        navigate("/")
        throw new Error('Authentication token missing');
      } 

      const res = await api.get('/assignments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log({res});
      

      setAssignments(res.data); // assuming backend returns array
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
    }
  };

  const deleteAssignment = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      throw new Error('Authentication token missing');
    }

    await api.delete(`/assignments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Optionally update local state
    setAssignments((prev) => prev.filter((a: any) => (a as any)._id !== id));
  } catch (err) {
    console.error('Failed to delete assignment:', err);
    throw err;
  }
};


  return (
    <AssignmentContext.Provider value={{ assignments, createAssignment, getAssignments,deleteAssignment }}>
      {children}
    </AssignmentContext.Provider>
  );
};

// ----------- Hook ------------
export const useAssignment = () => {
  const context = useContext(AssignmentContext);
  if (!context) throw new Error('useAssignment must be used within AssignmentProvider');
  return context;
};
