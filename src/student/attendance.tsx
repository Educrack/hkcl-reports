import React from 'react';
import {
  PageHeader,
  PaginatedTable,
  Loader,
  Button,
} from '@lipihipi/ec-ui';

import Styled from 'styled-components';
import { AiOutlineDownload } from 'react-icons/ai';

export const Avatar = Styled.div<{ url: string }>`
background-image: url(${({ url }: any) => url});
`;

const StudentAttendanceList = ({
  title,
}) => {

//   const [isLoading, setIsLoading] = React.useState<boolean>(true);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <section className="main-structure">
        <PageHeader
          title={title || 'Students Attendance'}
        />
        <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"white", paddingLeft:"2%", paddingRight:"2%", paddingTop:"2%"}}>
          <div>
            <h5>Student Name will be displayed here</h5>
            <p>Batch name display here</p>
          </div>
          <div >
             <Button shape="secondary">
                    
                <span style={{padding:"10px"}}>Download PDF </span>
                <AiOutlineDownload
                style={{ height: '20px', width: '20px' }}
                />
            </Button>
          </div>
        </div>
        <hr></hr>
        <PaginatedTable
          data = {[]}
          columns={[
            {
              dataRenderer: (data: any) => (
                <div className=" cursor-pointer">
                  <a style={{ fontSize: '14px' }}>
                    <div className="wrap">
                      <p className="avtar-email m-0">
                        Session Name
                      </p>
                    </div>
                  </a>
                </div>
              ),
              title: 'Session Title',
              width: 'calc(100% - (15% + 15% + 15% + 15% + 15% ) )',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  Subject Name
                </div>
              ),
              title: 'Subject',
              width: '15%',
            },
            {
                dataRenderer: (data: any) => (
                  <div className="primary-text">
                    Topic name
                  </div>
                ),
                title: 'Topic',
                width: '15%',
              },
              {
                dataRenderer: (data: any) => (
                  <div className="primary-text">
                    Date
                  </div>
                ),
                title: 'Date',
                width: '15%',
              },
              {
                dataRenderer: (data: any) => (
                  <div className="primary-text">
                    Start Time
                  </div>
                ),
                title: 'Start Time',
                width: '15%',
              },
              {
                dataRenderer: (data: any) => (
                  <div className="primary-text">
                    End Time
                  </div>
                ),
                title: 'End Time',
                width: '15%',
              },
          ]}
          totalItems={10}
          onPageChange={page => {
          }}
          itemsPerPage={10}
          currentPage={1}
        />
      </section>
    </>
  );
};

export default StudentAttendanceList;
