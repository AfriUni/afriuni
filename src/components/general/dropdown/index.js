import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";


const Dropdown = ({ title, className = '', classDropdown = '', classChevron = '', position = 'right', children, maxHeight = "", onChange}) => {

    const [initPosition, setInitPosition] = React.useState('origin-top-right right-0');
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentTitle, setCurrentTitle] = React.useState(title);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const container = React.useRef('');

    const childrenElement = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
            index,
            isActive: currentIndex === index,
            onChangeTitle: (e, href, title, value) => {
                if(href === '#') e.preventDefault();
                setCurrentTitle(title);
                setCurrentIndex(index);
                setIsOpen(false);
                if(onChange) onChange(value);
            }
        });
    });

    React.useEffect(() => {

        if(position === 'right') setInitPosition("origin-top-right right-0 ");
        if(position === 'left') setInitPosition("origin-top-left left-0");
        if(position === 'center') setInitPosition('origin-center left-0 right-0')

    }, [position]);

    const openDropdown = () => {
        setIsOpen(!isOpen);
    };


    React.useEffect(() => {

        window.addEventListener('click', addBackDrop);

        return () => {
            window.removeEventListener('click', addBackDrop);
        }

    }, [isOpen]);

    const addBackDrop = e => {

        const currentClick = e.target;

        if(container.current !== null) {

            const checkContainer = container.current.contains(currentClick);
            if(container && !checkContainer) {
                setIsOpen(false);
            }
        }

    };

    return <div className="relative" ref={container}>

        <div className={className} onClick={openDropdown}>
            <span>{currentTitle}</span> <div className={classChevron}><FontAwesomeIcon icon={faChevronDown} className="h-3 w-3"/></div>
        </div>

        {isOpen && (
            <div className={`absolute z-20 ${initPosition} ${classDropdown}`}>
                <div className="rounded-md bg-white shadow-xs">
                    <div className="py-1 overflow-y-auto" style={{maxHeight: maxHeight}} role="menu" aria-orientation="vertical"
                         aria-labelledby="options-menu">
                        {childrenElement}
                    </div>
                </div>
            </div>
        )}

    </div>
};

export default Dropdown;

export const ItemDropdown = ({
     index,
     onChangeTitle,
     href = '#',
     className = 'text-sm hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900',
     classActive = 'bg-gray-100 text-gray-900',
     classInactive = 'text-gray-700',
     children,
     title,
     value,
     isActive
}) => {

    return <a href={href} className={`block px-4 py-2 leading-5 focus:outline-none ${className} ${classInactive} ${isActive ? classActive : ""}`} role="menuitem" onClick={(e) => onChangeTitle(e, href, title, value)}>
        {children}
    </a>

};


