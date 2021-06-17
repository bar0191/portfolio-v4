import { atom } from 'recoil';

const isGlLoaded = atom({
  key: 'isGlLoaded', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const menuOpen = atom({
  key: 'menuOpen',
  default: false,
});

const isLanding = atom({
  key: 'isLanding',
  default: false,
});

const pageRendered = atom({
  key: 'pageRendered',
  default: null,
});

const isPageGlLoaded = atom({
  key: 'isPageGlLoaded',
  default: false,
});

const isRayZoomed = atom({
  key: 'isRayZoomed',
  default: false,
});

export {
  isGlLoaded,
  menuOpen,
  isLanding,
  pageRendered,
  isPageGlLoaded,
  isRayZoomed,
}