import React from 'react';
import styles from '../../../../styles/globals.module.scss';
import Link from 'next/link';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useMediaQuery } from 'react-responsive';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryMenu = props => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [clickedTab, setClickedTab] = React.useState(false);

    React.useEffect(() => {
        if (isMobile) {
            setTabIndex(0);
        } else {
            setClickedTab(false);
            setTabIndex(0);
        }
    }, [isMobile]);

    const closeTabContent = () => {
        setClickedTab(false);
    };

    const onSelectTab = (index, lastIndex, event) => {
        setTabIndex(index);
        setClickedTab(true);
    };

    return (
        <>
            {!clickedTab ? (
                <h3 className="bg-custom-primary md:bg-white text-white md:text-custom-primary_2 text-base font-medium md:font-normal md:text-xl  md:mt-6 py-4 px-5 md:p-0">
                    Courses
                </h3>
            ) : (
                <>
                    <h3 className="bg-custom-primary md:bg-white text-white md:text-custom-primary_2 text-base font-medium md:font-normal md:text-xl  md:mt-6 py-4 px-5 md:p-0 hidden md:block">
                        Courses
                    </h3>
                    <div
                        className="bg-custom-primary text-white md:text-custom-primary_2 text-base font-medium md:text-xl md:mt-6 py-4 px-5 md:p-0 md:hidden flex items-center"
                        onClick={closeTabContent}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-3 w-3" /> Back to main categories
                    </div>
                </>
            )}

            <Tabs className="flex flex-col md:flex-row md:divide-x-2 md:py-5 relative h-full" selectedIndex={tabIndex} onSelect={onSelectTab}>
                <TabList className="text-custom-primary_2 bg-white h-full">
                    {props.data.map((item, i) => {
                        return (
                            <Tab
                                key={i}
                                className={`${styles.tabCategory} space-x-3 px-5 py-3 md:p-0 border-b md:border-0 md:mb-2 cursor-pointer`}
                                selectedClassName={`md:text-custom-secondary focus:outline-none`}
                            >
                                <img src={item.logo} alt="" className="h-8 md:h-10" />
                                <div className={'w-56'}>
                                    <h3 className="font-medium md:font-normal">{item.name}</h3>
                                    <div className="text-gray-400 text-xs hidden md:inline-block">{item.count} Courses</div>
                                </div>
                            </Tab>
                        );
                    })}
                </TabList>

                <div
                    className={`${
                        clickedTab ? 'block' : 'hidden md:block'
                    } w-full md:relative min-h-3/4 bg-white absolute bg-white top-0 h-full md:h-auto`}
                >
                    {props.data.map((item, i) => {
                        return (
                            <TabPanel className="opacity-0" selectedClassName="opacity-100 bg-white" key={i}>
                                <div className="md:px-10 col-count-1 col-w-sm w-full md:space-y-3 col-gap-sm md:pb-0">
                                    {item.children.nodes.map((child, i) => {
                                        return (
                                            <Link href="/">
                                                <a
                                                    className="text-base font-medium md:font-light hover:text-custom-secondary block py-4 border-b border-gray-400 md:border-0 md:py-0 px-5 md:px-0"
                                                    key={i}
                                                >
                                                    {child.name}
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </TabPanel>
                        );
                    })}
                </div>
            </Tabs>
        </>
    );
};

export default CategoryMenu;
