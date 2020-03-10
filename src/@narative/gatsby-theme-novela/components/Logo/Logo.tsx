import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

import { Icon } from "@types";

const Logo: Icon = ({ fill = "white" }) => {
    return (
        <LogoContainer>
            <svg
                height="75"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="Logo__Desktop"
            >
                <g>
                    <path
                        d="M84,5H16C9.9,5,5,9.6,5,15.3V67c0,5.7,4.9,10.3,11,10.3h7.2v15.3c0,0.9,0.6,1.8,1.5,2.2c0.4,0.2,0.7,0.2,1.1,0.2   c0.6,0,1.2-0.2,1.7-0.5l22.7-17.2H84c6.1,0,11-4.6,11-10.3V15.3C95,9.6,90.1,5,84,5z M89.9,66.9c0,3-2.6,5.4-5.8,5.4H49.2   c-0.6,0-1.2,0.2-1.7,0.5L28.4,87.3V74.7c0-1.3-1.2-2.4-2.6-2.4h-9.8c-3.2,0-5.8-2.4-5.8-5.4V15.5c0-3,2.6-5.4,5.8-5.4h68.2   c3.2,0,5.8,2.4,5.8,5.4V66.9z"
                        fill={fill}
                    />
                    <path
                        d="M35.6,49.3l-5.3-23h-8.9v29.2h5.7V35.7c0-0.6,0-1.4,0-2.4c0-1,0-1.8,0-2.4l5.5,24.5h5.9L44,31c0,0.6,0,1.3,0,2.4   c0,1,0,1.8,0,2.4v19.7h5.7V26.3h-8.8L35.6,49.3z"
                        fill={fill}
                    />
                    <polygon
                        points="72.7,37.4 61.4,37.4 61.4,26.3 55.3,26.3 55.3,55.5 61.4,55.5 61.4,42.5 72.7,42.5 72.7,55.5 78.8,55.5 78.8,26.3    72.7,26.3  "
                        fill={fill}
                    />
                </g>
            </svg>
        </LogoContainer>
    );
};

export default Logo;

const LogoContainer = styled.div`
    .Logo__Mobile {
        display: none;
    }

    ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }
    
    .Logo__Mobile{
      display: block;
    }
  `}
`;
