function fetchToApp (url) {
  const exceptionList = JSON.parse(localStorage.getItem("exception-list"))
  const notIncludedInException = exceptionList.every((exceptionUrl) => {
    return !url.startsWith(exceptionUrl)
  })
  console.log(notIncludedInException)
  if (notIncludedInException) {
    fetch(`http://localhost:3000/puppeteer?url=${url}`, {method: "POST", mode: 'cors'});
  }
}
chrome.tabs.onUpdated.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true , lastFocusedWindow: true}, (tabs) => {
    const url = tabs[0].url;
    fetchToApp(url)
  });
})
