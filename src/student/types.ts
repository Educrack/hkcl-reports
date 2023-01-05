import {
  IListParams,
  TGetResource,
  TListResource,
} from '@lipihipi/client-sdk/dist/types';
import {
  IStudentListResponse,
  IStudentParam,
  IStudentProfile,
} from '@lipihipi/client-sdk/dist/student-profile';
import {
  IBatchDocument,
  IBatchListParams,
  IBatchListResponse,
} from '@lipihipi/client-sdk/dist/batch.new';
import { IBundleListParams } from '@lipihipi/client-sdk/dist/test-bundle';
import { IUserBundleEnrollmentListResponse } from '@lipihipi/client-sdk/dist/test-bundle-enrollment';
import {
  IUserInterviewListParams,
  IUserInterviewListResponse,
} from '@lipihipi/client-sdk/dist/user-interview';
import { ICourseListResponse } from '@lipihipi/client-sdk/dist/course';

export interface IStudentListProps {
  getStudents: TListResource<IStudentParam, IStudentListResponse>;
  getCourses: TListResource<IListParams, ICourseListResponse>;
  getAssetUrl(data: string): string;
  title?: string;
  breadCrumbs?: any[];
  onStudentReportClick: (id: string) => void;
}

export interface IStudentReportProps {
  getBatches: any; //TListResource<IBatchListParams, IBatchListResponse>;
  title?: string;
  breadCrumbs?: any[];
  getStudent?: TGetResource<IStudentProfile>;
  getAssetUrl(data: string): string;
  _id: string;
  getTests?: any;
  // TListResource<
  //   IBundleListParams,
  //   IUserBundleEnrollmentListResponse
  // >;
  getInterviews?: TListResource<
    IUserInterviewListParams,
    IUserInterviewListResponse
  >;
  getBatch: TGetResource<IBatchDocument>;
  getTestDetails: any;
  getEnrolledTest: any;
  onBatchTestClick?: (id: string) => void;
  onTestBundleClick?: (id: string) => void;
  onInterviewClick?: (id: string) => void;
}
