import React from 'react';
import Link from 'next/link';
import HomeFeaturedUniversityCard from '../../../cards/homeFeaturedUniversityCard';

const FeaturedUniversitySection = props => {
    const [data, setData] = React.useState([]);
    const [priority, setPriority] = React.useState([]);

    React.useEffect(() => {
        const results = props.data.universitiesFeatured.nodes;
        const datas = [];

        results.map((item, i) => {
            const lists = item.featured_list.nodes;

            let end_date = item.end_date;
            let show = true;
            if (end_date) {
                end_date = convertDate(end_date);
                const today = new Date();
                if (today > end_date) show = false;
            }

            if (show) {
                lists.map((subitem, i) => {
                    if (datas.length < 4) {
                        datas.push(subitem);
                    }
                });
            }
        });

        setData(datas);
    }, [props.data]);

    const convertDate = date => {
        const dateParts = date.split('/');
        return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    };

    return (
        <div className="pt-6 md:pt-14 pb-6 md:pb-14 bg-white transform skew-y-3 relative">
            <div className="bg-white h-24 absolute bottom-0 right-0 left-0 transform -skew-y-3 translate-y-3 md:translate-y-12 z-0" />

            <div className="container mx-auto px-4 transform -skew-y-3">
                <h3 className="text-center md:text-left text-2xl md:text-5xl font-medium text-custom-primary_2 mt-5 md:mb-10">
                    Featured Universities
                </h3>

                <div className="mt-5 md:mt-10 grid md:grid-cols-4 grid-cols-2 gap-x-6 gap-y-3 md:gap-y-6 grid-flow-row auto-rows-fr auto-cols-fr">
                    {data.map((item, i) => {
                        return <HomeFeaturedUniversityCard data={item} key={i} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeaturedUniversitySection;
