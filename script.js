document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('open-create-issue');
  if (button) {
    button.addEventListener('click', function () {
      if (typeof AP !== 'undefined') {
        AP.navigator.go('create-issue');
      } else {
        // Fallback: open the full page (Cloud-safe)
        window.location.href = "/jira/create";
      }
    });
  }
});



