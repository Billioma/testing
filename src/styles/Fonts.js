import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Sailec';
      src: url('/fonts/Sailec Light.ttf');
      src:
        local('Sailec Light'),
        url('/fonts/Sailec Light.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Sailec';
      src: url('/fonts/Sailec Medium.ttf');
      src:
        local('Sailec Medium'),
        url('/fonts/Sailec Medium.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Sailec';
      src: url('/fonts/Sailec Bold.ttf');
      src:
        local('Sailec Bold'),
        url('/fonts/Sailec Bold.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Cooper';
      src: url('/fonts/Cooper Std Black.ttf');
      src:
        local('Cooper Std Black'),
        url('/fonts/Cooper Std Black.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    `}
  />
);

export default Fonts;
