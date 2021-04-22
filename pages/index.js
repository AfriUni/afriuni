import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SlideShowSection from '../src/components/sections/home/slideShow';
import AboutSection from '../src/components/sections/home/about';
import FieldStudySection from '../src/components/sections/home/fieldStudy';
import DestinationSection from '../src/components/sections/home/destination';
import FeaturedCoursesSection from '../src/components/general/featuredCourses';
import FeaturedUniversitySection from '../src/components/sections/home/featuredUniversity';
import client from '../src/apollo/client';
import { GET_CATEGORIE } from '../src/queries/specialisation/get-categories';
import { GET_COUNTRIES } from '../src/queries/location/get-locations';
import { GET_FEATURED_COURSE } from '../src/queries/home/get-featuredCourses';
import { GET_FEATURED_UNIVERSITY } from '../src/queries/home/get-featuredUniversities';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <SlideShowSection data={props.slider.data} />
      <AboutSection />
      <FieldStudySection data={props.fieldStudy.data} />
      <DestinationSection data={props.destination.data} />
      <FeaturedCoursesSection
        title="Interesting Courses"
        titleClassName="text-2xl md:text-5xl"
        sectionClassName="pt-8 md:pt-16 pb-12 md:pb-32"
        data={props.featuredCourse.data}
      />
      <FeaturedUniversitySection data={props.featuredUniversity.data} />
    </div>
  );
}

export async function getStaticProps(context) {
  const destination = await client.query({
    query: GET_COUNTRIES,
  });

  const fieldStudy = await client.query({
    query: GET_CATEGORIE,
  });

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;

  const featuredCourse = await client.query({
    query: GET_FEATURED_COURSE,
    variables: {
      type: 'home',
      start_date: today,
    },
  });


  const featuredUniversity = await client.query({
    query: GET_FEATURED_UNIVERSITY,
    variables: {
      type: 'home',
      start_date: today,
    },
  });

  const slider = await client.query({
    query: GET_FEATURED_UNIVERSITY,
    variables: {
      type: 'slider',
    },
  });

  return {
    props: {
      fieldStudy,
      destination,
      featuredCourse,
      featuredUniversity,
      slider,
    },
    revalidate: 1,
  };
}
