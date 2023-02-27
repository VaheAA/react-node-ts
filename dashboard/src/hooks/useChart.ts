import { IMessage } from '../types/report';


type FilterType = {
  status: string;
  category: string;
};



export const useChart = (rows: IMessage[], filterType: keyof FilterType) => {

  let labelSet = new Set();
  rows?.map(row => {
    labelSet.add(row[filterType]);
  });

  const dataCount = rows?.reduce((acc: any, obj: any) => {
    acc[obj.filterType] = (acc[obj.filterType] || 0) + 1;
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

