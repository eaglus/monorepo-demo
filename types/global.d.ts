declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

declare module '*.css' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}
