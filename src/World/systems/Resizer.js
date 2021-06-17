class Resizer {
  constructor(container, camera, renderer) {
    // set initial size on load
    this.setSize(container, camera, renderer);

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      this.setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize();
    });
  }

  setSize = (container, camera, renderer) => {
    // Set the camera's aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  onResize() {}
}

export { Resizer };