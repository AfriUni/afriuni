import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import ComposeFilter from './composeFilter';
import Link from 'next/link';
import ElementFilter from './elementFilter';
import { useMediaQuery } from 'react-responsive';
import { ContainerFilter } from './styles';
import { ButtonRedPrimary } from '../../../styleComponent/button';

const FilterSection = props => {
    const [specialisationData, setSpecialisationData] = React.useState([]);
    const [degreeTypeData, setDegreeTypeData] = React.useState([]);
    const [countriesData, setCountriesData] = React.useState([]);
    const [admissionData, setAdmissionData] = React.useState([]);
    const [durationData, setDurationData] = React.useState([]);
    const [tuitionData, setTuitionData] = React.useState([]);
    const [attendanceData, setAttendanceData] = React.useState([]);
    const [languageData, setLanguageData] = React.useState([]);
    const [deliveryDara, setDeliveryData] = React.useState([]);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

    React.useEffect(() => {
        setIsCurrentMobile(isMobile);
    }, [isMobile]);

    React.useEffect(() => {
        const specialisation = [
            {
                slug: 'engenierie',
                name: 'Engenierie',
                count: 200,
                children: [
                    {
                        slug: 'children-one',
                        name: 'Children one',
                    },
                    {
                        slug: 'children-one2',
                        name: 'Children one',
                    },
                    {
                        slug: 'children-one3',
                        name: 'Children one',
                    },
                    {
                        slug: 'children-one4',
                        name: 'Children one',
                    },
                    {
                        slug: 'children-one5',
                        name: 'Children one',
                    },
                ],
            },
            {
                slug: 'journalism-media',
                name: 'Journalism & Media',
                count: 196,
                children: [
                    {
                        slug: 'children-two',
                        name: 'Children two',
                    },
                    {
                        slug: 'children-two2',
                        name: 'Children two',
                    },
                    {
                        slug: 'children-two3',
                        name: 'Children two',
                    },
                    {
                        slug: 'children-two4',
                        name: 'Children two',
                    },
                    {
                        slug: 'children-two5',
                        name: 'Children two',
                    },
                ],
            },
            {
                slug: 'agriculture-forestry',
                name: 'Agriculture & Forestry',
                count: 300,
                children: [
                    {
                        slug: 'children-three',
                        name: 'Children three',
                    },
                    {
                        slug: 'children-three2',
                        name: 'Children three',
                    },
                    {
                        slug: 'children-three3',
                        name: 'Children three',
                    },
                    {
                        slug: 'children-three4',
                        name: 'Children three',
                    },
                    {
                        slug: 'children-three5',
                        name: 'Children three',
                    },
                ],
            },
            {
                slug: 'business-management',
                name: 'Business & management',
                count: 99,
                children: [
                    {
                        slug: 'children-foor',
                        name: 'Children foor',
                    },
                    {
                        slug: 'children-foor2',
                        name: 'Children foor',
                    },
                    {
                        slug: 'children-foor3',
                        name: 'Children foor',
                    },
                    {
                        slug: 'children-foor4',
                        name: 'Children foor',
                    },
                    {
                        slug: 'children-foor5',
                        name: 'Children foor',
                    },
                ],
            },
        ];
        setSpecialisationData(specialisation);

        const degreeType = [
            {
                slug: 'engenierie',
                name: 'Diploma/Certificat',
                count: 200,
            },
            {
                slug: 'journalism-media',
                name: 'Master Degree',
                count: 196,
            },
            {
                slug: 'agriculture-forestry',
                name: 'Bachelors Degree',
                count: 300,
            },
            {
                slug: 'business-management',
                name: 'phD/Doctorate',
                count: 99,
            },
        ];
        setDegreeTypeData(degreeType);

        const countries = [
            {
                slug: 'engenierie',
                name: 'Cameroon',
                count: 200,
                children: [
                    {
                        slug: 'douala',
                        name: 'Douala',
                    },
                    {
                        slug: 'yaounde',
                        name: 'Yaounde',
                    },
                    {
                        slug: 'bertoua',
                        name: 'Bertoua',
                    },
                ],
            },
            {
                slug: 'journalism-media',
                name: 'South Africa',
                count: 196,
                children: [
                    {
                        slug: 'ville11',
                        name: 'town one',
                    },
                    {
                        slug: 'ville21',
                        name: 'town two',
                    },
                    {
                        slug: 'ville31',
                        name: 'town three',
                    },
                ],
            },
            {
                slug: 'agriculture-forestry',
                name: 'Ghana',
                count: 300,
                children: [
                    {
                        slug: 'ville12',
                        name: 'town one 2',
                    },
                    {
                        slug: 'ville22',
                        name: 'town two 2',
                    },
                    {
                        slug: 'ville32',
                        name: 'town three 2',
                    },
                ],
            },
            {
                slug: 'business-management',
                name: 'Kenya',
                count: 99,
                children: [
                    {
                        slug: 'ville13',
                        name: 'town one 3',
                    },
                    {
                        slug: 'ville23',
                        name: 'town two 3',
                    },
                    {
                        slug: 'ville33',
                        name: 'town three 3',
                    },
                ],
            },
        ];
        setCountriesData(countries);

        const admission = [
            {
                slug: 'admission-open',
                name: 'Admissions open',
                count: 10,
            },
            {
                slug: 'admission-starting-soon',
                name: 'Admissions starting soon',
                count: 41,
            },
            {
                slug: 'admission-open-all-year',
                name: 'Admissions open all year',
                count: 50,
            },
        ];
        setAdmissionData(admission);

        const duration = [
            {
                slug: '1',
                name: '1 year',
                count: 17,
            },
            {
                slug: '2',
                name: '2 years',
                count: 29,
            },
            {
                slug: '3',
                name: '3 years',
                count: 170,
            },
        ];
        setDurationData(duration);

        const tuition = [
            {
                slug: '0 - 500',
                name: '0 - 500',
                count: 'USD',
            },
        ];

        setTuitionData(tuition);

        const attendance = [
            {
                slug: 'full-time',
                name: 'Full-time',
                count: 147,
            },
            {
                slug: 'part-time',
                name: 'Part-time',
                count: 147,
            },
        ];
        setAttendanceData(attendance);

        const language = [
            {
                slug: 'french',
                name: 'French',
                count: 30,
            },
            {
                slug: 'English',
                name: 'English',
                count: 30,
            },
        ];
        setLanguageData(language);

        const delivery = [
            {
                slug: 'on-campus',
                name: 'On Campus',
                count: 149,
            },
            {
                slug: 'distance-learning',
                name: 'Distance Learning',
                count: 149,
            },
            {
                slug: 'campus-online',
                name: 'Campus & Online (combined)',
                count: 149,
            },
        ];
        setDeliveryData(delivery);
    }, []);

    const onCloseFilter = () => {
        if (props.toggleFilter) props.toggleFilter();
    };

    return (
        <ContainerFilter className={`${isCurrentMobile ? 'isMobile' : ''} ${props.openFilter ? 'open' : ''}`}>
            <div className="relative h-auto md:h-full w-full">
                <div className="bg-white shadow-md w-full z-10 flex items-center justify-between px-6 py-3 font-normal md:hidden sticky top-0">
                    <div className="text-sm text-gray-400">Reset</div>
                    <div className="text-xl">Filtres</div>
                    <div onClick={onCloseFilter} className="cursor-pointer">
                        <FontAwesomeIcon icon={faTimes} className="w-3" />
                    </div>
                </div>

                <div className="px-2 md:px-0 pt-3 md:pt-0">
                    <Accordion allowZeroExpanded allowMultipleExpanded preExpanded={[0, 1, 2, 3, 4, 5, 6, 7, 8]} className="border-0">
                        <AccordionItem uuid={0} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Specialisation</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 md:pb-5 py-5 bg-white">
                                <ComposeFilter data={specialisationData} backTitle={'All Fields of Study'} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={1} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Degree Type</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ElementFilter data={degreeTypeData} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={2} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Countries</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ComposeFilter data={countriesData} backTitle={'Select others countries'} multiData={true} showCount={3} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={4} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Admissions</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ElementFilter data={admissionData} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={2} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Duration</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ElementFilter data={durationData} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={2} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Tuitions Fees</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 md:py-5 pb-5 bg-white">
                                <ElementFilter data={tuitionData} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={2} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Attendance</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ElementFilter data={attendanceData} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={2} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Language of Study</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ElementFilter data={languageData} />
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid={2} className="mb-5 bg-white border border-gray-200 outline-none">
                            <AccordionItemHeading>
                                <AccordionItemButton className="bg-white pl-6 flex justify-between items-center outline-none border-b md:border-0">
                                    <div className="font-normal text-xl text-red-500">Delivery Mode</div>
                                    <div className="px-6 md:py-4 py-3 md:w-1/5 w-auto flex justify-center">
                                        <AccordionItemState>
                                            {({ expanded }) =>
                                                expanded ? (
                                                    <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronLeft} className="w-3 text-base" />
                                                )
                                            }
                                        </AccordionItemState>
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-8 py-5 md:pb-5 bg-white">
                                <ElementFilter data={deliveryDara} />
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className={`p-4 w-full bg-white z-10 md:hidden sticky bottom-0 shadow-md`}>
                    <ButtonRedPrimary className="rounded-xl w-full">Show results</ButtonRedPrimary>
                </div>
            </div>
        </ContainerFilter>
    );
};

export default FilterSection;
