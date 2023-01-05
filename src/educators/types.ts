import {
  IListParams,
  TGetResource,
  TListResource,
} from '@lipihipi/client-sdk/dist/types';
import {
  IEducatorDocument,
  IEducatorListResponse,
} from '@lipihipi/client-sdk/dist/educator';
import { ICourseListResponse } from '@lipihipi/client-sdk/dist/course';
// import { IBatchListParams, IBatchListResponse } from '@lipihipi/client-sdk/dist/batch.new';

export interface IEducatorListProps {
  getEducators: TListResource<IListParams, IEducatorListResponse>;
  getCourses: TListResource<IListParams, ICourseListResponse>;
  getAssetUrl(data: string): string;
  title?: string;
  breadCrumbs?: any[];
  onReportClick: (id: string) => void;
}

export interface IEducatorReportProps {
  _id?: string;
  getAssetUrl(data: string): string;
  getEducatorById: TGetResource<IEducatorDocument>;
  getTeacherBatchList: any;//TListResource<IBatchListParams, IBatchListResponse>;
  breadCrumbs?: any[];
  onViewBatchReport: (id: string) => void;
}
