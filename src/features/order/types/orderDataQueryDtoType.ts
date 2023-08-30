import { OrderDataSortByEnum } from './orderDataSortBy.enum';

export type OrderDataQueryDtoType = {
  date: Date;
  motorcadeName: number;
  tab: number;
  filter?: string;
  sortBy?: OrderDataSortByEnum;
};
