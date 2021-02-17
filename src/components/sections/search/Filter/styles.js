import styled from 'styled-components';
import tw from 'tailwind.macro';

export const ContainerFilter = styled.div`
    ${tw`md:relative md:h-auto fixed md:block bg-custom-menu top-0 w-full md:z-0`}
    z-index: 20000;

    &.isMobile {
        left: -100%;
        transition: left 0.3s ease-in;

        &.open {
            ${tw`overflow-y-auto h-screen left-0`}
            transition: left .3s ease-out;
        }
    }
`;
