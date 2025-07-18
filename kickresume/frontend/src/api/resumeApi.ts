import axios from 'axios'
import type { ResumeData } from '../types/resume';

export const createResume = async (data: ResumeData) => {
  const res = await axios.post('/resumes', data);
  return res.data;
};

export const getResumeById = async (id: string) => {
  const res = await axios.get(`/resumes/${id}`);
  return res.data;
};

export const updateResume = async (id: string, data: ResumeData) => {
  const res = await axios.put(`/resumes/${id}`, data);
  return res.data;
};

export const deleteResume = async (id: string) => {
  const res = await axios.delete(`/resumes/${id}`);
  return res.data;
};

export const getAllResumes = async () => {
  const res = await axios.get('/resumes');
  return res.data;
};
