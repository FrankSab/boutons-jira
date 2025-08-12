<button id="my-blue-btn">Create PTI</button>

<script src="https://connect-cdn.atl-paas.net/all.js"></script>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('my-blue-btn');
    if (!button) return;

    // Wait until AP is ready
    AP.whenAPIsReady(function() {
      button.addEventListener('click', function () {
        AP.context.getContext(async function (context) {
          if (!context || !context.jira || !context.jira.issue) {
            console.error("No issue context found");
            return;
          }

          const issueKey = context.jira.issue.key;

          try {
            const response = await fetch(`/rest/api/3/issue/${issueKey}?fields=customfield_10043`, {
              method: 'GET',
              headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();

            const nomValue = data.fields.customfield_10043 || '';
            const encodedNom = encodeURIComponent(nomValue);

            const url = `/secure/CreateIssue!default.jspa?pid=10001&issuetype=10003&customfield_10043=${encodedNom}`;
            top.location.href = url;
          } catch (err) {
            console.error("Error fetching field value:", err);
          }
        });
      });
    });
  });
</script>













