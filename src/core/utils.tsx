import React from 'react';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

import {
  StormImg,
  SunImg,
  MoonImg,
  FeelGoodLv0,
  FeelGoodLv1,
  FeelGoodLv2,
  FeelGoodLv3,
  FeelGoodLv4,
} from '../assets/images';
import api from './api';
import I18n from './i18n';
import { theme, Enum } from '../constants';

// Make directory
export const getWorkdir = async () => {
  // file system object
  const { fs } = RNFetchBlob;
  // workdir path
  const rootPath = `${fs.dirs.DocumentDir}/com.ifg-mobile/`;
  // create folder save media file if not exists
  if (!(await fs.exists(rootPath))) {
    // create new folder
    await fs.mkdir(rootPath);
    // ignore read media file in folder
    const ignoreMediaFile = `${rootPath}.nomedia`;
    await fs.createFile(ignoreMediaFile, '.nomedia', 'utf8');
  }
  // return path folder
  return rootPath;
};

export const getImageFormServerPath = async (imgServerPath: string): Promise<string> => {
  try {
    const { fs } = RNFetchBlob;
    const dirPath = await getWorkdir();
    // extract image name from path
    const filename = last(imgServerPath.split('/'));
    // load image from locally
    const imagePath = `${dirPath}${filename}`;
    if (!(await fs.exists(imagePath))) {
      // loda image from server
      const fetchImage = await api.cacheImage(imgServerPath);
      const temp = await fetchImage.path();
      // check file contain in local
      if (!isEmpty(temp)) {
        // auto save locally
        await RNFetchBlob.fs.cp(temp, imagePath);
      }
    }
    // file url with app run on Android platform
    if (Platform.OS === 'android') {
      return `file://${imagePath}`;
    }
    // normal path with ios platform
    return imagePath;
  } catch (err) {
    return '';
  }
};

export const showWeatherIcon = (score?: number, size: number = 60) => {
  if (score === undefined) return null;

  if (score < -2 && score >= -5) {
    return <StormImg width={size} height={size} />;
  }
  if (score > 2 && score <= 5) {
    return <SunImg width={size} height={size} />;
  }
  return <MoonImg width={size} height={size} />;
};

export const summaryDisplayProps = (type: Enum.EvaluationType) => {
  switch (type) {
    case Enum.EvaluationType.RELATIONSHIPS:
      return {
        title: I18n.t('summary.relationships'),
        gradients: theme.gradients.lightpink,
        iconGradients: theme.gradients.pink,
      };
    case Enum.EvaluationType.ACTIVITIES:
      return {
        title: I18n.t('summary.activities'),
        gradients: theme.gradients.lightblue,
        iconGradients: theme.gradients.blue,
      };
    case Enum.EvaluationType.INTAKES:
      return {
        title: I18n.t('summary.intakes'),
        gradients: theme.gradients.lightorange,
        iconGradients: theme.gradients.orange,
      };
    case Enum.EvaluationType.OTHER:
      return {
        title: I18n.t('summary.other'),
        gradients: theme.gradients.lightpurple,
        iconGradients: theme.gradients.purple,
      };
    case Enum.EvaluationType.OVERALL:
    default:
      return {
        title: I18n.t('summary.overall'),
        gradients: theme.gradients.lightindigo,
        iconGradients: theme.gradients.indigo,
      };
  }
};

export const summaryIcon = (score: number, size: number = 40) => {
  if (score < -3 && score >= -5) {
    return <FeelGoodLv0 width={size} height={size} />;
  }
  if (score < -1 && score >= -3) {
    return <FeelGoodLv1 width={size} height={size} />;
  }
  if (score < 1 && score >= -1) {
    return <FeelGoodLv2 width={size} height={size} />;
  }
  if (score < 3 && score >= 1) {
    return <FeelGoodLv3 width={size} height={size} />;
  }
  return <FeelGoodLv4 width={size} height={size} />;
};
