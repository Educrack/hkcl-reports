import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { BatchReport } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'batches/report',
};
EducrackAPI.setENV('student.hkcl.com.s3-website.ap-south-1.amazonaws.com');

export const ReportStory = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    EducrackAPI.auth
      .login({ email: 'admin@educrack.com', password: 'password' })
      .then(() => {
        setLoggedIn(true);
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <BatchReport
          _id={'62d7d58147ffc1ed3d97d76e'}
          breadCrumbs={[
            { title: 'Reports', link: '/' },
            { title: 'Batch Report' },
          ]}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getBatchById={EducrackAPI.batchV2.get}
          getBatchStudents={EducrackAPI.batchV2.getBatchStudents}
          getBatchEducators={EducrackAPI.batchV2.getTeacherBatchList}
          onStudentClick={(id: any) => {
            console.log('student_id', id);
          }}
          onEducatorClick={(id: any) => {
            console.log('educator_id', id);
          }}
        />
      )}
    </BrowserRouter>
  );
};
