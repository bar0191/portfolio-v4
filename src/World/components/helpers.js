import { AxesHelper, GridHelper } from 'three';

function createAxesHelper() {
  const helper = new AxesHelper(300);
  helper.position.set(-3.5, 0, -3.5);
  return helper;
}

function createGridHelper() {
  const helper = new GridHelper(500);
  return helper;
}

export { createAxesHelper, createGridHelper };