//function to switch between sections
const navLinks = document.querySelectorAll('.nav-link');
const contents = document.querySelectorAll('.content');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');

        contents.forEach(content => {
            content.style.display = 'none'; // Hide all content
        });

        document.getElementById(sectionId).style.display = 'block'; // Show selected content
    });
});

// Task Management
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const notification = document.getElementById('notification');

addTaskBtn.addEventListener('click', () => {
    const taskValue = taskInput.value.trim();
    if (taskValue) {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox"> ${taskValue}
            <button class="delete-task-btn"><i class="fas fa-trash"></i> Delete</button>
        `;
        taskList.appendChild(listItem);
        taskInput.value = '';
        showNotification('Task added successfully!', 'success');
    } else {
        showNotification('Please enter a task.', 'error');
    }
});

// Show notifications
function showNotification(message, type) {
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.opacity = '1'; // Reset for next notification
        }, 500);
    }, 3000);
}

// Delete task functionality
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task-btn')) {
        e.target.parentElement.remove();
        showNotification('Task deleted successfully!', 'success');
    }
});

// Calendar functionality
const today = new Date();
const todayDateElement = document.getElementById('todayDate');
todayDateElement.textContent = today.toLocaleDateString();

const importantDateInput = document.getElementById('importantDateInput');
const markImportantBtn = document.getElementById('markImportantBtn');
const importantDatesList = document.getElementById('importantDatesList');

markImportantBtn.addEventListener('click', () => {
    const importantDateValue = importantDateInput.value;
    if (importantDateValue) {
        const dateItem = document.createElement('li');
        dateItem.className = 'date-item';
        dateItem.textContent = new Date(importantDateValue).toLocaleDateString();
        importantDatesList.appendChild(dateItem);
        importantDateInput.value = '';
        showNotification('Important date marked!', 'success');
    } else {
        showNotification('Please select a date.', 'error');
    }
});

// Settings functionality
const themeSelect = document.getElementById('themeSelect');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const resetBtn = document.getElementById('resetBtn');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');

saveSettingsBtn.addEventListener('click', () => {
    const selectedTheme = themeSelect.value;
    const selectedFontSize = fontSizeSelect.value;

    // Apply theme
    if (selectedTheme === 'dark') {
        document.body.style.backgroundColor = '#000000';
        document.body.style.color = '#ffffff';
    } else if (selectedTheme === 'light') {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
    } else {
        // Custom theme (example: light grey)
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#333333';
    }

    // Apply font size
    if (selectedFontSize === 'small') {
        document.body.style.fontSize = '12px';
    } else if (selectedFontSize === 'medium') {
        document.body.style.fontSize = '16px';
    } else {
        document.body.style.fontSize = '20px';
    }
    showNotification('Settings saved!', 'success');
});

// Reset settings to default
resetBtn.addEventListener('click', () => {
    themeSelect.value = 'dark';
    fontSizeSelect.value = 'medium';
    saveSettingsBtn.click(); // Trigger save settings to apply defaults
});

// Help section functionality (optional)
const helpContent = document.getElementById('help');
const helpNotification = document.createElement('div');
helpNotification.className = 'help-notification';
helpNotification.innerHTML = `
    <h3>Help Section</h3>
    <p>For any issues or suggestions, please contact support at support@taskmanager.com</p>
`;
helpContent.appendChild(helpNotification);