import React from 'react';
import { SubscriberReport } from '@lipihipi/ec-manage-student/dist/index';
import { IStudentReportProps } from './types';

const StudentDetail = ({
  _id,
  getBatches,
  getStudent,
  getAssetUrl,
  getTests,
  getInterviews,
  onBatchTestClick,
  onTestBundleClick,
  onInterviewClick
}: IStudentReportProps) => {
  return (
    <SubscriberReport
      _id={_id}
      getBatches={getBatches}
      getStudent={getStudent}
      getAssetUrl={getAssetUrl}
      getTests={getTests}
      getInterviews={getInterviews}
      onBatchTestClick={onBatchTestClick}
      onTestBundleClick={onTestBundleClick}
      onInterviewClick={onInterviewClick}
    />
  );
};

export default StudentDetail;
