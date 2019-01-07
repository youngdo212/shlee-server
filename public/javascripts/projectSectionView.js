import ProjectView from './projectView.js';

export default class ProjectSectionView {
  constructor({wrapper, quickViewHandler}) {
    this.wrapper = wrapper;
    this.quickViewHandler = quickViewHandler;
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        const projectView = entry.target;
        projectView.classList.remove('project--invisible');
        observer.unobserve(projectView);
      });
    });
  }

  addProject(projects) {
    const newProjectViews = projects.map((project) => {
      return new ProjectView({
        project,
        wrapper: this.wrapper,
        observer: this.observer,
      })
    });

    newProjectViews.forEach((projectView) => {
      projectView.bindQuickViewHandler(this.quickViewHandler);
    });
  }
}