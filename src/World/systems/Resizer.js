class Resizer {
  constructor(container, camera, renderer, updatables) {
    // set initial size on load
    this.setSize(container, camera, renderer);

    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      this.setSize(container, camera, renderer);
      // perform any custom actions
      this.onResize(updatables);
    });
  }

  setSize = (container, camera, renderer) => {
    // set camera aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  onResize = (updatables) => {
    updatables.forEach((item) => {
      item.resize();
    })
  }
}

export { Resizer };