AP.onReady(function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error('Button not found: #my-blue-btn');
    return;
  }

  button.addEventListener('click', function () {
    // Replace these IDs with your own
    const projectId = '10001';   // Your "Dossier Résident" project ID
    const issueTypeId = '10003'; // Your "PTI" issue type ID

    AP.navigator.go('create-issue', {
      pid: projectId,
      issuetype: issueTypeId
    });
  });
});









