import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { TestReports } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'test/test',
};
EducrackAPI.setENV('development');

export const TestStory = () => {
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
        <TestReports
          testId={'60f703f2b479e703a18533be'}
          getUserTestEnrollment={EducrackAPI.userTestEnrollment.list}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getCourses={EducrackAPI.course.list}
          onShowResult={(_id: any) => {
            console.log('Result Id: ', _id);
          }}
          onCheckAnswer={(_id: any) => {
            console.log('Attempted Test ID: ', _id);
          }}
          onDescriptiveResult={(_id: any) => {
            console.log('Descriptive test id:', _id);
          }}
        />
      )}
    </BrowserRouter>
  );
};
