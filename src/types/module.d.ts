declare module '*.module.scss' {
  const styles: Record<string, string>
  export default styles
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.mp4';
declare module '*.webp';
declare module '*.svg' {
  import React from 'react'

  export const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>
  export default string
}
