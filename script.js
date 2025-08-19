document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    console.log("✅ Button clicked");

    // Get issue key from ScriptRunner context
    const issueKey = window.AdaptavistBridgeContext?.context?.issueKey;
    if (!issueKey) {
      console.error("❌ Could not detect issue key from AdaptavistBridgeContext");
      alert("Impossible de détecter la clé de l'usager.");
      return;
    }

    console.log("🔑 Current issue:", issueKey);

    // Build fallback URL in case REST fails
    let fallbackUrl = '/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=10003';
    fallbackUrl += '&summary=' + encodeURIComponent("Copie de " + issueKey);
    fallbackUrl += '&description=' + encodeURIComponent("Créé depuis " + issueKey);

    // Use Adaptavist Bridge to safely call Jira REST API
    if (window.AdaptavistBridge?.request) {
      window.AdaptavistBridge.request({
        url: `/rest/api/3/issue/${issueKey}?fields=components,customfield_10043,customfield_10046`,
        type: 'GET'
      }).then(response => {
        console.log("REST response:", response);

        // Parse safely
        let data = {};
        try {
          data = response && response.response ? JSON.parse(response.response) : {};
        } catch (err) {
          console.warn("⚠️ Failed to parse REST response", err);
          data = {};
        }

        const fields = data.fields || {};
        const nom = fields.customfield_10043 || "";
        const numeroChambre = fields.customfield_10046 || "";
        const components = (fields.components || []).map(c => c.id).join(",");

        // Build Create Issue URL with non-empty fields
        let url = fallbackUrl;
        if (nom) url += '&customfield_10043=' + encodeURIComponent(nom);
        if (numeroChambre) url += '&customfield_10046=' + encodeURIComponent(numeroChambre);
        if (components) url += '&components=' + encodeURIComponent(components);

        console.log("🚀 Redirecting to:", url);
        if (window.parent) window.parent.location.href = url;
      }).catch(err => {
        console.error("❌ REST API error, opening fallback URL", err);
        if (window.parent) window.parent.location.href = fallbackUrl;
      });
    } else {
      console.warn("⚠️ AdaptavistBridge.request not available, opening fallback URL");
      if (window.parent) window.parent.location.href = fallbackUrl;
    }
  });
});
