let listContainer = document.getElementById('listing');
let taskInput = document.getElementById('new-todo');
let todoForm = document.querySelector('.form-todo'); 
let optionBar = document.querySelector('.options');
let countDisplay = document.querySelector('.todo-count');

let todosArray = []; 
let currentFilter = 'all';

document.getElementById('all-active').addEventListener('click', function() {
    setFilter('all');
});
document.getElementById('active').addEventListener('click', function() {
    setFilter('active');
});
document.getElementById('completed').addEventListener('click', function() {
    setFilter('completed');
});

function setFilter(filter) {
    currentFilter = filter;
    
    document.getElementById('all-active').classList.remove('active');
    document.getElementById('active').classList.remove('active');
    document.getElementById('completed').classList.remove('active');

    if (filter === 'all') {
        document.getElementById('all-active').classList.add('active');
    } else if (filter === 'active') {
        document.getElementById('active').classList.add('active');
    } else if (filter === 'completed') {
        document.getElementById('completed').classList.add('active');
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

localStorage.setItem('', '');