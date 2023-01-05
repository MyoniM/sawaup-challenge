import 'react-alice-carousel/lib/alice-carousel.css';

import React, { useContext, useMemo, memo } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { useQuery } from 'react-query';

import { Course } from '@/domain/models';
import { CourseContext } from '@/pages/_app';
import CourseCard from './courseCard';

import styles from '@/presentation/styles/courses.module.css';
import EmptyCourseList from './emptyCourseList';
import { RemoteGetCourse } from '@/data/usecases/course/remote-get-course';

interface IProps {
  courses: Course[];
}

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4, itemsFit: 'contain' },
};

const Courses = memo(function Courses({ courses }: IProps) {
  const [store] = useContext(CourseContext)!;

  const remoteGetCourse = new RemoteGetCourse().getAll;

  const { data } = useQuery('courses', () => remoteGetCourse({ user_id: 'testUser' }), {
    initialData: courses,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const selectedSkillsId = store.skills.map((s) => s.isSelected && s.id);
  const filteredCourses = useMemo(() => data?.filter((c) => c.skills.some((skill) => selectedSkillsId.includes(skill))), [selectedSkillsId, data]);

  return (
    <div className={styles.coursesWrapper}>
      <div>
        <h3>Selected courses</h3>
        <div className={styles.availableCoursesWrapper}>
          {filteredCourses?.length === 0 && <EmptyCourseList />}
          <AliceCarousel
            key="carousel"
            disableDotsControls
            responsive={responsive}
            items={React.Children.toArray(filteredCourses?.map((c) => <CourseCard course={c} />))}
          />
        </div>
      </div>
      <div>
        <h3>Available courses</h3>
        <div className={styles.availableCoursesWrapper}>{React.Children.toArray(data!.map((c) => <CourseCard course={c} />))}</div>
      </div>
    </div>
  );
});

export default Courses;
