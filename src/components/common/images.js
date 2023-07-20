import React from "react";

export const DashboardIcon = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke={fill}
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      <path d="M8.75 3.75h-5V10h5V3.75zm7.5 0h-5V7.5h5V3.75zm-7.5 8.75h-5v3.75h5V12.5zm7.5-2.5h-5v6.25h5V10z" />
    </svg>
  );
};

export const ServiceIcon = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
      <g stroke={fill} strokeWidth="1.2">
        <path d="M15.395 11.248l-.369-.924-.654-1.639c-.561-1.407-1.901-2.316-3.413-2.316H6.792c-1.512 0-2.851.909-3.413 2.316l-.654 1.639-.369.924A2.1 2.1 0 0 0 1 13.211v1.579a2.09 2.09 0 0 0 .525 1.379v1.779A1.05 1.05 0 0 0 2.575 19h1.05a1.05 1.05 0 0 0 1.05-1.053v-1.053h8.401v1.053A1.05 1.05 0 0 0 14.127 19h1.05a1.05 1.05 0 0 0 1.05-1.053v-1.779a2.09 2.09 0 0 0 .525-1.379v-1.579a2.1 2.1 0 0 0-1.357-1.963zM5.329 9.466c.239-.599.818-.992 1.463-.992h4.168c.644 0 1.223.393 1.463.992l.654 1.639H4.675l.654-1.639zm-1.704 5.317c-.63 0-1.05-.42-1.05-1.049s.42-1.049 1.05-1.049 1.575.944 1.575 1.574-.945.525-1.575.525zm10.501 0c-.63 0-1.575.105-1.575-.525s.945-1.574 1.575-1.574 1.05.42 1.05 1.049-.42 1.049-1.05 1.049z" />
        <path d="M18.5 19V5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g clip-path="url(#A)">
        <path
          d="M20.464.375h-3.929A.55.55 0 0 0 16 .938v4.125a.55.55 0 0 0 .536.563h3.929A.55.55 0 0 0 21 5.063V.938a.55.55 0 0 0-.536-.562zM18.679 3.75h-.536v.563c0 .103-.08.188-.179.188h-.357c-.098 0-.178-.084-.178-.187V1.688c0-.103.08-.187.178-.187h1.072c.59 0 1.071.505 1.071 1.125s-.481 1.125-1.071 1.125zm0-1.5h-.536V3h.536c.196 0 .357-.169.357-.375s-.161-.375-.357-.375z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="A">
          <path fill="#fff" transform="translate(16)" d="M0 0h5v6H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SubscriptionIcon = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
      <path
        d="M2.5 9.167v4c0 .933 0 1.4.182 1.756.16.314.415.569.728.729.356.181.823.181 1.754.181h9.672c.932 0 1.397 0 1.754-.181a1.67 1.67 0 0 0 .729-.729c.181-.356.181-.822.181-1.754V9.167m-15 0V7.5m0 1.667h15M2.5 7.5v-.667c0-.933 0-1.4.182-1.757.16-.314.415-.568.728-.728.357-.182.824-.182 1.757-.182h9.667c.933 0 1.399 0 1.756.182a1.67 1.67 0 0 1 .729.728c.181.356.181.823.181 1.754V7.5m-15 0h15m-11.667 5h3.333M17.5 9.167V7.5"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HistoryIcon = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
      <path
        d="M6.667 7.5L10 10l3.333-1.667M10 17.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 1 1 0 15z"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HelpIcon = ({ fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
      <path
        d="M7.622 7.561a2.5 2.5 0 0 1 1.986-1.697 2.5 2.5 0 0 1 2.414.999 2.5 2.5 0 0 1 .205 2.605A2.5 2.5 0 0 1 10 10.833v.834m0 5.833a7.5 7.5 0 1 1 0-15 7.5 7.5 0 1 1 0 15zm.041-3.333v.083h-.083v-.083h.083z"
        stroke={fill}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LogoutIcon = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke={fill}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3.75v5.938m3.75-5.454a6.88 6.88 0 0 1 2.702 3.387c.512 1.39.561 2.91.139 4.331a6.88 6.88 0 0 1-2.479 3.554A6.87 6.87 0 0 1 10 16.871a6.88 6.88 0 0 1-4.112-1.365c-1.188-.886-2.057-2.133-2.479-3.554s-.373-2.94.139-4.331 1.46-2.579 2.702-3.387" />
    </svg>
  );
};
