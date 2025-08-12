AP.context.getContext(function (context) {
  const issueKey = context.jira.issue.key;

  fetch(`/rest/api/3/issue/${issueKey}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(issue => {
    const nomValue = issue.fields.customfield_10043 || '';
    const url = `https://devfrancois.atlassian.net/secure/CreateIssue!default.jspa?pid=10001&issuetype=10003&customfield_10043=${encodeURIComponent(nomValue)}`;
    top.location.href = url;
  });
});












