import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import EducrackAPI from '@lipihipi/client-sdk';
import EducatorAttendanceList from '../../src/educators/attendance';

export default {
  title: 'educator/attendance',
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
      {isLoggedIn && <EducatorAttendanceList title={'Educator Attendance'} />}
    </BrowserRouter>
  );
};
