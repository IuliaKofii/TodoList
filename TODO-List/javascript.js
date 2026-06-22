import { save, load } from './api.js';

let listContainer = document.getElementById('listing'),
    taskInput = document.getElementById('new-todo'),
    todoForm = document.getElementsByClassName('form-todo')[0],
    optionBar = document.getElementsByClassName('options')[0],
    countDisplay = document.getElementsByClassName('todo-count')[0],
    allTodo = document.getElementById('all-todos'),
    activeTodo = document.getElementById('active-todos'),
    completedTodo = document.getElementById('completed-todos');


let todosArray = load(); 
let currentFilter = 'all';

allTodo.addEventListener('click', function() {
    setFilter('all');
});
activeTodo.addEventListener('click', function() {
    setFilter('active');
});
completedTodo.addEventListener('click', function() {
    setFilter('completed');
});

function setFilter(filter) {
    currentFilter = filter;
    
    allTodo.classList.remove('active');
    activeTodo.classList.remove('active');
    completedTodo.classList.remove('active');

    if (filter === 'all') {
       allTodo.classList.add('active');
    } else if (filter === 'active') {
       activeTodo.classList.add('active');
    } else if (filter === 'completed') {
       completedTodo.classList.add('active');
    }
    
    render();
}

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let textValue = taskInput.value.trim(); 
    if (textValue === "") {
        return; 
    }

    todosArray.push({
        id: Date.now(),
        text: textValue,
        completed: false
    });

    save(todosArray);

    taskInput.value = '';
    render();
});

function render() {
    if (todosArray.length > 0) {
        optionBar.style.display = 'flex';
    } else {
        optionBar.style.display = 'none';
    }
    
    listContainer.innerHTML = '';
    let activeCount = 0; 

    for (let i = 0; i < todosArray.length; i++) {
        let todo = todosArray[i]; 
        
        if (todo.completed === false) {
            activeCount = activeCount + 1; 
        }

        if (currentFilter === 'active' && todo.completed === true) {
            continue; 
        }
        if (currentFilter === 'completed' && todo.completed === false) {
            continue; 
        }

        let li = document.createElement('li');
        
        if (todo.completed === true) {
            li.classList.add('done');
        }

        let checkboxHtml = '';
        if (todo.completed === true) {
            checkboxHtml = '<input type="checkbox" class="toggle" checked>';
        } else {
            checkboxHtml = '<input type="checkbox" class="toggle">';
        }

        li.innerHTML = checkboxHtml + '<span>' + todo.text + '</span><button class="del-btn">✕</button>';
        let checkbox = li.querySelector('.toggle');
        checkbox.addEventListener('change', function() {
            if (checkbox.checked === true) {
                todo.completed = true; 
            } else {
                todo.completed = false; 
            }
            render(); 
        });

        let deleteBtn = li.querySelector('.del-btn');
        deleteBtn.addEventListener('click', function() {
            li.classList.add('fade-out');
            
            setTimeout(function() {
                let newArray = [];
                for (let j = 0; j < todosArray.length; j++) {
                    if (todosArray[j].id !== todo.id) {
                        newArray.push(todosArray[j]);
                    }
                }
                todosArray = newArray;
                save(todosArray);
                render(); 
            }, 500);
        });
        listContainer.appendChild(li);
    }

    if (activeCount === 1) {  
        countDisplay.textContent = activeCount + " item left"; 
    } else {
        countDisplay.textContent = activeCount + " items left"; 
    }
}

render();
