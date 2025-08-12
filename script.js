document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');

  if (!button) {
    console.error('Button #my-blue-btn not found');
    return;
  }

  button.addEventListener('click', async function () {
    try {
      // 1️⃣ Wait for Jira API context
      if (typeof AP === 'undefined' || !AP.context) {
        alert('Atlassian API not available.');
        return;
      }

      AP.context.getContext(async function (context) {
        const issueKey = context.jira && context.jira.issue && context.jira.issue.key;
        if (!issueKey) {
          alert('No issue key found.');
          return;
        }

        console.log(`Button clicked on issue: ${issueKey}`);

        // 2️⃣ Get current issue details
        const response = await fetch(
          `/rest/api/3/issue/${issueKey}?fields=customfield_10043`, 
          {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to get issue: ${response.status}`);
        }

        const issueData = await response.json();
        const nomValue = issueData.fields.customfield_10043 || ''; 

        console.log(`Nom field value: ${nomValue}`);

        // 3️⃣ Encode value for URL
        const encodedNom = encodeURIComponent(nomValue);

        // 4️⃣ Build Create Issue URL with pre-filled Nom
        const pid = 10001;    // your project ID for Dossier Résident
        const issueTypeId = 10003; // your PTI issue type ID

        // Atlassian quick create with fields pre-filled
        const createUrl = `/secure/CreateIssueDetails!init.jspa?pid=${pid}&issuetype=${issueTypeId}&customfield_10043=${encodedNom}`;

        // 5️⃣ Open in new tab
        window.open(createUrl, '_blank');
      });
    } catch (err) {
      console.error('Error opening create issue:', err);
      alert('An error occurred. Check console for details.');
    }
  });
});













