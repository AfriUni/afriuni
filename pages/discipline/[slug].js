import React from 'react';
import Head from 'next/dist/next-server/lib/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faChevronRight, faUniversity } from '@fortawesome/free-solid-svg-icons';
import ShowMoreText from 'react-show-more-text';
import { faFileArchive } from '@fortawesome/free-regular-svg-icons';

import '../../styles/globals.module.scss';
import { ButtonRedPrimary } from '../../src/components/styleComponent/button';

// apollo
import client from '../../src/apollo/client';
import { GET_CATEGORY_BY } from '../../src/queries/specialisation/get-category';
import HomeFeaturedCourseCard from '../../src/components/cards/homeFeaturedCourseCard';

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const DisciplinesPage = (props) => {
  const [data, setData] = React.useState({});
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const currentData = props.data || {};
    setData(currentData);

    if(Object.entries(currentData).length){
      const currentCourses = currentData?.courses.nodes.slice(0,6);
      shuffle(currentCourses);
      setCourses(currentCourses)
    }
  }, [props.data]);

  if (Object.entries(data).length === 0) return <div>Loading</div>;

  return (
    <div>
      <Head>
        <title> {data.seo.title} - Discipline</title>
      </Head>

      <div className="bg-white">
        <div className="container px-4 py-5 mx-auto">
          <div className="flex items-center justify-start space-x-3 text-sm text-custom-primary">
            <Link href="/">
              <a>Home</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2" />
            <span className={'capitalize'}>{data?.name.toLowerCase()}</span>
          </div>
        </div>
      </div>

      <div className="container px-6 pt-8 mx-auto space-y-5 md:px-48">
        <div className="flex items-center space-x-5">
          <div>
            <img src={data?.logo} alt="" className={'h-16 md:h-20'} />
          </div>
          <div className="space-y-2">
            <div className="text-xl font-normal text-black">About</div>
            <h1 className="text-3xl font-semibold text-black capitalize">
              {data?.name.toLowerCase()}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-10">
          <div className="col-span-2 text-justify">
            <ShowMoreText
              /* Default options */
              lines={5}
              more="Read more"
              less="Show less"
              className="text-justify"
              anchorClass="text-custom-primary font-normal"
              expanded={false}
            >
              {data?.description}
            </ShowMoreText>
          </div>
          <div className="col-span-1 space-y-3 md:space-y-6">
            <div className="flex space-x-3">
              {' '}
              <FontAwesomeIcon icon={faUniversity} className="w-5 h-5" />{' '}
              <span>{data?.university_count} Universities</span>
            </div>
            <div className="flex space-x-3">
              {' '}
              <FontAwesomeIcon icon={faFileArchive} className="w-5 h-5" />{' '}
              <span>{data?.children.nodes.length} Specialisations</span>
            </div>
            <div className="flex space-x-3">
              {' '}
              <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5" />{' '}
              <span>{data?.count} Courses</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center md:mt-10">
            <ButtonRedPrimary className="rounded-lg">
              See all <span className="capitalize">{data?.name.toLowerCase()}</span> Courses
            </ButtonRedPrimary>
          </div>
        </div>
      </div>

      <div className="container py-8 mx-auto">
        <div className="p-6 bg-white">
          <div className="my-5 text-xl font-semibold text-center md:text-3xl">
            Specialisations within <span className="capitalize">{data?.name.toLowerCase()}</span>
          </div>

          <div className="md:px-10 md:py-5">
            <ul className="space-y-3 list-disc list-inside md:col-count-3">
              {data?.children.nodes.map((item, i) => {
                return (
                  <li key={i}>
                    <Link href="#">
                      <a className="text-base font-normal md:text-lg text-custom-primary">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={'pt-4 md:pt-8 pb-6 md:pb-18'}>
          <div className="container px-4 mx-auto">
            <h3
              className={`font-medium text-custom-primary_2 text-center mt-5 md:mb-10 text-2xl md:text-4xl`}
            >
              Interesting <span className="capitalize">{data?.name.toLowerCase()}</span> Courses
            </h3>

            <div className="grid-flow-row grid-cols-none mt-5 space-y-4 md:mt-10 md:space-y-0 md:grid md:grid-cols-3 gap-x-4 gap-y-2 md:gap-y-6 auto-cols-fr">
              {courses.map((item, i) => {
                return <HomeFeaturedCourseCard data={item} key={i} />;
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <ButtonRedPrimary className="rounded-lg">
              See all <span className="capitalize">{data.name.toLowerCase()}</span> Courses
            </ButtonRedPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: [], fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  const data = await client.query({
    query: GET_CATEGORY_BY,
    variables: {
      id: params.slug,
      random : true
    },
  });

  // Pass post data to the page via props
  return { props: { data : data.data.specialisation }, revalidate: 1 };
}

export default DisciplinesPage;
