<script>
  AP.whenAPIsReady(function() {
    const button = document.getElementById('my-blue-btn');
    if (!button) {
      console.error("Button not found");
      return;
    }

    button.addEventListener('click', function() {
      AP.context.getContext(async function(context) {
        if (!context || !context.jira || !context.jira.issue) {
          console.error("Issue context missing");
          return;
        }

        const issueKey = context.jira.issue.key;

        try {
          const response = await fetch(`/rest/api/3/issue/${issueKey}?fields=customfield_10043`, {
            headers: { 'Accept': 'application/json' }
          });

          if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status}`);
          }

          const data = await response.json();
          const nomValue = data.fields.customfield_10043 || '';
          const encodedNom = encodeURIComponent(nomValue);

          // Replace pid and issuetype with your IDs
          const url = `/secure/CreateIssue!default.jspa?pid=10001&issuetype=10003&customfield_10043=${encodedNom}`;

          top.location.href = url;

        } catch (err) {
          console.error("Error fetching issue data:", err);
        }
      });
    });
  });
</script>
