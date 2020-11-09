
 //define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



//load all event listeners
function loadAllEventListeners() {
    form.addEventListener('submit', addTask);
}

//function to add task
function addTask(e) {
    e.preventDefault();

    if(taskInput.value === '') {
        alert('Add a task');
    }

    //create li element
    const li = document.createElement('li');
    //add class to the li
    li.className = 'collection-item';

    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');
    //add class to the anchor tag
    link.className = 'delete-item secondary-content';
    //add delete/close icon html to the li
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append the li to ul
    taskList.appendChild(li);

    //clear input
    taskInput.value = '';
}

//calling function loadAllEventListeners
loadAllEventListeners();