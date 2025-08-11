AP.onReady(function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error('Button not found: #my-blue-btn');
    return;
  }

  button.addEventListener('click', function () {
    const projectId = '10001';   // your project ID
    const issueTypeId = '10003'; // your issue type ID

    AP.navigator.go('create-issue', {
      pid: projectId,
      issuetype: issueTypeId
    });
  });
});








