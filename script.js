document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');
  if (!button) return;

  button.addEventListener('click', function () {
    console.log("✅ Button clicked");

    const issueKey = window.AdaptavistBridgeContext?.context?.issueKey;
    if (!issueKey) {
      console.error("❌ Could not detect issue key from AdaptavistBridgeContext");
      return;
    }

    console.log("🔑 Current issue:", issueKey);

    // Use AdaptavistBridge.request
    window.AdaptavistBridge.request({
      url: `/rest/api/3/issue/${issueKey}?fields=components,customfield_10043,customfield_10046`,
      type: 'GET'
    }).then(response => {
      console.log("REST response:", response);

      const data = response && response.response ? JSON.parse(response.response) : {};
      const fields = data.fields || {};

      const nom = fields.customfield_10043 || "";
      const numeroChambre = fields.customfield_10046 || "";
      const components = (fields.components || []).map(c => c.id).join(",");

      let url = '/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=10003';
      url += '&summary=' + encodeURIComponent("Copie de " + issueKey);
      url += '&description=' + encodeURIComponent("Créé depuis " + issueKey);
      if (nom) url += '&customfield_10043=' + encodeURIComponent(nom);
      if (numeroChambre) url += '&customfield_10046=' + encodeURIComponent(numeroChambre);
      if (components) url += '&components=' + encodeURIComponent(components);

      // Redirect parent page
      if (window.parent) window.parent.location.href = url;
    }).catch(err => {
      console.error("❌ REST API error", err);

      // Fallback: open Create screen anyway
      let fallbackUrl = '/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=10003';
      if (window.parent) window.parent.location.href = fallbackUrl;
    });
  });
});
