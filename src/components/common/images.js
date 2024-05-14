export const UserIcon = ({ fill, stroke = "white" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12.6666C12 11.1939 10.2091 9.99996 8 9.99996C5.79086 9.99996 4 11.1939 4 12.6666M8 7.99996C6.52724 7.99996 5.33333 6.80605 5.33333 5.33329C5.33333 3.86053 6.52724 2.66663 8 2.66663C9.47276 2.66663 10.6667 3.86053 10.6667 5.33329C10.6667 6.80605 9.47276 7.99996 8 7.99996Z"
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Add = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 10H10M10 10H15M10 10V15M10 10V5"
        stroke={fill}
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const AdminDashboardIcon = ({ fill, stroke = "white" }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3H4C3.44772 3 3 3.44772 3 4V7C3 7.55228 3.44772 8 4 8H6C6.55228 8 7 7.55228 7 7V4C7 3.44772 6.55228 3 6 3Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M12 3H10C9.44772 3 9 3.44772 9 4V5C9 5.55228 9.44772 6 10 6H12C12.5523 6 13 5.55228 13 5V4C13 3.44772 12.5523 3 12 3Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M6 10H4C3.44772 10 3 10.4477 3 11V12C3 12.5523 3.44772 13 4 13H6C6.55228 13 7 12.5523 7 12V11C7 10.4477 6.55228 10 6 10Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M12 8H10C9.44772 8 9 8.44772 9 9V12C9 12.5523 9.44772 13 10 13H12C12.5523 13 13 12.5523 13 12V9C13 8.44772 12.5523 8 12 8Z"
        stroke={stroke}
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const StaffProfileIcon = ({ fill }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.3333 14.7667C11.3333 12.9258 9.84095 11.4334 8 11.4334C6.15905 11.4334 4.66667 12.9258 4.66667 14.7667M11.3333 14.7667H11.8687C12.614 14.7667 12.9867 14.7667 13.2716 14.6215C13.5225 14.4937 13.727 14.2892 13.8548 14.0383C14 13.7534 14 13.3807 14 12.6355V4.898C14 4.15272 14 3.77952 13.8548 3.49459C13.727 3.24371 13.5225 3.03988 13.2716 2.91205C12.9864 2.76672 12.6135 2.76672 11.8668 2.76672H4.13346C3.38673 2.76672 3.01308 2.76672 2.72786 2.91205C2.47698 3.03988 2.27316 3.24371 2.14532 3.49459C2 3.7798 2 4.15345 2 4.90019V12.6335C2 13.3803 2 13.7531 2.14532 14.0383C2.27316 14.2892 2.47698 14.4937 2.72786 14.6215C3.0128 14.7667 3.386 14.7667 4.13127 14.7667H4.66667M11.3333 14.7667H4.66667M8 9.43339C6.89543 9.43339 6 8.53796 6 7.43339C6 6.32882 6.89543 5.43339 8 5.43339C9.10457 5.43339 10 6.32882 10 7.43339C10 8.53796 9.10457 9.43339 8 9.43339Z"
      stroke={fill}
    />
  </svg>
);

export const AdminLoanIcon = ({ fill }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.33398 2.76672H9.66732C9.93253 2.76672 10.1869 2.87208 10.3744 3.05962C10.562 3.24715 10.6673 3.50151 10.6673 3.76672C10.6673 4.38556 10.4215 4.97905 9.9839 5.41664C9.54631 5.85422 8.95282 6.10006 8.33398 6.10006H7.66732C7.04848 6.10006 6.45499 5.85422 6.0174 5.41664C5.57982 4.97905 5.33398 4.38556 5.33398 3.76672C5.33398 3.50151 5.43934 3.24715 5.62688 3.05962C5.81441 2.87208 6.06877 2.76672 6.33398 2.76672Z"
      stroke={fill}
    />
    <path
      d="M2.66699 12.1001V11.4334C2.66699 10.0189 3.2289 8.66239 4.22909 7.66219C5.22928 6.662 6.58584 6.1001 8.00032 6.1001C9.41481 6.1001 10.7714 6.662 11.7716 7.66219C12.7718 8.66239 13.3337 10.0189 13.3337 11.4334V12.1001C13.3337 12.8073 13.0527 13.4856 12.5526 13.9857C12.0525 14.4858 11.3742 14.7668 10.667 14.7668H5.33366C4.62641 14.7668 3.94814 14.4858 3.44804 13.9857C2.94794 13.4856 2.66699 12.8073 2.66699 12.1001Z"
      stroke={fill}
    />
  </svg>
);

export const LeaveMgtIcon = ({ fill }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 5.43339V8.76672H11.3333M8 14.7667C4.68629 14.7667 2 12.0804 2 8.76672C2 5.45302 4.68629 2.76672 8 2.76672C11.3137 2.76672 14 5.45302 14 8.76672C14 12.0804 11.3137 14.7667 8 14.7667Z"
      stroke={fill}
    />
  </svg>
);

export const AdminMedicalIcon = ({ fill }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.99967 12.1001H9.99967M5.99967 10.1001H9.99967M8.66659 2.7673C8.6029 2.76672 8.53126 2.76672 8.44948 2.76672H5.46647C4.71973 2.76672 4.34609 2.76672 4.06087 2.91205C3.80999 3.03988 3.60616 3.24371 3.47833 3.49459C3.33301 3.7798 3.33301 4.15345 3.33301 4.90019V12.6335C3.33301 13.3803 3.33301 13.7534 3.47833 14.0386C3.60616 14.2895 3.80999 14.4937 4.06087 14.6215C4.34581 14.7667 4.71901 14.7667 5.4643 14.7667L10.5351 14.7667C11.2803 14.7667 11.653 14.7667 11.9379 14.6215C12.1888 14.4937 12.3933 14.2895 12.5212 14.0386C12.6663 13.7537 12.6663 13.3811 12.6663 12.6358V6.98385C12.6663 6.90207 12.6663 6.83041 12.6657 6.76672M8.66659 2.7673C8.8569 2.76904 8.97682 2.7761 9.09179 2.8037C9.22784 2.83637 9.35824 2.89023 9.47754 2.96334C9.61205 3.04577 9.72755 3.16127 9.95801 3.39172L12.0417 5.47538C12.2723 5.70598 12.3869 5.82096 12.4694 5.95552C12.5425 6.07482 12.5966 6.20489 12.6292 6.34094C12.6568 6.45591 12.664 6.57642 12.6657 6.76672M8.66659 2.7673L8.66634 4.63353C8.66634 5.38027 8.66634 5.75349 8.81167 6.03871C8.9395 6.28959 9.14332 6.49371 9.39421 6.62154C9.67914 6.76672 10.0523 6.76672 10.7976 6.76672H12.6657"
      stroke={fill}
    />
  </svg>
);

export const StaffScheduleIcon = ({ fill }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 5.43339V8.76672H11.3333M8 14.7667C4.68629 14.7667 2 12.0804 2 8.76672C2 5.45302 4.68629 2.76672 8 2.76672C11.3137 2.76672 14 5.45302 14 8.76672C14 12.0804 11.3137 14.7667 8 14.7667Z"
      stroke={fill}
    />
  </svg>
);

export const LogoutIcon = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <path
          d="M12.1797 14.62L14.7397 12.06L12.1797 9.5"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 12.0596H14.67"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M12.5 4C16.92 4 20.5 7 20.5 12C20.5 17 16.92 20 12.5 20"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DashboardIcon = ({ fill }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 10.9V4.1C22.5 2.6 21.86 2 20.27 2H16.23C14.64 2 14 2.6 14 4.1V10.9C14 12.4 14.64 13 16.23 13H20.27C21.86 13 22.5 12.4 22.5 10.9Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M22.5 19.9V18.1C22.5 16.6 21.86 16 20.27 16H16.23C14.64 16 14 16.6 14 18.1V19.9C14 21.4 14.64 22 16.23 22H20.27C21.86 22 22.5 21.4 22.5 19.9Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M11 4.1V5.9C11 7.4 10.36 8 8.77 8H4.73C3.14 8 2.5 7.4 2.5 5.9V4.1C2.5 2.6 3.14 2 4.73 2H8.77C10.36 2 11 2.6 11 4.1Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ProfileIcon = ({ fill }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 12C15.2614 12 17.5 9.76142 17.5 7C17.5 4.23858 15.2614 2 12.5 2C9.73858 2 7.5 4.23858 7.5 7C7.5 9.76142 9.73858 12 12.5 12Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M21.0899 22C21.0899 18.13 17.2399 15 12.4999 15C7.75991 15 3.90991 18.13 3.90991 22"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ScheduleIcon = ({ fill }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.1599 10.4395L21.1799 14.6195C20.3399 18.2295 18.6799 19.6895 15.5599 19.3895C15.0599 19.3495 14.5199 19.2595 13.9399 19.1195L12.2599 18.7195C8.08994 17.7295 6.79994 15.6695 7.77994 11.4895L8.75994 7.29952C8.95994 6.44952 9.19994 5.70952 9.49994 5.09952C10.6699 2.67952 12.6599 2.02952 15.9999 2.81952L17.6699 3.20952C21.8599 4.18952 23.1399 6.25952 22.1599 10.4395Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M15.5601 19.3896C14.9401 19.8096 14.1601 20.1596 13.2101 20.4696L11.6301 20.9896C7.6601 22.2696 5.5701 21.1996 4.2801 17.2296L3.0001 13.2796C1.7201 9.30961 2.7801 7.20961 6.7501 5.92961L8.3301 5.40961C8.7401 5.27961 9.1301 5.16961 9.5001 5.09961C9.2001 5.70961 8.9601 6.44961 8.7601 7.29961L7.7801 11.4896C6.8001 15.6696 8.0901 17.7296 12.2601 18.7196L13.9401 19.1196C14.5201 19.2596 15.0601 19.3496 15.5601 19.3896Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M13.1399 8.53027L17.9899 9.76027"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M12.1599 12.4004L15.0599 13.1404"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LoanIcon = ({ fill }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <path
          d="M14.7617 15.4385H9.76172"
          stroke={fill}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2617 12.998V17.998"
          stroke={fill}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M13.16 2.51814L13.13 2.58814L10.23 9.31814H7.37996C6.69996 9.31814 6.04996 9.45814 5.45996 9.70814L7.20996 5.52814L7.24996 5.42814L7.31996 5.26814C7.33996 5.20814 7.35996 5.14814 7.38996 5.09814C8.69996 2.06814 10.18 1.37814 13.16 2.51814Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.55 9.51856C18.1 9.37856 17.62 9.31855 17.14 9.31855H10.23L13.13 2.58855L13.16 2.51855C13.31 2.56855 13.45 2.63855 13.6 2.69855L15.81 3.62855C17.04 4.13855 17.9 4.66855 18.42 5.30855C18.52 5.42855 18.6 5.53855 18.67 5.66855C18.76 5.80855 18.83 5.94855 18.87 6.09855C18.91 6.18855 18.94 6.27855 18.96 6.35855C19.23 7.19855 19.07 8.22856 18.55 9.51856Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.0217 14.1984V16.1484C22.0217 16.3484 22.0117 16.5484 22.0017 16.7484C21.8117 20.2384 19.8617 21.9984 16.1617 21.9984H8.36172C8.12172 21.9984 7.88172 21.9784 7.65172 21.9484C4.47172 21.7384 2.77172 20.0384 2.56172 16.8584C2.53172 16.6284 2.51172 16.3884 2.51172 16.1484V14.1984C2.51172 12.1884 3.73172 10.4584 5.47172 9.70836C6.07172 9.45836 6.71172 9.31836 7.39172 9.31836H17.1517C17.6417 9.31836 18.1217 9.38836 18.5617 9.51836C20.5517 10.1284 22.0217 11.9884 22.0217 14.1984Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M7.21 5.52832L5.46 9.70832C3.72 10.4583 2.5 12.1883 2.5 14.1983V11.2683C2.5 8.42832 4.52 6.05832 7.21 5.52832Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M22.0186 11.2677V14.1977C22.0186 11.9977 20.5586 10.1277 18.5586 9.52766C19.0786 8.22766 19.2286 7.20766 18.9786 6.35766C18.9586 6.26766 18.9286 6.17766 18.8886 6.09766C20.7486 7.05766 22.0186 9.02766 22.0186 11.2677Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LeaveIcon = ({ fill }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 12C15.2614 12 17.5 9.76142 17.5 7C17.5 4.23858 15.2614 2 12.5 2C9.73858 2 7.5 4.23858 7.5 7C7.5 9.76142 9.73858 12 12.5 12Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7101 15.74L16.17 19.2801C16.03 19.4201 15.9 19.68 15.87 19.87L15.68 21.22C15.61 21.71 15.95 22.05 16.44 21.98L17.79 21.79C17.98 21.76 18.25 21.63 18.38 21.49L21.92 17.95C22.53 17.34 22.82 16.63 21.92 15.73C21.03 14.84 20.3201 15.13 19.7101 15.74Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.2002 16.25C19.5002 17.33 20.3402 18.17 21.4202 18.47"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M3.90991 22C3.90991 18.13 7.75994 15 12.4999 15C13.5399 15 14.5399 15.15 15.4699 15.43"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MedicalIcon = ({ fill }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 15V9C22.5 4 20.5 2 15.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M17.5 16.75H14.4L16.02 14.96C16.82 14.07 17.26 12.94 17.26 11.78C17.26 10.58 16.76 9.43002 15.87 8.58002C14.98 7.73002 13.77 7.25 12.5 7.25C11.24 7.25 10.03 7.73002 9.13 8.58002C8.24 9.43002 7.73999 10.58 7.73999 11.78C7.73999 12.95 8.17998 14.08 8.97998 14.96L10.6 16.75H7.5"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
