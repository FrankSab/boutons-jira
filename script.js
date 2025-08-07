if (typeof AP !== 'undefined') {
  AP.navigator.go('create-issue');
} else {
  window.location.href = "/jira/create";
}

