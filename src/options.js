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
