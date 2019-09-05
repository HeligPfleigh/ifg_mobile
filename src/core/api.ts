import axios from 'axios';
import { Enum } from '../constants';

const API_SERVER = 'http://192.168.100.10:8001';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 5000,
});

export const authorizeApi = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const me = () => instance.get('/evaluations/overall');

const getSummary = (type: Enum.EvaluationType) => {
  switch (type) {
    case Enum.EvaluationType.RELATIONSHIPS:
      return Promise.resolve({
        score: 1.8,
        affections: [
          {
            factors: ['Johny'],
            tags: Enum.Tags.FAMILY,
            score: 5,
          },
          {
            factors: ['Sam'],
            tags: Enum.Tags.LOVER,
            score: 3,
          },
          {
            factors: ['My neighbour'],
            tags: Enum.Tags.OTHER,
            score: 1,
          },
          {
            factors: ['Jenny'],
            tags: Enum.Tags.WORK,
            score: -1,
          },
          {
            factors: ['Boss'],
            tags: Enum.Tags.WORK,
            score: -3,
          },
        ],
      });
    default:
      return Promise.resolve({
        score: 4.5,
        affections: [
          {
            factors: ['Reading', 'Cooking', 'My sister'],
            tags: null,
            score: 5,
          },
          {
            factors: ['Take naps'],
            tags: null,
            score: 3,
          },
        ],
      });
  }
};

const login = (username: string, password: string) => {
  return instance.post(`/users/login`, { username, password });
};

export default {
  me,
  getSummary,
  login,
};
