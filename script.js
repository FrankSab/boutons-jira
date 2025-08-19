document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error("❌ Button #my-blue-btn not found");
    return;
  }

  button.addEventListener('click', function () {
    console.log("✅ Button clicked");

    // Get current issue key from ScriptRunner context
    const issueKey = window.AdaptavistBridgeContext?.context?.issueKey;
    if (!issueKey) {
      console.error("❌ Could not detect issue key from AdaptavistBridgeContext");
      return;
    }
    console.log("🔑 Current issue:", issueKey);

    // Fetch issue details using Atlassian Connect API
    AP.request({
      url: `/rest/api/3/issue/${issueKey}?fields=components,customfield_10043,customfield_10046`,
      type: 'GET',
      contentType: 'application/json',
      success: function (responseText) {
        const data = JSON.parse(responseText);
        const fields = data.fields;

        const nom = fields.customfield_10043;           // Nom
        const numeroChambre = fields.customfield_10046; // Numero de chambre
        const components = (fields.components || []).map(c => c.id).join(",");

        console.log("➡️ Nom:", nom, "Numéro:", numeroChambre, "Comps:", components);

        // Build Create Issue URL
        let url = '/secure/CreateIssueDetails!init.jspa'
          + '?pid=10001'   // Project ID
          + '&issuetype=10003' // Issue type ID
          + '&summary=' + encodeURIComponent("Copie de " + issueKey)
          + '&description=' + encodeURIComponent("Créé depuis " + issueKey)
          + '&customfield_10043=' + encodeURIComponent(nom || "")
          + '&customfield_10046=' + encodeURIComponent(numeroChambre || "")
          + (components ? '&components=' + encodeURIComponent(components) : "");

        console.log("🚀 Redirecting to:", url);
        top.location.href = url;
      },
      error: function (xhr) {
        console.error("❌ REST API error", xhr);
        alert("Impossible de récupérer les informations de l’usager.");
      }
    });
  });
});
