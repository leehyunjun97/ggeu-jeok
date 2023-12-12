declare global {
  interface Window {
    kakao: any;
  }
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const styles: { [key: string]: string };
  export default styles;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_FIREBASE_BASE_URL: string;
  }
}
