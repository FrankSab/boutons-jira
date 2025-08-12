document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');

  if (!button) {
    console.error('Button #my-blue-btn not found');
    return;
  }

  button.addEventListener('click', async function () {
    try {
      if (typeof AP === 'undefined' || !AP.context) {
        console.error('Atlassian API not available.');
        return;
      }

      AP.context.getContext(async function (context) {
        const issueKey = context.jira && context.jira.issue && context.jira.issue.key;
        if (!issueKey) {
          console.error('No issue key found.');
          return;
        }

        console.log(`Button clicked on issue: ${issueKey}`);

        const response = await fetch(
          `/rest/api/3/issue/${issueKey}?fields=customfield_10043`, // change to your field ID
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

        const encodedNom = encodeURIComponent(nomValue);

        const pid = 10001;    // your project ID
        const issueTypeId = 10003; // your issue type ID
        const createUrl = `/secure/CreateIssueDetails!init.jspa?pid=${pid}&issuetype=${issueTypeId}&customfield_10043=${encodedNom}`;

        window.open(createUrl, '_blank');
      });
    } catch (err) {
      console.error('Error opening create issue:', err);
    }
  });
});













