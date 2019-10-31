import {ajax} from '../helper.js';

export default class ProjectList {
  constructor({element}) {
    this.$projectList = element;
    this.bindClick();
  }

  bindClick() {
    this.$projectList.addEventListener('click', ({target}) => {
      const $project = target.closest('.index-section__project');

      if(!$project) return;

      const projectId = $project.dataset.id;
      
      if(!confirm('정말 삭제하시겠습니까?')) return;

      ajax({
        method: 'DELETE',
        url: `${document.location.origin}/project/${projectId}`,
        callback: () => {
          document.location.href = "/dashboard";
        }
      })
    })
  }
}