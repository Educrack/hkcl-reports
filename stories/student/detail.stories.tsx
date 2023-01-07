import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { StudentDetail } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'student/detail',
};
EducrackAPI.setENV('student.hkcl.com.s3-website.ap-south-1.amazonaws.com');

export const DetailStory = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    EducrackAPI.auth
      .login({
        email: 'admin@educrack.com',
        password: 'password',
      })
      .then(() => {
        setLoggedIn(true);
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <StudentDetail
          _id={'6380b1e1e1736a542c625ada'}
          getBatches={EducrackAPI.batchV2.list}
          getStudent={EducrackAPI.studentProfile.get}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getTests={EducrackAPI.userTestBundle.list}
          getInterviews={EducrackAPI.userInterview.list}
          getBatch={EducrackAPI.batchV2.get}
          getEnrolledTest={EducrackAPI.testBundleEnrollment.get}
          onBatchTestClick={(id: string) => {
            console.log('Batch_Test_ID:', id);
          }}
          onTestBundleClick={(id: string) => {
            console.log('Test_Bundle_ID:', id);
          }}
          onInterviewClick={(id: string) => {
            console.log('Interview_ID:', id);
          }}
        />
      )}
    </BrowserRouter>
  );
};
