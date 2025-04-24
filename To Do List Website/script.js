// Get references to the DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement('li');

        // Create task text
        const span = document.createElement('span');
        span.textContent = taskText;

        // Create Edit button with icon
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editTask(span, li);

        // Create Delete button with icon
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => li.remove();

        // Append elements to the list item
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Add the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }
}

// Function to edit a task
function editTask(taskSpan, taskLi) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskSpan.textContent;

    taskLi.insertBefore(editInput, taskSpan);
    taskLi.removeChild(taskSpan);

    const editBtn = taskLi.querySelector('button');
    editBtn.innerHTML = '<i class="fas fa-save"></i>'; // Save icon
    editBtn.onclick = () => saveTask(editInput, taskLi);
}

// Function to save the edited task
function saveTask(editInput, taskLi) {
    const updatedText = editInput.value.trim();
    if (updatedText !== "") {
        const span = document.createElement('span');
        span.textContent = updatedText;

        taskLi.insertBefore(span, editInput);
        taskLi.removeChild(editInput);

        const editBtn = taskLi.querySelector('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'; // Edit icon
        editBtn.onclick = () => editTask(span, taskLi);
    }
}

// Add event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
