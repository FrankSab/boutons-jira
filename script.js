document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    // Get issue key from the URL
    const issueKey = window.location.pathname.split('/').pop();

    // Call Jira API to get the "Nom" field
    fetch(`/rest/api/3/issue/${issueKey}`)
      .then(res => res.json())
      .then(issue => {
        const nomValue = issue.fields.customfield_10043;

        // Encode and build the Create Issue URL
        const url = `https://devfrancois.atlassian.net/secure/CreateIssue!default.jspa?pid=10001&issuetype=10003&customfield_10043=${encodeURIComponent(nomValue)}`;
        top.location.href = url;
      });
  });
});












