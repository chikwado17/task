
 //define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners
function loadAllEventListeners() {
    //add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //event to clear all task
    clearBtn.addEventListener('click', clearTasks);

    //event to filter task
    filter.addEventListener('click', filterTasks);
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

//Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    } 
}


//function to clear all task
function clearTasks() {
    //check if there's any list item on the first child which is the first list item
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

//function to filter task
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        if(item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    })
}











//calling function loadAllEventListeners
loadAllEventListeners();