document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    const url = 'https://devfrancois.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=10003';
    top.location.href = url;
  });
});











