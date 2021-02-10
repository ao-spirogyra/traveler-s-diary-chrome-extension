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

const onOauthButtonClicked = ()=> {
  const clientId = '4d9d6c636a9c5e9dbcdacdfc9e318daa8d7403d925f30868e7563dadb7ac093f'
  const redirect_uri = 'chrome-extension://dcdnegmkmmekdenamheodldpfopcbgnc/redirect.html'
  location.href = `https://api.gyazo.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code`
}


oauthButton = document.getElementById('oauth');
oauthButton.addEventListener('click', onOauthButtonClicked);

