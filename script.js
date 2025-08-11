document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    const projectId = '10001';   // Your project ID
    const issueTypeId = '10003'; // Your issue type ID

    // Make sure protocol is included!
    const baseUrl = window.location.origin || 'https://devfrancois.atlassian.net';

    top.location.href = `${baseUrl}/secure/CreateIssueDetails!init.jspa?pid=${projectId}&issuetype=${issueTypeId}`;
  });
});










