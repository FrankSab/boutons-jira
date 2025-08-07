document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('my-blue-btn');

  button.addEventListener('click', function () {
    const issueKey = window.AdaptavistBridgeContext.context.issueKey;

    window.AdaptavistBridge.request({
      url: `/rest/api/2/issue/${issueKey}`,
      type: 'GET'
    }).then(issue => {
      alert(`Issue ${issue.key} is currently in status: ${issue.fields.status.name}`);
    }).catch(err => {
      console.error('Error fetching issue:', err);
    });
  });
});



