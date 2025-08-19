document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error("❌ Button #my-blue-btn not found");
    return;
  }

  button.addEventListener('click', function () {
    console.log("✅ Button clicked");

    // Get issue key from ScriptRunner context
    const issueKey = window.AdaptavistBridgeContext?.context?.issueKey;
    if (!issueKey) {
      console.error("❌ Could not detect issue key from AdaptavistBridgeContext");
      return;
    }
    console.log("🔑 Current issue:", issueKey);

    // Use Adaptavist Bridge to call Jira REST API
    window.AdaptavistBridge.request({
      url: `/rest/api/3/issue/${issueKey}?fields=components,customfield_10043,customfield_10046`,
      type: 'GET'
    }).then(response => {
      const data = JSON.parse(response.body);
      const fields = data.fields;

      // Safely get values, fallback to empty string if missing
      const nom = fields.customfield_10043 || "";
      const numeroChambre = fields.customfield_10046 || "";
      const components = (fields.components || []).map(c => c.id).join(",");

      console.log("➡️ Nom:", nom, "Numéro:", numeroChambre, "Comps:", components);

      // Build Create Issue URL with only non-empty fields
      let url = '/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=10003';
      url += '&summary=' + encodeURIComponent("Copie de " + issueKey);
      url += '&description=' + encodeURIComponent("Créé depuis " + issueKey);
      if (nom) url += '&customfield_10043=' + encodeURIComponent(nom);
      if (numeroChambre) url += '&customfield_10046=' + encodeURIComponent(numeroChambre);
      if (components) url += '&components=' + encodeURIComponent(components);

      console.log("🚀 Redirecting to:", url);
      top.location.href = url;

    }).catch(err => {
      console.error("❌ REST API error", err);
      alert("Impossible de récupérer les informations de l’usager. La page de création s'ouvrira quand même.");

      // Open create screen anyway even if REST failed
      let fallbackUrl = '/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=10003';
      top.location.href = fallbackUrl;
    });
  });
});
