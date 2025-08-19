document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', async function () {
    const issueKey = JIRA.Issue.getIssueKey();

    try {
      // Call Jira REST API to fetch the issue fields
      const response = await fetch(
        `/rest/api/3/issue/${issueKey}?fields=summary,components,customfield_10043,customfield_10046`,
        { method: 'GET', headers: { 'Accept': 'application/json' } }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch issue data: " + response.statusText);
      }

      const data = await response.json();
      const fields = data.fields;

      // Example: adjust IDs to match your Jira instance
      const nom = fields.customfield_10043;         // Nom
      const numeroChambre = fields.customfield_10046; // Numero de chambre
      const components = fields.components.map(c => c.id).join(",");

      // Build Create Issue URL with prefilled values
      let url = '/secure/CreateIssueDetails!init.jspa'
        + '?pid=10001'                  // Project ID
        + '&issuetype=10003'            // Issue type ID
        + '&summary=' + encodeURIComponent("Copie de " + issueKey)
        + '&description=' + encodeURIComponent("Créé depuis " + issueKey)
        + '&customfield_10043=' + encodeURIComponent(nom || "")
        + '&customfield_10046=' + encodeURIComponent(numeroChambre || "")
        + '&components=' + encodeURIComponent(components);

      top.location.href = url;

    } catch (err) {
      console.error("Error building create issue URL", err);
      alert("Impossible de récupérer les informations de l’usager.");
    }
  });
});
