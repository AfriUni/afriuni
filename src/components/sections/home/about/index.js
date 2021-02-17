import React from 'react';
import SearchIcon from '../../../icons/searchIcon';
import ExploreIcon from '../../../icons/exploreIcon';
import EmailIcon from '../../../icons/emailIcon';
import AlertIcon from '../../../icons/alertIcon';

const AboutSection = props => {
    return (
        <div className="bg-white transform -skew-y-3 z-0 -mt-20 md:pt-20 pt-10">
            <div className="container mx-auto px-4 transform skew-y-3 pt-16 md:pb-24 pb-12">
                <div className="flex w-full justify-center">
                    <div className="grid grid-cols-4 gap-5 md:gap-10 w-full md:w-5/6 lg:w-full">
                        <div className="flex flex-col items-center space-y-3 justify-center">
                            <SearchIcon className="md:h-16 md:w-16 h-8 w-8" />
                            <div className="text-center text-gray-400 text-xs md:text-2xl font-medium">Search Courses</div>
                            <div className="text-gray-400 break-words text-center hidden md:block">
                                Discover thousands of coursesand select the right one foryour career aspirations
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3 justify-center">
                            <ExploreIcon className="md:h-16 md:w-16 h-8 w-8" />
                            <div className="text-center text-gray-400 text-xs md:text-2xl font-medium">Explore Universities</div>
                            <div className="text-gray-400 break-words text-center hidden md:block">
                                Find detailed informationabout hundreds of universitiesfrom all over Africa
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3 justify-center">
                            <EmailIcon className="md:h-16 md:w-16 h-8 w-8" />
                            <div className="text-center text-gray-400 text-xs md:text-2xl font-medium">Contact Universities</div>
                            <div className="text-gray-400 break-words text-center hidden md:block">
                                Communicate directly with theadmission offices of theuniversities you are interested in
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3 justify-center">
                            <AlertIcon className="md:h-16 md:w-16 h-8 w-8" />
                            <div className="text-center text-gray-400 text-xs md:text-2xl font-medium">Course Alerts</div>
                            <div className="text-gray-400 break-words text-center hidden md:block">
                                Setup Alerts and be notified by email about new courses that match your interest/preferences
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
