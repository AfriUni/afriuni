import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useMediaQuery } from 'react-responsive';
import styles from '../../../../../styles/globals.module.scss';
import { ButtonDefault } from '../../../styleComponent/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import SimilarCourseCard from '../../../cards/similarCourseCard';
import client from "../../../../apollo/client";
import GET_SIMILAR_COURSE from "../../../../queries/course/get-similar-courses";
import {getLocationData} from "../../../../utils/universityUtils";

const TabSimilarSection = (props) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [category, setCategory] = React.useState([]);
  const [dataAfrica, setDataAfrica] = React.useState([]);
  const [dataCountry, setDataCountry] = React.useState([]);

  const [showCountAfrica, setShowCountAfrica] = React.useState(5);
  const [showMoreAfrica, setShowMoreAfrica] = React.useState(false);

  const [showCountCountry, setShowCountCountry] = React.useState(5);
  const [showMoreCountry, setShowMoreCountry] = React.useState(false)

  React.useEffect( () => {

      if(props.data.length){

          const idCat = [];

          props.data.map((item) => {
            if(!item.children.nodes.length){
              idCat.push(item.databaseId);
            }
          });

          setCategory(idCat);
      }

  }, [props.data]);

  React.useEffect(() => {
      queryData();
  }, [category]);

  const showUpAfrica = () => {
    if(showMoreAfrica){
      setShowCountAfrica(5)
    }else{
      setShowCountAfrica(dataAfrica.length)
    }
    setShowMoreAfrica(!showMoreAfrica);
  }

  const showUpCountry = () => {
    if(showMoreCountry){
      setShowCountCountry(5)
    }else{
      setShowCountCountry(dataCountry.length)
    }
    setShowMoreCountry(!showMoreCountry);
  }

  React.useEffect(() => {
    if (isMobile) {
      setTabIndex(0);
    } else {
      setTabIndex(0);
    }
  }, [isMobile]);

  const queryData = async () => {

    if (category.length) {

      const queryData = await client.query(({
        query: GET_SIMILAR_COURSE,
        variables: {
          objectIds: category,
          random: true,
          count_course: 50
        }
      }));

      let courses  = [];

      queryData.data.specialisations.nodes.map((item) => {
        courses = [...courses, ...item.courses.nodes];
      });

      if (courses.length) {

        const courseAfrica = [];
        const courseCountry = [];

        courses.map((item) => {

          if(item.databaseId !== props.currentCourseId){

              const university = item.university.nodes[0];
              const location = getLocationData(university.locations.nodes);
              if(location.databaseIdCountry === props.country.databaseIdCountry){
                courseCountry.push(item)
              }

              courseAfrica.push(item);
          }

        });

        setDataAfrica(courseAfrica.slice(0, 10));
        setDataCountry(courseCountry.slice(0, 10));

      }

    }
  }

  const onSelectTab = (index, lastIndex, event) => {
    setTabIndex(index);
  };

  return (
    <div>
      <Tabs
        className="flex flex-col relative h-full"
        selectedIndex={tabIndex}
        onSelect={onSelectTab}
      >
        <TabList className="flex items-center justify-between border-b border-gray-200 font-normal text-lg bg-custom-primary bg-opacity-25">
          <Tab
            className={`space-x-1 w-full p-3 text-center cursor-pointer`}
            selectedClassName={`bg-white border border-gray-200 p-3 shadow-lg focus:outline-none`}
          >
            <span>Accros</span> <span className={'text-custom-secondary'}>Africa</span>{' '}
            <span>({dataAfrica.length})</span>
          </Tab>
          <Tab
            className={`space-x-1 w-full p-3 text-center cursor-pointer`}
            selectedClassName={`bg-white border border-gray-200 p-3 shadow-lg focus:outline-none`}
          >
            <span>In</span> <span className={'text-custom-secondary'}>{props.country.country}</span> <span>({dataCountry.length})</span>
          </Tab>
        </TabList>

        <div className={`w-full min-h-3/4 bg-white bg-white top-0 h-full md:h-auto`}>
          <TabPanel className="opacity-0 p-2" selectedClassName="opacity-100 bg-white">
            {/*<SimilarCourseCard premium={true} />*/}
            {dataAfrica.slice(0, showCountAfrica).map((item, i) => {
              return <SimilarCourseCard data={item} key={i}/>
            })}

            {dataAfrica.length > 5 && (
                <div className="flex justify-center mt-4">
                  <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm" onClick={() => showUpAfrica()}>
                    {showMoreAfrica ? (
                        <><FontAwesomeIcon icon={faChevronUp} className="w-4 h-4" /><span>Show Less</span></>
                    ) : (
                        <><FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" /><span>Show More</span></>
                    )}
                  </ButtonDefault>
                </div>
            )}

          </TabPanel>
          <TabPanel className="opacity-0 p-2" selectedClassName="opacity-100 bg-white">
            {dataCountry.slice(0, showCountCountry).map((item, i) => {
              return <SimilarCourseCard data={item} key={i}/>
            })}

            {dataCountry.length > 5 && (
                <div className="flex justify-center mt-4">
                  <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm" onClick={() => showUpCountry()}>
                    {showMoreCountry ? (
                        <><FontAwesomeIcon icon={faChevronUp} className="w-4 h-4" /><span>Show Less</span></>
                    ) : (
                        <><FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" /><span>Show More</span></>
                    )}
                  </ButtonDefault>
                </div>
            )}
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default TabSimilarSection;
