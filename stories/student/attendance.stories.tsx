import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import EducrackAPI from '@lipihipi/client-sdk';
import StudentAttendanceList from '../../src/student/attendance';

export default {
  title: 'student/attendance',
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
        <StudentAttendanceList
        title={'Students Attendance'}
        />
      )}
    </BrowserRouter>
  );
};
