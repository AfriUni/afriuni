import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useMediaQuery } from 'react-responsive';
import styles from '../../../../../styles/globals.module.scss';
import { ButtonDefault } from '../../../styleComponent/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SimilarCourseCard from '../../../cards/similarCourseCard';

const TabSimilarSection = props => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    React.useEffect(() => {
        if (isMobile) {
            setTabIndex(0);
        } else {
            setTabIndex(0);
        }
    }, [isMobile]);

    const onSelectTab = (index, lastIndex, event) => {
        setTabIndex(index);
    };

    return (
        <div>
            <Tabs className="flex flex-col relative h-full" selectedIndex={tabIndex} onSelect={onSelectTab}>
                <TabList className="flex items-center justify-between border-b border-gray-200 font-normal text-lg bg-custom-primary bg-opacity-25">
                    <Tab
                        className={`space-x-1 w-full p-3 text-center cursor-pointer`}
                        selectedClassName={`bg-white border border-gray-200 p-3 shadow-lg focus:outline-none`}
                    >
                        <span>Accros</span> <span className={'text-custom-secondary'}>Africa</span> <span>(17)</span>
                    </Tab>
                    <Tab
                        className={`space-x-1 w-full p-3 text-center cursor-pointer`}
                        selectedClassName={`bg-white border border-gray-200 p-3 shadow-lg focus:outline-none`}
                    >
                        <span>In</span> <span className={'text-custom-secondary'}>Egypt</span> <span>(7)</span>
                    </Tab>
                </TabList>

                <div className={`w-full min-h-3/4 bg-white bg-white top-0 h-full md:h-auto`}>
                    <TabPanel className="opacity-0 p-2" selectedClassName="opacity-100 bg-white">
                        <SimilarCourseCard premium={true} />
                        <SimilarCourseCard />
                        <SimilarCourseCard />
                        <SimilarCourseCard />
                        <SimilarCourseCard />

                        <div className="flex justify-center mt-4">
                            <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm">
                                <FontAwesomeIcon icon={faChevronDown} className="w-4" />
                                <span>See More</span>
                            </ButtonDefault>
                        </div>
                    </TabPanel>
                    <TabPanel className="opacity-0 p-2" selectedClassName="opacity-100 bg-white">
                        Panel 2
                        <div className="flex justify-center mt-4">
                            <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm">
                                <FontAwesomeIcon icon={faChevronDown} className="w-4" />
                                <span>See More</span>
                            </ButtonDefault>
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabSimilarSection;
