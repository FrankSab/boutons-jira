document.addEventListener('DOMContentLoaded', async function () {
  const button = document.getElementById('my-blue-btn');

  button.addEventListener('click', async function () {
    try {
      // Get all projects
      const projects = await AdaptavistBridge.request({
        url: '/rest/api/3/project/search',
        type: 'GET'
      });

      const dossierProject = projects.values.find(p => p.name === 'Dossier Résident');
      if (!dossierProject) {
        alert('Project "Dossier Résident" not found.');
        return;
      }

      // Get all issue types for this project
      const issueTypes = await AdaptavistBridge.request({
        url: `/rest/api/3/issuetype/project?projectId=${dossierProject.id}`,
        type: 'GET'
      });

      const ptiType = issueTypes.find(it => it.name === 'PTI');
      if (!ptiType) {
        alert('Issue type "PTI" not found in project "Dossier Résident".');
        return;
      }

      // Build Create Issue URL for Jira Cloud
      const createUrl = `/secure/CreateIssueDetails!init.jspa?pid=${dossierProject.id}&issuetype=${ptiType.id}`;

      // Navigate in same tab so Jira Cloud SPA loads the create screen
      window.location.href = createUrl;

    } catch (err) {
      console.error('Error opening create issue:', err);
      alert('An error occurred. Check console for details.');
    }
  });
});





