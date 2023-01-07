import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { TestList } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'test/list',
};
EducrackAPI.setENV('student.hkcl.com.s3-website.ap-south-1.amazonaws.com');

export const ListStory = () => {
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
        <TestList
          breadCrumbs={[{ title: 'Reports', link: '/' }, { title: 'Tests' }]}
          getTests={EducrackAPI.questionSet.testReport}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getCourses={EducrackAPI.course.list}
          onReportClick={(_id: any) => {
            console.log('Test ID', _id);
          }}
        />
      )}
    </BrowserRouter>
  );
};
