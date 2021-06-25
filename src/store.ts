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
  default: {
    page: '',
    seed: 0
  },
});

const isPageGlLoaded = atom({
  key: 'isPageGlLoaded',
  default: false,
});

const isRayZoomed = atom({
  key: 'isRayZoomed',
  default: false,
});

const isLinkHover = atom({
  key: 'isLinkHover',
  default: false,
});

const isWorkRendered = atom({
  key: 'isWorkRendered',
  default: false,
});

const carouselDirection = atom({
  key: 'carouselDirection',
  default: 0,
});

const carouselY = atom({
  key: 'carouselY',
  default: 0,
});

const carouselStart = atom({
  key: 'carouselStart',
  default: 0,
});

const carouselItemWidth = atom({
  key: 'carouselItemWidth',
  default: 0,
});

const carouselPositions = atom({
  key: 'carouselPositions',
  default: [] as Array<number>,
});

const carouselAnchors = atom({
  key: 'carouselAnchors',
  default: [] as Array<number>,
});

const carouselInitialized = atom({
  key: 'carouselInitialized',
  default: false,
});

export {
  isGlLoaded,
  menuOpen,
  isLanding,
  pageRendered,
  isPageGlLoaded,
  isRayZoomed,
  isLinkHover,
  isWorkRendered,
  carouselDirection,
  carouselY,
  carouselStart,
  carouselItemWidth,
  carouselPositions,
  carouselAnchors,
  carouselInitialized
}