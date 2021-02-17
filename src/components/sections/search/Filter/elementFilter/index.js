import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ElementFilter = (props) => {
  const [datas, setDatas] = React.useState([]);
  const [queryData, setQueryData] = React.useState([]);
  const [showCount, setShowCount] = React.useState(0);

  Array.prototype.inArray = function (comparer) {
    for (let i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true;
    }
    return false;
  };

  Array.prototype.pushIfNotExist = function (element, comparer) {
    if (!this.inArray(comparer)) {
      this.push(element);
    }
  };

  React.useEffect(() => {
    setDatas(props.data);
    if (props.showCount && props.showCount > 0) {
      setShowCount(props.showCount);
    } else {
      setShowCount(props.data.length);
    }
  }, [props.data]);

  const onSelect = (include, slug) => {
    let oldValue = queryData;

    if (!include) {
      oldValue.pushIfNotExist(slug, function (e) {
        return e === slug;
      });
    } else {
      const index = oldValue.indexOf(slug);
      if (index !== -1) {
        oldValue.splice(index, 1);
      }
    }
    setQueryData(oldValue);

    if (props.onChange) props.onChange(oldValue);
  };

  const onClickShowMore = () => {
    if (showCount === datas.length) {
      setShowCount(props.showCount);
    } else {
      setShowCount(datas.length);
    }
  };

  return (
    <div className="flex flex-col text-lg font-light space-y-1">
      {datas.slice(0, showCount).map((data, index) => (
        <label className="inline-flex items-center cursor-pointer" key={index}>
          <input
            type="checkbox"
            value={data.slug}
            defaultChecked={queryData.includes(data.slug)}
            onChange={() => onSelect(queryData.includes(data.slug), data.slug)}
            className="rounded border-gray-300 shadow-sm focus:border-0 focus:ring-0"
          />
          <span className="ml-2">
            {data.name} <span className="text-sm text-gray-400">({data.count})</span>
          </span>
        </label>
      ))}

      {props.showCount && (
        <div
          className="mt-5 font-medium underline flex items-center cursor-pointer text-custom-primary"
          onClick={onClickShowMore}
        >
          <span className={'mr-4'}>
            {' '}
            {showCount === datas?.length
              ? 'Less More'
              : 'See ' + (datas.length - showCount) + ' More'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ElementFilter;
