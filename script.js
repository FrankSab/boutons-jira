document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    const projectId = '10001';   // Replace with your project ID
    const issueTypeId = '10003'; // Replace with your issue type ID

    // Navigate Jira's main window
    top.location.href = `/secure/CreateIssueDetails!init.jspa?pid=${projectId}&issuetype=${issueTypeId}`;
  });
});









