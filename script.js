document.addEventListener('DOMContentLoaded', async function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error('Button not found: #my-blue-btn');
    return;
  }

  button.addEventListener('click', async function () {
    try {
      const projects = await AdaptavistBridge.request({
        url: '/rest/api/3/project/search',
        type: 'GET'
      });

      const dossierProject = projects.values.find(p => p.name === 'Dossier Résident');
      if (!dossierProject) {
        alert('Project "Dossier Résident" not found.');
        return;
      }

      const issueTypes = await AdaptavistBridge.request({
        url: `/rest/api/3/issuetype/project?projectId=${dossierProject.id}`,
        type: 'GET'
      });

      const ptiType = issueTypes.find(it => it.name === 'PTI');
      if (!ptiType) {
        alert('Issue type "PTI" not found.');
        return;
      }

      // Use Jira Cloud API to open modal create issue screen
      AP.navigator.go('create-issue', {
        pid: dossierProject.id,
        issuetype: ptiType.id
      });

    } catch (err) {
      console.error('Error opening create issue modal:', err);
      alert('An error occurred. Check console for details.');
    }
  });
});






