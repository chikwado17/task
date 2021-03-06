
 //define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners
function loadAllEventListeners() {

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);


    //add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //event to clear all task
    clearBtn.addEventListener('click', clearTasks);

    //event to filter task
    filter.addEventListener('keyup', filterTasks);
}



//Load Tasks from LocalStorage
function getTasks() {

    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //create li element
        const li = document.createElement('li');
        //add class to the li
        li.className = 'collection-item';

        //create text node and append to li
        li.appendChild(document.createTextNode(task));

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
    });
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

    //Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
}


//function to store task on local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Remove Task
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    } 
}


//function to remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//function to clear all task
function clearTasks() {
    //check if there's any list item on the first child which is the first list item
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear tasks from local storage
    clearTasksFromLocalStorage();
}


//function to clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}



//function to filter task
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}



//calling function loadAllEventListeners
loadAllEventListeners();