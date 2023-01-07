import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { Descriptive } from '../../src';
import { DescriptiveResult } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';
// import './style.css';

export default {
  title: 'Descriptive',
};
EducrackAPI.setENV('student.hkcl.com.s3-website.ap-south-1.amazonaws.com');

export const DescriptiveStory = () => {
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
        <Descriptive
          testAttemptId={'60f705457fec33060dfaf9e6'}
          userTest={EducrackAPI.userTestAttempt.get}
          submitEvaluatedAnswer={
            EducrackAPI.userTestAttempt.submitEvaluatedAnswer
          }
          finishEvaluationAnswer={EducrackAPI.userTestAttempt.finishEvaluation}
          createAsset={EducrackAPI.asset.create}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
        />
      )}
    </BrowserRouter>
  );
};

export const DescriptiveResultStory = () => {
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
        <DescriptiveResult
          testAttemptId={'60f705457fec33060dfaf9e6'}
          userTest={EducrackAPI.userTestAttempt.get}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
        />
      )}
    </BrowserRouter>
  );
};
