import React from 'react';

export default function SearchIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 73 66">
            <defs>
                <style>
                    {`.cls-1-search {
                        fill: url(#patternSearch);
                    }`}
                </style>
                <pattern id="patternSearch" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 52 48">
                    <image
                        width="52"
                        height="48"
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAwCAMAAABpN6nPAAAAQlBMVEUIfqUIfqUIfqUIfqVHcEwIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqUIfqV6lrURAAAAFXRSTlPxlqXBAAk3/PYVjOaESdvNsylVanrmSx7vAAAB1UlEQVR42r3W4Y6kIBAE4FIGukEQdKbe/1VvcCcxO0vveZvLdmL8gZ80JSTi9oPC/0CxPPKjhH9AMS0KkoC0cg35WZVUACAFa7iAgioh872Usk8rSJ3+ihKoy/4x5fPaGqjVG+g0+PzmDSJd2WgDkd+GfFVt3yAP4uu6/UpkG02C0aqjULyFPIlhHxMkWSgJ8jgnJSy0UMem913GKCqbgQIkjdEOvd+MEroxuiuKhRZijB5E2Ay2Ug0kCEAxEIz2gB24G+2tYxQgOc1D480gvLAaOexm5LdK9dGFAZqJYKAMnRqXr8NRuZq7HNQAMr6PNkE2UYa4CXzvP4PrNye3is4ziLr7T80h3EKLBoqgzklJCKr7mHBTkpJBbmPU36rr5lTI14mcQFQQFCKNUFeLEK5MbgGm2zZBiXTIfs1jdPMNJFhdyg4Qav9CtT+flWh+gHoFB+GrINPzsQIiHiuWNQ5RZ2nVXkvbX5tcZOlqVSIaqFeM0Z89Oz3C802p2UK9nuasGUQ672/IqgRiPu/X0BGee86+CdX5C+j88D2OpcdyDZ3hxaqsF1EPEUd4vgnKRXSGVxZ5GMgIUecyK/br6AiPUC7Gmsw4QFjp2VXy/qN/o19GfwC/pDL37LdWCwAAAABJRU5ErkJggg=="
                    />
                </pattern>
            </defs>
            <rect id="NoPath" className="cls-1-search" width="73" height="66" />
        </svg>
    );
}
