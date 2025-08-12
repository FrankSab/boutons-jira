document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    // Get issue key from context
    AP.context.getContext(async function (context) {
      if (!context || !context.jira || !context.jira.issue) {
        console.error("No issue context found");
        return;
      }

      const issueKey = context.jira.issue.key;

      try {
        // Fetch nom (customfield_10043) from current issue
        const response = await fetch(`/rest/api/3/issue/${issueKey}?fields=customfield_10043`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const nomValue = data.fields.customfield_10043 || '';
        const encodedNom = encodeURIComponent(nomValue);

        // Open create issue screen with prefilled nom
        const url = `/secure/CreateIssue!default.jspa?pid=10001&issuetype=10003&customfield_10043=${encodedNom}`;
        top.location.href = url;
      } catch (err) {
        console.error("Error fetching field value:", err);
      }
    });
  });
});












