const form = document.getElementById('form');
const saveButton = document.getElementById('save');
// localStorage.removeItem("exception-list")
if (!localStorage.getItem('exception-list')) {
  localStorage.setItem('exception-list', JSON.stringify([]));
}
const saveForm = () => {
  const newValue = form.value;
  if (newValue !== '') {
    const exceptionList = JSON.parse(localStorage.getItem('exception-list'));
    exceptionList.push(newValue);
    localStorage.setItem('exception-list', JSON.stringify(exceptionList));
    location.reload();
  }
};
saveButton.addEventListener('click', saveForm);
const ul = document.createElement('ul');
JSON.parse(localStorage.getItem('exception-list')).forEach((item) => {
  let li = document.createElement('li');
  li.textContent = item;
  ul.appendChild(li);
});
document.getElementById('exceptions').appendChild(ul);
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", deleteform)
function deleteform () {
  const arr = JSON.parse(localStorage.getItem("exception-list"));
  arr.pop();
  localStorage.setItem("exception-list",JSON.stringify(arr));
  location.reload();
}

const getClientSecret = async () => {
  let clientSecret
  await fetch('https://dry-thicket-62282.herokuapp.com/secret', {
    method: 'GET',
    mode: 'cors'
  }).then(async (res) => {
    const response = await res.json()
    clientSecret = response["clientSecret"]
  })
  return clientSecret
}

const onOauthButtonClicked = ()=> {
  const clientId = 'f25d2754cabdca35725e0bc8611f5d609fbbf334198c68476c6edda718ec6e12';
  const redirectUri = 'https://dcdnegmkmmekdenamheodldpfopcbgnc.chromiumapp.org';
  chrome.identity.launchWebAuthFlow({
    url: `https://api.gyazo.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`,
    interactive: true
  }, async (responseUrl) => {
    const url = new URL(responseUrl);
    const params = url.searchParams;
    const code = params.get('code');
    const clientSecret = await getClientSecret();
    const grantType = 'authorization_code';
    const body = JSON.stringify({
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: grantType
    });
    await fetch('https://api.gyazo.com/oauth/token', {
      method: 'POST',
      body: body,
      headers: {
        "Content-Type": "application/json",
      }
    }).then( async (response) => {
      if (response.status === 200) {
        const res = await response.json()
          localStorage.setItem('gyazo-access-token', res['access_token'])
      }
    })
  })
}

const oauthButton = document.getElementById('oauth');
oauthButton.addEventListener('click', onOauthButtonClicked);
