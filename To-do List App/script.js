document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(li);
        saveTasks();
    };

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Complete';
    toggleButton.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
    };

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Complete';
        toggleButton.onclick = () => {
            li.classList.toggle('completed');
            saveTasks();
        };

        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
