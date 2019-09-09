import axios from 'axios';
import { Enum } from '../constants';

const API_SERVER = 'http://192.168.100.18:8001';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 5000,
});

export const authorizeApi = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const me = () => instance.get('/evaluations/statistic');

const evaluationSummary = (type: Enum.EvaluationType) => instance.get(`/evaluations/${type}`);

const login = (username: string, password: string) => {
  return instance.post(`/users/login`, { username, password });
};

const createEvaluation = (data: {
  evaluationType: Enum.EvaluationType;
  influentFactor: string;
  score: number;
  labelTag: string;
  image?: string;
  impactType: Enum.ImpactType;
  description?: string;
}) => instance.post(`/evaluations`, data);

const createAction = (data: { action: string; reason?: string }) => instance.post('/actions', data);

const getActionsByType = (status: Enum.ActionStatus) => instance.get(`/actions/${status}`);

const deleteAction = (id: string) => instance.delete(`/actions/${id}`);

const archievedActions = (actions: string[]) => instance.post('/actions/archieve', { actions });

const deleteActions = (actions: string[]) => instance.post('/actions/list', { actions });

const editAction = (id: string, action: string) => instance.patch(`/actions/${id}`, { action });

const getReasons = () => instance.get('/actions/reasons');

export default {
  me,
  evaluationSummary,
  login,
  createEvaluation,
  createAction,
  getActionsByType,
  deleteAction,
  archievedActions,
  deleteActions,
  editAction,
  getReasons,
};
