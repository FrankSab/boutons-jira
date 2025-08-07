document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('open-create-issue');
  if (button) {
    button.addEventListener('click', function () {
      window.location.href = "/secure/CreateIssue!default.jspa";
    });
  }
});



