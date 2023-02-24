import React from 'react';
import { IMessage } from '../types/report';


export const useChart = (rows: IMessage[]) => {

  let labelSet = new Set();
  rows?.map(row => {
    labelSet.add(row.category);
  });

  const dataCount = rows?.reduce((acc: any, obj: any) => {
    acc[obj.category] = (acc[obj.category] || 0) + 1;
    return acc;
  }, {}) || [];

  const data = {
    labels: Array.from(labelSet) || [],
    datasets: [
      {
        label: '# of messages',
        data: Object.values(dataCount) || [],
        backgroundColor: [
          '#e3ddd2',
          '#f04d4d',
          '#2ed3c5',
          '#88d2d9',
          '#01425e',
          '#008000',
        ],
        borderColor: [
          '#e3ddd2',
          '#f04d4d',
          '#2ed3c5',
          '#88d2d9',
          '#01425e',
          '#008000',
        ],
        borderWidth: 1,
      },
    ],
  };

  return {
    data
  };
};

