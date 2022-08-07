/* eslint-disable */
import * as React from 'react';
import { useEffect } from 'react';
import World from '../World/World';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isGlLoaded,
  isLinkHover,
  isPageGlLoaded,
  isRayZoomed,
  isWorkRendered,
  menuOpen,
  pageRendered
} from '../store';

// global controller for 3D world
let controller;

// async function to wait for world to render
async function renderer(world) {
  // complete async tasks
  await world.init();

  // start the animation loop
  world.start();

  return world;
}

// async function to render about page scenes
async function renderAbout() {
  const el = document.querySelector('.gl-about-scene');

  if (!el) return;

  await controller.initPlane(el);
}

// async function to render about page scenes
async function renderSlides() {
  const els = document.querySelectorAll('.gl-slide-scene');

  if (!els) return;

  await controller.initSlides(els);
}

// main middleware function for connecting react to threejs modules
function renderGL({ router }) {
  const [loaded, setLoaded] = useRecoilState(isGlLoaded);
  const open = useRecoilValue(menuOpen);
  const isHover = useRecoilValue(isLinkHover);
  const container = document.querySelector('#scene-container');
  const rendered = useRecoilValue(pageRendered);
  const isLoaded = useSetRecoilState(isPageGlLoaded);
  const [zoomed, setZoomed] = useRecoilState(isRayZoomed);
  const setWorkRendered = useSetRecoilState(isWorkRendered);

  // listen for when menu is opened, zoom ray in/out
  useEffect(() => {
    if (!controller || rendered?.page !== 'home') return null;
    if (open && !zoomed) {
      controller.rayZoomIn();
      setZoomed(true);
    } else {
      controller.rayZoomOut();
      setZoomed(false);
    }
  }, [open]);

  // listen for when menu is opened, zoom ray in/out
  useEffect(() => {
    if (!controller || rendered?.page !== 'work') return null;
    if (isHover) {
      controller.planeTouchDown();
    } else {
      controller.planeTouchUp();
    }
  }, [isHover]);

  // listen for initial page renders, and render webgl accordingly
  useEffect(() => {
    if (rendered) {
      const { page } = rendered;
      switch (page) {
        case 'home':
          if (zoomed) {
            controller.rayZoomOut();
            setZoomed(false);
          }
          break;
        case 'about':
        case 'project':
          renderAbout()
            .then(() => isLoaded(true))
            .catch((e) => console.log(e));
          if (!zoomed) {
            controller.rayZoomIn();
            setZoomed(true);
          }
          break;
        case 'work':
          setWorkRendered(false);
          renderSlides()
            .then(() => {
              isLoaded(true);
              setWorkRendered(true);
            })
            .catch((e) => console.log(e));
          if (!zoomed) {
            controller.rayZoomIn();
            setZoomed(true);
          }
          break;
        default:
          // silence
      }

    }
  }, [rendered]);

  if (loaded) return null;

  // initialize controller
  controller = new World(container);

  // run renderer
  renderer(controller)
    .then(() => {
      setLoaded(true);
    })
    .catch((e) => console.log(e))

  return null;
}

export default renderGL;