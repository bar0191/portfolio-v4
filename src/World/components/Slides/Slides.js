import { createGeometries } from './geometries';
import Slide from './Slide';

class Slides {
  elements;
  items;
  renderer;
  geometry;

  constructor(elements, renderer) {
    this.items = [];
    this.geometry = createGeometries();
    this.elements = elements;
    this.renderer = renderer;
    console.log(elements);
    this.elements.forEach((el) => {
      const slide = new Slide(el, this.geometry, this.renderer);
      this.items.push(slide);
    });
    console.log(this.items);
  }
}

export default Slides;