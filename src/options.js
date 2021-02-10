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

const onOauthButtonClicked = ()=> {
  const clientId = 'f25d2754cabdca35725e0bc8611f5d609fbbf334198c68476c6edda718ec6e12'
  const redirect_uri = 'https://dry-thicket-62282.herokuapp.com/token'
  location.href = `https://api.gyazo.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code`
}

const oauthButton = document.getElementById('oauth');
oauthButton.addEventListener('click', onOauthButtonClicked);

const token = document.getElementById('access-token')
const onSaveTokenButtonClicked = () => {
  localStorage.setItem('traveller\'s-dialy-token', token.value)
}

const saveTokenButton = document.getElementById('save-acess-token')
saveTokenButton.addEventListener('click', onSaveTokenButtonClicked)
