document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add');
    const tasksList = document.querySelector('.all-tasks .tasks');
    const completedList = document.querySelector('.completed-tasks .tasks');
    const clearButton = document.querySelector('.clear-all');
    const dateElement = document.getElementById('date');

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-DZ', options);
    dateElement.textContent = formattedDate;

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasksList.innerHTML = savedTasks;
    }

    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedCompletedTasks) {
        completedList.innerHTML = savedCompletedTasks;
    }

    addButton.addEventListener('click', function() {
        const taskValue = taskInput.value.trim();

        if (taskValue !== '') {
            const noTasksMsg = tasksList.querySelector('.no-tasks');
            if (noTasksMsg) {
                tasksList.removeChild(noTasksMsg);
            }
            
            const task = document.createElement('li');
            task.classList.add('task');
            task.innerHTML = `
                <span>${taskValue}</span>
                <button class="delete">Delete</button>
                <button class="completed">Completed</button>
            `;
            
            tasksList.appendChild(task);
            taskInput.value = '';
            taskInput.focus();

            localStorage.setItem('tasks', tasksList.innerHTML);
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    tasksList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            localStorage.setItem('tasks', tasksList.innerHTML);

            if (tasksList.querySelectorAll('li.task').length === 0) {
                tasksList.innerHTML = '<li class="no-tasks"><p>No task has been added</p></li>';
            }
        } else if (e.target.classList.contains('completed')) {
            const task = e.target.parentElement;
            const taskText = task.querySelector('span').textContent;
            task.remove();
            
            localStorage.setItem('tasks', tasksList.innerHTML);
            
            const noCompletedMsg = completedList.querySelector('.no-completed-tasks');
            if (noCompletedMsg) {
                completedList.removeChild(noCompletedMsg);
            }

            const completedTask = document.createElement('li');
            completedTask.classList.add('task', 'completed');
            completedTask.innerHTML = `
                <span>${taskText}</span>
                <button class="remove">Remove</button>
            `;
            completedList.appendChild(completedTask);
            
            localStorage.setItem('completedTasks', completedList.innerHTML);

            if (tasksList.querySelectorAll('li.task').length === 0) {
                tasksList.innerHTML = '<li class="no-tasks"><p>No task has been added</p></li>';
            }
        }
    });

    completedList.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove')) {
            e.target.parentElement.remove();
            localStorage.setItem('completedTasks', completedList.innerHTML);

            if (completedList.querySelectorAll('li.task.completed').length === 0) {
                completedList.innerHTML = '<li class="no-completed-tasks"><p>No task has been completed</p></li>';
            }
        }
    });

    clearButton.addEventListener('click', function() {
        tasksList.innerHTML = '<li class="no-tasks"><p>No task has been added</p></li>';
        completedList.innerHTML = '<li class="no-completed-tasks"><p>No task has been completed</p></li>';
        localStorage.removeItem('tasks');
        localStorage.removeItem('completedTasks');
    });
});