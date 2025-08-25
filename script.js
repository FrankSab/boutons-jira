document.addEventListener('DOMContentLoaded', function () {
  
  function setupButton(buttonId, issuetypeId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', function () {
      console.log(`✅ ${buttonId} clicked`);

      const issueKey = window.AdaptavistBridgeContext?.context?.issueKey;
      if (!issueKey) {
        console.error("❌ Could not detect issue key from AdaptavistBridgeContext");
        alert("Impossible de détecter la clé de l'usager.");
        return;
      }

      console.log("🔑 Current issue:", issueKey);

      // Hardcoded Jira Cloud base URL (replace with your Jira instance)
      const jiraBase = "https://devfrancois.atlassian.net";

      // Fallback URL in case REST fails
      let fallbackUrl = `${jiraBase}/secure/CreateIssueDetails!init.jspa?pid=10001&issuetype=${issuetypeId}`;
      fallbackUrl += '&summary=' + encodeURIComponent(issueKey);
      fallbackUrl += '&description=' + encodeURIComponent(issueKey);

      // If AdaptavistBridge.request is available, fetch issue fields
      if (window.AdaptavistBridge?.request) {
        window.AdaptavistBridge.request({
          url: `/rest/api/3/issue/${issueKey}?fields=components,customfield_10043,customfield_10046`,
          type: 'GET'
        }).then(response => {
          console.log("REST response:", response);

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

          // Build final Create Issue URL
          let url = fallbackUrl;
          if (nom) url += '&customfield_10043=' + encodeURIComponent(nom);
          if (numeroChambre) url += '&customfield_10046=' + encodeURIComponent(numeroChambre);
          if (components) url += '&components=' + encodeURIComponent(components);

          console.log("🚀 Opening Create Issue URL in new tab:", url);
          window.open(url, "_blank");

        }).catch(err => {
          console.error("❌ REST API error, opening fallback URL", err);
          window.open(fallbackUrl, "_blank");
        });
      } else {
        console.warn("⚠️ AdaptavistBridge.request not available, opening fallback URL");
        window.open(fallbackUrl, "_blank");
      }
    });
  }

  // Initialize buttons
  setupButton('my-blue-btn', 10003);
  setupButton('my-pink-btn', 10010);
  setupButton('my-green-btn', 10012);

});
