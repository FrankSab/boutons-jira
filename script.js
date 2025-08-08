document.addEventListener('DOMContentLoaded', async function () {
  const button = document.getElementById('my-blue-btn');

  button.addEventListener('click', async function () {
    try {
      // Get all projects
      const projects = await AdaptavistBridge.request({
        url: '/rest/api/3/project/search',
        type: 'GET'
      });

      const dossierProject = projects.values.find(p => p.name === 'Dossier');
      if (!dossierProject) {
        alert('Project "Dossier" not found.');
        return;
      }

      // Get all issue types for this project
      const issueTypes = await AdaptavistBridge.request({
        url: `/rest/api/3/issuetype/project?projectId=${dossierProject.id}`,
        type: 'GET'
      });

      const ptiType = issueTypes.find(it => it.name === 'PTI');
      if (!ptiType) {
        alert('Issue type "PTI" not found in project "Dossier".');
        return;
      }

      // Build Create Issue URL
      const createUrl = `/secure/CreateIssue!default.jspa?pid=${dossierProject.id}&issuetype=${10003}`;

      // Open in new tab
      window.open(createUrl, '_blank');
    } catch (err) {
      console.error('Error opening create issue:', err);
      alert('An error occurred. Check console for details.');
    }
  });
});




