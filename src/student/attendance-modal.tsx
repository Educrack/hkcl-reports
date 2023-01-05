import { IconButton, Modal, PaginatedTable } from '@lipihipi/ec-ui';
import React from 'react';
import { HiDownload } from 'react-icons/hi';

const AttendanceModal = (props: any) => {
  const [params, setParams] = React.useState<any>({
    page: 1,
    isRecent: true,
  });
  return (
    <Modal
      isOpen={props.isOpen}
      heightDefault={true}
      onRequestClose={props.onRequestClose}
    >
      <div className="primary-page-header mb-5" style={{ width: 952 }}>
        <div className="wrap">
          <h3>Student Name will be displayed here</h3>
          <p>Batch name display here</p>
        </div>
        <IconButton className="primary-outine-button">
          <HiDownload />
          Download Report
        </IconButton>
      </div>
      <PaginatedTable
        data={[
          {
            title:
              'Recusandae rem mollitia beatae deserunt itaque sint ad provident.',
            subject: 'perspiciatis voluptatem quo',
            topic: 'sit nisi veniam',
            date: '01-01-21',
            start: '10:24am',
            end: '10:24am',
          },
          {
            title:
              'Recusandae rem mollitia beatae deserunt itaque sint ad provident.',
            subject: 'perspiciatis voluptatem quo',
            topic: 'sit nisi veniam',
            date: '01-01-21',
            start: '10:24am',
            end: '10:24am',
          },
          {
            title:
              'Recusandae rem mollitia beatae deserunt itaque sint ad provident.',
            subject: 'perspiciatis voluptatem quo',
            topic: 'sit nisi veniam',
            date: '01-01-21',
            start: '10:24am',
            end: '10:24am',
          },
          {
            title:
              'Recusandae rem mollitia beatae deserunt itaque sint ad provident.',
            subject: 'perspiciatis voluptatem quo',
            topic: 'sit nisi veniam',
            date: '01-01-21',
            start: '10:24am',
            end: '10:24am',
          },
        ]}
        columns={[
          {
            dataRenderer: (data: any) => (
              <div className="primary-text">{data.title}</div>
            ),
            title: 'Session Title',
            width: 'calc(100% - (160px + 160px + 100px + 100px + 100px))',
          },
          {
            dataRenderer: (data: any) => (
              <div className="primary-text">{data.subject}</div>
            ),
            title: 'Subject',
            width: '160px',
          },
          {
            dataRenderer: (data: any) => (
              <div className="primary-text">{data.topic}</div>
            ),
            title: 'Topic',
            width: '160px',
          },

          {
            dataRenderer: (data: any) => (
              <div className="primary-text">{data.date}</div>
            ),
            title: 'Date',
            width: '100px',
          },

          {
            dataRenderer: (data: any) => (
              <div className="primary-text">{data.start}</div>
            ),
            title: 'Start time',
            width: '100px',
          },
          {
            dataRenderer: (data: any) => (
              <div className="primary-text">{data.end}</div>
            ),
            title: 'End time',
            width: '100px',
          },
        ]}
        totalItems={20}
        onPageChange={page => {
          setParams({ ...params, page: page });
        }}
        itemsPerPage={10}
        currentPage={params.page || 1}
      />
    </Modal>
  );
};

export default AttendanceModal;
