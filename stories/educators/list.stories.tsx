import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { EducatorList } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'educator/list',
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
        <EducatorList
          title="Educator Reports"
          breadCrumbs={[
            { title: 'Reports', link: '/' },
            { title: 'Educators Report' },
          ]}
          getEducators={EducrackAPI.educator.list}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getCourses={EducrackAPI.course.list}
          onReportClick={(id: any) => {
            console.log('Educator Id', id);
          }}
        />
      )}
    </BrowserRouter>
  );
};
