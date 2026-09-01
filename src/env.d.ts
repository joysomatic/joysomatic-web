/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.jpg' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.jpeg' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.png' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.webp' {
  const src: import('astro').ImageMetadata;
  export default src;
}

declare module '*.svg' {
  const src: import('astro').ImageMetadata;
  export default src;
}