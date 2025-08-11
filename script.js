document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error('Button not found: #my-blue-btn');
    return;
  }

  button.addEventListener('click', function () {
    // Replace with your actual IDs from Jira Cloud
    const projectId = '10001';   // Dossier Résident project ID
    const issueTypeId = '10003'; // PTI issue type ID

    // Open Jira Cloud's native Create Issue modal
    AP.navigator.go('create-issue', {
      pid: projectId,
      issuetype: issueTypeId
    });
  });
});






