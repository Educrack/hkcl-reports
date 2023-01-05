import { ICourseListResponse } from '@lipihipi/client-sdk/dist/course';
// import { IQuestionSetListParams } from '@lipihipi/client-sdk/dist/question-set';
import { IListParams, TListResource } from '@lipihipi/client-sdk/dist/types';
// import { IUserTestEnrollmentListResponse } from '@lipihipi/client-sdk/dist/user-test-enrollment';

interface ITestReportProps {
  breadCrumbs?: any[];
  testId?: string;
  getUserTestEnrollment: any;
  getAssetUrl(data: string): string;
  getCourses: TListResource<IListParams, ICourseListResponse>;
  onShowResult: (id: string) => void;
  onCheckAnswer: (id: string) => void;
  onDescriptiveResult: (id: string) => void;
  // getSessions?: TListResource<IListParams, ICourseListResponse>;
}

export default ITestReportProps;
