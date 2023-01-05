import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { StudentList } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'student/list',
};
EducrackAPI.setENV('development');

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
        <StudentList
        title={'Students Reports'}
        breadCrumbs={[
          { title: 'Reports', link: '/' },
          { title: 'Student Reports' },
        ]}
        getStudents={EducrackAPI.studentProfile.list}
        getAssetUrl= {EducrackAPI.asset.getAssetUrl}
        getCourses={EducrackAPI.course.list}
        onStudentReportClick={(_id: string) => {
          console.log("STUDENT_ID:", _id);
        }}
        />
      )}
    </BrowserRouter>
  );
};
