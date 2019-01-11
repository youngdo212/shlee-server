import {project as template} from './template.js';

export default class SectionProject {
  constructor({element}) {
    this.$section = element;
    this.showItemHandler = null;
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        const project = entry.target;
        this._makeProjectVisible(project);
      });
    });
  }

  bindShowItem(handler) {
    this.showItemHandler = handler;
  }

  addItems(items) {
    items.forEach((item) => {
      const newProject = this._render(item)

      this._observeProject(newProject);
      this._registerEventListener(newProject);
    })
  }

  _makeProjectVisible(project) {
    project.classList.remove('project--invisible');
    this.observer.unobserve(project);
  }

  _render(project) {
    this.$section.insertAdjacentHTML('beforeend', template(project));
    return this.$section.lastElementChild;
  }

  _observeProject(project) {
    this.observer.observe(project)
  }

  _registerEventListener(project) {
    const quickViewButton = project.querySelector('.project__quick-view');

    quickViewButton.addEventListener('click', (e) => {
      debugger;
      e.preventDefault();

      this.showItemHandler({
        id: project.dataset.id,
        title: project.dataset.title,
        videoUrl: project.dataset.videoUrl,
      });
    });
  }
}