

class TaskManager {
    constructor() {
      this.tasks = this.loadTasks() || [];
    }
  
   
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
   
    loadTasks() {
      return JSON.parse(localStorage.getItem('tasks'));
    }
  
   
    addTask(description) {
      const task = {
        id: this.tasks.length + 1,
        description: description,
        completed: false,
      };
      this.tasks.push(task);
      this.saveTasks();
      console.log(`Task added: ${task.description}`);
    }
  
    
    viewTasks() {
      if (this.tasks.length === 0) {
        console.log('No tasks available.');
      } else {
        this.tasks.forEach((task) => {
          console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.completed ? 'Completed' : 'Not completed'}`);
        });
      }
    }
  
   
    toggleTaskCompletion(id) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks();
        this.viewTasks();
        console.log(`Task ${task.id} is now marked as ${task.completed ? 'completed' : 'not completed'}.`);
      } else {
        console.log('No task available with that ID.');
      }
    }
  
    updateTaskDescription(id, newDescription) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.description = newDescription;
        this.saveTasks();
        console.log(`Task updated: ${task.description}`);
      } else {
        console.log('No task available.');
      }
    }
  
  
    removeTask(id) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasks();
        console.log('Task removed successfully.');
      } else {
        console.log('No task available with that ID.');
      }
    }
  
   
    showMenu() {
      let choice;
      do {
        choice = parseInt(
          prompt(
            `Enter your choice (1-6):
  1. Add a task
  2. View all tasks
  3. Update task description
  4. Remove a task
  5. Toggle task completion
  6. Exit`
          )
        );
  
        switch (choice) {
          case 1:
            const description = prompt('Enter the task description:');
            this.addTask(description);
            break;
          case 2:
            this.viewTasks();
            break;
          case 3:
            const updateId = parseInt(prompt('Enter the task ID to update:'));
            const newDescription = prompt('Enter the new description:');
            this.updateTaskDescription(updateId, newDescription);
            break;
          case 4:
            const removeId = parseInt(prompt('Enter the task ID to remove:'));
            this.removeTask(removeId);
            break;
          case 5:
            const toggleId = parseInt(prompt('Enter the task ID to toggle completion:'));
            this.toggleTaskCompletion(toggleId);
            break;
          case 6:
            console.log('Exiting the task manager.');
            break;
          default:
            console.log('Invalid choice. Please enter a number between 1 and 6.');
        }
      } while (choice !== 6);
    }
  }
  

  const taskManager = new TaskManager();
  taskManager.showMenu();
  