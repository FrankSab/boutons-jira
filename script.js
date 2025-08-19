document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) {
    console.error("❌ Button #my-blue-btn not found");
    return;
  }

  button.addEventListener('click', async function () {
    console.log("✅ Button clicked");

    const issueKey = getIssueKeyFromUrl();
    if (!issueKey) {
      console.error("❌ Could not detect issue key from URL");
      return;
    }
    console.log("🔑 Current issue:", issueKey);

    try {
      const response = await fetch(
        `/rest/api/3/issue/${issueKey}?fields=summary,components,customfield_10043,customfield_10046`,
        { method: 'GET', headers: { 'Accept': 'application/json' } }
      );

      console.log("🌐 REST call status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch issue data: " + response.statusText);
      }

      const data = await response.json();
      const fields = data.fields;

      const nom = fields.customfield_10043;           // Nom
      const numeroChambre = fields.customfield_10046; // Numero de chambre
      const components = (fields.components || []).map(c => c.id).join(",");

      console.log("➡️ Nom:", nom, "Numéro:", numeroChambre, "Comps:", components);

      // Build Create Issue URL
      let url = '/secure/CreateIssueDetails!init.jspa'
        + '?pid=10001'
        + '&issuetype=10003'
        + '&summary=' + encodeURIComponent("Copie de " + issueKey)
        + '&description=' + encodeURIComponent("Créé depuis " + issueKey)
        + '&customfield_10043=' + encodeURIComponent(nom || "")
        + '&customfield_10046=' + encodeURIComponent(numeroChambre || "")
        + (components ? '&components=' + encodeURIComponent(components) : "");

      console.log("🚀 Redirecting to:", url);
      top.location.href = url;

    } catch (err) {
      console.error("❌ Error building create issue URL", err);
      alert("Impossible de récupérer les informations de l’usager. Vérifiez la console.");
    }
  });

  function getIssueKeyFromUrl() {
    const match = window.location.pathname.match(/\/browse\/([A-Z0-9\-]+)/);
    return match ? match[1] : null;
  }
});

