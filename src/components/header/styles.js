import styled from 'styled-components';
import tw from 'tailwind.macro';

export const ContainerNavStyle = styled.div`
    .menuMobile {
        ${tw`hidden md:block`}
    }

    &.openNav {
        ${tw`overflow-hidden`}

        .menuMobile {
            &.open {
                ${tw`fixed block`}
                transition: left .3s ease-out;
            }
        }
    }
`;
