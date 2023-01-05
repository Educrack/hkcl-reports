import React, { useEffect, useState } from 'react';
import '@lipihipi/theme';
import { BrowserRouter } from 'react-router-dom';
import { AllBatches } from '../../src';
import EducrackAPI from '@lipihipi/client-sdk';

export default {
  title: 'batches/all',
};
EducrackAPI.setENV('ec2co-ecsel-1ctgqfacuwqzg-1629476056.ap-south-1.elb.amazonaws.com');

export const AllStory = () => {
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
        <AllBatches
          breadCrumbs={[{ title: 'Reports', link: '/' }]}
          getAssetUrl={EducrackAPI.asset.getAssetUrl}
          getBatches={EducrackAPI.batchV2.list}
          getEducators={EducrackAPI.educator.list}
          onViewBatchReport={(_id: any) => {
            console.log('Batch_Report: ', _id);
          }}
          getCourses={EducrackAPI.course.list}
        />
      )}
    </BrowserRouter>
  );
};
