/* eslint-disable */
import * as React from 'react';
import { useEffect } from 'react';
import World from '../World/World';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isGlLoaded, isPageGlLoaded, isRayZoomed, menuOpen, pageRendered } from '../store';

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

  await controller.initPlane(el);
}

// async function to render about page scenes
async function renderSlides() {
  const els = document.querySelectorAll('.gl-slide-scene');

  await controller.initSlides(els);
}

// main middleware function for connecting react to threejs modules
function renderGL({ router }) {
  const [loaded, setLoaded] = useRecoilState(isGlLoaded);
  const open = useRecoilValue(menuOpen);
  const container = document.querySelector('#scene-container');
  const rendered = useRecoilValue(pageRendered);
  const isLoaded = useSetRecoilState(isPageGlLoaded);
  const [zoomed, setZoomed] = useRecoilState(isRayZoomed);

  // listen for when menu is opened, zoom ray in/out
  useEffect(() => {
    if (!controller || rendered?.type !== 'home') return null;
    if (open) {
      controller.rayZoomIn();
    } else {
      controller.rayZoomOut();
    }
  }, [open]);

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
          renderAbout()
            .then(() => isLoaded(true))
            .catch((e) => console.log(e));
          if (!zoomed) {
            controller.rayZoomIn();
            setZoomed(true);
          }
          break;
        case 'work':
          renderSlides()
            .then(() => isLoaded(true))
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