import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {getLocationData} from "../../utils/universityUtils";

const SimilarCourseCard = (props) => {
  const [isPremium, setIsPremium] = React.useState(false);
  const [data, setData] = React.useState({});
  const [location, setLocation] = React.useState({});
  const [university, setUniversity] = React.useState({});

  React.useEffect(() => {
    if (props.premium) setIsPremium(true);
  }, [props.premium]);

  React.useEffect(() => {
    if(props.data){
      setData(props.data);
      setLocation(getLocationData(props.data.university.nodes[0].locations.nodes));
      setUniversity(props.data.university.nodes[0])
    }
  }, [props.data]);

  if(!data) return <></>;

  return (
    <div
      className={`relative space-y-2 px-2 my-4 ${
        isPremium ? 'border-8 border-custom-primary border-t-30 rounded-lg' : ''
      }`}
    >
      {isPremium && (
        <div className="absolute -top-8 left-0">
          <img src="../../../../premiumCourse.png" alt="" />
        </div>
      )}

      <div className="flex items-start text-2xl font-normal text-black">
        <span className="w-1/12 pt-3">
          <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
        </span>{' '}
        <span className="w-11/12">
          <Link href={`/course/${data.databaseId}/${data.slug}`}>
            <a>{data.title}</a>
          </Link>
        </span>
      </div>
      <div className={`space-y-2 ml-9 pb-4 ${!isPremium ? 'border-b border-gray-400' : ''}`}>
        <Link href={`/university/${university.slug}`}>
          <a className="text-custom-primary text-lg block">
            {university.title}
          </a>
        </Link>

        <div className="flex items-center justify-between text-gray-500">
          <div>{location.city}, {location.country}</div>
          <div>{data?.studiesLevel?.nodes[0].name}</div>
        </div>
      </div>
    </div>
  );
};

export default SimilarCourseCard;
