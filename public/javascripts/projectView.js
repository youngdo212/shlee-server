import {projectView as template} from './template.js';

export default class ProjectView {
  constructor({project, wrapper, observer}) {
    this.project = project;
    this.element = null;
    this.image = null;
    this.quickViewButton = null;
    this.render({wrapper});
    this.observeProjectView({observer});
  }

  render({wrapper}) {
    const html = template(this.project);
    wrapper.insertAdjacentHTML('beforeend', html);

    this.element = wrapper.lastElementChild;
    this.quickViewButton = this.element.querySelector('.project__quick-view');
    this.image = this.element.querySelector('.project__image');
  }

  observeProjectView({observer}) {
    this.image.addEventListener('load', () => {
      observer.observe(this.element);
    }, {once: true});
  }

  bindQuickViewHandler(handler) {
    if(!this.quickViewButton) return;
    
    this.quickViewButton.addEventListener('click', (e) => {
      e.stopPropagation();
      handler(this.project);
    });
  }
}