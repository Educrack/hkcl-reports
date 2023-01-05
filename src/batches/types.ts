import {
  IBatchDocument,
  IBatchListParams,
  IBatchListResponse,
  // IStudentBatchSubjectList,
} from '@lipihipi/client-sdk/dist/batch.new';
import { IStudentProfile } from '@lipihipi/client-sdk/dist/student-profile';
import {
  IListParams,
  TGetResource,
  TListResource,
} from '@lipihipi/client-sdk/dist/types';
import {
  IEducatorDocument,
  IEducatorListResponse,
} from '@lipihipi/client-sdk/dist/educator';
import { IBundleListParams } from '@lipihipi/client-sdk/dist/test-bundle';
import { IUserBundleEnrollmentListResponse } from '@lipihipi/client-sdk/dist/test-bundle-enrollment';
import {
  IUserInterviewListParams,
  IUserInterviewListResponse,
} from '@lipihipi/client-sdk/dist/user-interview';
import { ICourseListResponse } from '@lipihipi/client-sdk/dist/course';

export interface IAllListProps {
  getBatches: any; //TListResource<IBatchListParams, IBatchListResponse>;
  getAssetUrl(data: string): string;
  getEducators: TListResource<IListParams, IEducatorListResponse>;
  title?: string;
  breadCrumbs?: any[];
  onViewBatchReport: (id: string) => void;
  getCourses: TListResource<IListParams, ICourseListResponse>;
}

export interface IBatchReportProps {
  getBatchById: TGetResource<IBatchDocument>;
  getBatchStudents: any;
  getBatchEducators: any;//TListResource<IBatchListParams, IBatchListResponse>;
  getAssetUrl(data: string): string;
  title?: string;
  breadCrumbs?: any[];
  _id?: string;
  onStudentClick: (id: string) => void;
  onEducatorClick: (id: string) => void;
}

export interface IStudentReportProps {
  getBatches: TListResource<IBatchListParams, IBatchDocument[]>;
  title?: string;
  breadCrumbs?: any[];
  getStudent?: TGetResource<IStudentProfile>;
  getAssetUrl(data: string): string;
  _id: string;
  getTests?: any; //TListResource<IBundleListParams, IUserBundleEnrollmentListResponse>;
  getInterviews?: TListResource<
    IUserInterviewListParams,
    IUserInterviewListResponse
  >;
  onBatchTestClick?: (id: string) => void;
  onTestBundleClick?: (id: string) => void;
  onInterviewClick?: (id: string) => void;
}

export interface IEducatorReportProps {
  _id?: string;
  getEducatorById: TGetResource<IEducatorDocument>;
  getTeacherBatchList: any;
  breadCrumbs?: any[];
}
