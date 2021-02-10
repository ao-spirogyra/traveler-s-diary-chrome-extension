function fetchToApp (url) {
  const exceptionList = JSON.parse(localStorage.getItem('exception-list'));
  const notIncludedInException = exceptionList.every((exceptionUrl) => {
    return !url.startsWith(exceptionUrl);
  });
  const access_token = localStorage.getItem('traveller\'s-dialy-token')
  const json = { accessToken: access_token }
  if (notIncludedInException) {
    fetch(`http://localhost:3000/puppeteer?url=${url}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(json),
      mode: 'cors'
    });
  }
}
chrome.tabs.onUpdated.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true, lastFocusedWindow: true}, (tabs) => {
    const url = tabs[0].url;
    fetchToApp(url);
  });
});
