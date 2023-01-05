import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter, Route } from 'react-router-dom';
import { TestResults } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';
// import './style.css';

export default {
  title: 'admin/Results',
};
EducrackAPI.setENV('ec2co-ecsel-1ctgqfacuwqzg-1629476056.ap-south-1.elb.amazonaws.com');

export const TestResultsStory = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    EducrackAPI.auth
      .login({ email: 'admin@educrack.com', password: 'password' })
      .then(({ status }) => {
        if (status === 200) {
          setLoggedIn(true);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          <TestResults
            getTestAttempt={EducrackAPI.userTest.get}
            attemptId={'60db3ee49f39ac260de81ad9'}
            // attemptId={'60d957887551c06d3767b7d1'}
            onTestInProgress={(testId: string) => {
              console.log('Test in progress: test ID', testId);
              // history.push(`/course/test/${testId}`);
            }}
            onNoTestResultReady={() => {
              console.log('No test / test result move to test/list page');
              // history.push(`/course/test/${testId}`);
            }}
            imageBaseUrl={'https://dev.educrack.com/static-assets/asset/image/'}
          />
        </>
      ) : (
        <h4 className="text-center">Please Login First</h4>
      )}
    </BrowserRouter>
  );
};
