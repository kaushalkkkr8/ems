
export type Project = {
  _id:string
  name: string;
  description: string;
  startDate: string; 
  endDate: string;
  requiredSkills?: string[]; 
  teamSize: number;
  status: 'planning' | 'active' | 'completed';
};
