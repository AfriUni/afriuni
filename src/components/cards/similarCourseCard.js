import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const SimilarCourseCard = props => {
    const [isPremium, setIsPremium] = React.useState(false);

    React.useEffect(() => {
        if (props.premium) setIsPremium(true);
    }, [props.premium]);

    return (
        <div className={`relative space-y-2 px-2 my-4 ${isPremium ? 'border-8 border-custom-primary border-t-30 rounded-lg' : ''}`}>
            {isPremium && (
                <div className="absolute -top-8 left-0">
                    <img src="../../../../premiumCourse.png" alt="" />
                </div>
            )}

            <div className="flex items-start space-x-1 text-2xl font-normal text-black">
                <span className="w-1/12 pt-3">
                    <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                </span>{' '}
                <span className="w-11/12">Computer Science, Bsc</span>
            </div>
            <div className={`space-y-2 ml-8 pb-4 ${!isPremium ? 'border-b border-gray-400' : ''}`}>
                <Link href={'/'}>
                    <a className="text-custom-primary text-lg block">Catholic University of Cameroun - Bamenda </a>
                </Link>

                <div className="flex items-center justify-between text-gray-500">
                    <div>Bamenda, Cameroon</div>
                    <div>Bachelors</div>
                </div>
            </div>
        </div>
    );
};

export default SimilarCourseCard;
