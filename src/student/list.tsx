import React from 'react';
import {
  PageHeader,
  PaginatedTable,
  ActionButton,
  ListItemAction,
  Menu,
  Loader,
} from '@lipihipi/ec-ui';
import { DateTime, Form, Input, Select } from '@lipihipi/form';
import moment from 'moment';
import { MdSearch } from 'react-icons/md';
import Styled from 'styled-components';
import { IStudentListProps } from './types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

export const Avatar = Styled.div<{ url: string }>`
background-image: url(${({ url }: any) => url});
`;


const mapSelectValues = (values: any[]) => {
  return values.map(value => {
    return { label: value.name, value: value._id };
  });
};

const StudentList = ({
  getStudents,
  title,
  breadCrumbs,
  getAssetUrl,
  onStudentReportClick,
  getCourses,
}: IStudentListProps) => {
  const [students, setStudents] = React.useState<any>({
    totalItems: 0,
    students: [],
  });

  const [downloadStudents, setDownloadStudents] = React.useState<any>({
    totalItems: 0,
    students: [],
  });

  const [allStudents, setAllStudents] = React.useState<any>([]);

  const [params, setParams] = React.useState<any>({
    populate: true,
    page: 1,
    q: '',
  });

  const [downloadParams, setDownloadParams] = React.useState<any>({
    all: true,
    q: ''
  });

  const [courses, setCourses] = React.useState<any>({
    courses: [],
    totalItems: 0,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getStudents({ ...params }).then(({ data }: any) => {
      setIsLoading(false);
      setStudents(data);
    });
  }, [params]);

  React.useEffect(() => {
    getStudents({ ...downloadParams }).then(({ data }: any) => {
      setIsLoading(false);
      setDownloadStudents(data);
    });
  }, [downloadParams]);

  React.useEffect(() => {
    getCourses({ ...params }).then(({ data }: any) => {
      setIsLoading(false);
      setCourses(data);
    });
    getStudents({ ...params, all: true }).then(({ data }: any) => {
      // setIsLoading(false);
      setAllStudents(data?.students);
    });
  }, []);

  const handleSearch = (values: any) => {
    setParams({
      ...values,
      status: 'PUBLISH',
      page: 1,
    });
    setDownloadParams({
      ...values,
      status: 'PUBLISH'
    })
  };

  const exportToExcel = () => {
    let studentsData;
    if (params?.startDate || params?.endDate || params?.q || params?.course) studentsData = downloadStudents?.students;
    else studentsData = allStudents;
    const excelData: any = [];
    if (studentsData?.length > 0) {
      studentsData.forEach((student: any) => {
        const studentDetails = {
          "Student Name": student.name ? student.name : 'Not Available',
          "Student Email": student.email ? student.email : 'Not Available',
          "Student Mobile": student.mobile ? student.mobile : 'Not Available',
          "Enrollment Id": student.eduId,
          "Course": student?.selectedCourses?.length
            ? student?.selectedCourses
              ?.map((selectedCourses: any) => {
                return selectedCourses.course.name;
              })
              .join(', ')
            : 'Not Available',
          "Signup Date": moment(student?.createdAt).format('D MMM YYYY')
        };
        excelData.push(studentDetails);
      });
    }
    return excelData;
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title={title || 'Students Reports'}
          breadCrumbs={
            breadCrumbs || [
              { title: 'Reports', link: '/' },
              { title: 'Students Report' },
            ]
          }
        />

        <Form
          initialValues={params}
          onSubmit={handleSearch}
          render={({ submitForm }: any) => (
            <>
              <div style={{ float: "right" }}>
                <Button
                  name="Export"
                  id="Export"
                  onClick={() => exportToExcel()}
                >
                  <CSVLink
                    data={exportToExcel()}
                    filename={'Student Reports.csv'}
                    target="_blank"
                  >
                    <li className="gv-list export-list">Export</li>
                  </CSVLink>
                </Button>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <Input
                    prefix={<MdSearch />}
                    id="searchExam"
                    name="q"
                    onChange={submitForm}
                    placeholder="Enter here to search for Students"
                  />
                </div>
                <div className="col-md-4">
                  <Select
                    id="course"
                    name="course"
                    placeholder="Select Course"
                    onChange={submitForm}
                    options={[
                      { label: 'ALL', value: '' },
                      ...mapSelectValues(courses.courses),
                    ]}
                  />
                </div>
                <div className="col-md-3">
                  <DateTime
                    name={`startDate`}
                    id={`startDate`}
                    label=""
                    dateFormat="MMMM d, yyyy"
                    onChange={submitForm}
                    placeholderText="Start Date"
                    isClearable
                  />
                </div>
                {/* <div className="col-md-3">
                  <DateTime
                    name={`endDate`}
                    id={`endDate`}
                    label=""
                    placeholderText="End Date"
                    dateFormat="MMMM d, yyyy"
                    onChange={submitForm}
                    isClearable
                  />
                </div> */}
                <button type="submit" className="d-none"></button>
              </div>
            </>
          )}
        />

        <PaginatedTable
          data={students.students}
          columns={[
            {
              dataRenderer: (data: any) => (
                <div className="avtar-with-text cursor-pointer">
                  <Avatar
                    className="primary-avtar"
                    url={
                      data?.displayPicture
                        ? getAssetUrl(data?.displayPicture)
                        : ''
                    }
                  />
                  <a style={{ fontSize: '14px' }}>
                    <div className="wrap">
                      <p className="avtar-name">
                        {data?.name ? data?.name : 'Not Available'}
                      </p>
                      <p className="avtar-email m-0">
                        {data?.email ? data?.email : 'Not Available'}
                      </p>
                      <p className="avtar-mobile m-0">
                        {data?.mobile ? data?.mobile : 'Not Available'}
                      </p>
                    </div>
                  </a>
                </div>
              ),
              title: 'Student Name',
              width: 'calc(100% - (300px + 250px + 60px ) )',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {data.eduId}
                </div>
              ),
              title: 'EnrollmentId',
              width: '100px',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {data?.selectedCourses?.length
                    ? data?.selectedCourses
                      ?.map((selectedCourses: any) => {
                        return selectedCourses.course.name;
                      })
                      .join(', ')
                    : 'Not Available'}
                </div>
              ),
              title: 'Course(s)',
              width: '200px',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {moment(data?.createdAt).format('D MMM YYYY')}
                </div>
              ),
              title: 'Signup Date',
              width: '250px',
            },
            {
              dataRenderer: (data: any) => (
                <ListItemAction>
                  <ActionButton>
                    <BsThreeDotsVertical />
                  </ActionButton>
                  <Menu>
                    <li
                      onClick={() => {
                        onStudentReportClick(data?._id);
                      }}
                    >
                      View Report
                    </li>
                  </Menu>
                </ListItemAction>
              ),
              title: '',
              width: '60px',
            },
          ]}
          totalItems={students?.totalItems}
          onPageChange={page => {
            setParams({ ...params, page });
          }}
          itemsPerPage={10}
          currentPage={params.page || 1}
        />
      </section>
    </>
  );
};

export default StudentList;
