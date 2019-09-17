import axios from 'axios';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import RNFetchBlob from 'rn-fetch-blob';
import { Enum } from '../constants';

const API_SERVER = 'https://api.ifeelgood.mttjsc.com/';

const instance = axios.create({
  baseURL: API_SERVER,
  timeout: 5000,
});

export const authorizeApi = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const me = () => instance.get('/evaluations/statistic');

const evaluationSummary = (type: Enum.EvaluationType) => instance.get(`/evaluations/${type}`);

const login = (email: string, password: string) => {
  return instance.post(`/users/login`, { email, password });
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

const giveFeedback = (data: { subject: string; message: string }) => instance.post('/feedbacks', data);

const deleteAccount = () => instance.delete('/users/me');

const updateUserInfo = (data: {
  firstName?: string;
  lastName?: string;
  gender?: string;
  height?: number;
  weight?: number;
  avatar?: string;
  DOB?: string;
}) => instance.patch('/users/me/profile', data);

// PATCH: /users/me/password
interface IChangePassword {
  currentPwd: string;
  newPwd: string;
  confirmPwd: string;
}
const changePassword = (data: IChangePassword) => instance.patch('/users/me/password', data);

// PATCH: /users/me/change-email
interface IChangeEmail {
  password: string;
  email: string;
}
const changeEmail = (data: IChangeEmail) => instance.patch('/users/me/change-email', data);
const sendFirebaseToken = (data: { firebaseToken: string }) => instance.post('/firebases', data);

const editFirebaseSetting = (data: { language?: string; isReceiveNotification?: boolean }, firebaseToken: string) =>
  instance.patch(`/firebases/${firebaseToken}`, data);

const signup = (data: { email: string; username: string; password: string }) => instance.post('/users', data);

const forgotPwd = (data: { email: string }) => instance.patch('/users/me/forgotpwd', data);

export interface IPhoto {
  data?: string;
  fileName?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  isVertical?: boolean;
  latitude?: number;
  longitude?: number;
  origURL?: string;
  originalRotation?: number;
  path?: string;
  timestamp?: string;
  type?: string;
  uri?: string;
  didCancel?: any;
  error?: any;
}

// POST: /users/me/change-avatar
const changeAvatar = (source: IPhoto) => {
  // require params
  if (isEmpty(source)) {
    throw new Error('Missing parameters');
  }
  // initial form data
  const formData = new FormData();
  // append image data into fromdata
  formData.append('image', {
    name: 'avatar.jpg',
    uri: get(source, 'uri'),
    size: get(source, 'fileSize', 0),
    type: get(source, 'type', 'image/jpeg'),
  });

  return instance.patch('/users/me/change-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const cacheImage = (path: string, config?: object): Promise<any> => {
  try {
    const {
      baseURL,
      headers: { common },
    } = instance.defaults;
    return RNFetchBlob.config({
      fileCache: true,
      appendExt: 'jpg',
      ...config,
    }).fetch('GET', `${baseURL}${path}`, {
      Authorization: common.Authorization,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

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
  giveFeedback,
  deleteAccount,
  updateUserInfo,
  changePassword,
  changeEmail,
  sendFirebaseToken,
  editFirebaseSetting,
  signup,
  forgotPwd,
  changeAvatar,
  cacheImage,
};
