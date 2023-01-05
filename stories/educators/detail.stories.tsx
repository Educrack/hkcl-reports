import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { EducatorDetail } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'educator/detail',
};
EducrackAPI.setENV('development');

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
        <EducatorDetail
          _id={'60aa000bea664c683379d446'}
          getEducatorById={EducrackAPI.educator.get}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getTeacherBatchList={EducrackAPI.batchV2.getTeacherBatchList}
          breadCrumbs={[
            { title: 'Reports', link: '/' },
            { title: 'Educator Report' },
          ]}
          onViewBatchReport= {(_id: any) => {
            console.log('Batch_Report: ', _id);
          }}
        />
      )}
    </BrowserRouter>
  );
};
