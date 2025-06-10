import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Icon from 'components/AppIcon';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import TaskFilters from './components/TaskFilters';

const TaskManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 'task-1',
        title: 'Design new landing page',
        tags: ['design', 'ui', 'frontend'],
        createdAt: new Date('2024-01-15'),
        focusTime: 0,
        lastFocusSession: null,
        isActive: false
      },
      {
        id: 'task-2',
        title: 'Implement user authentication',
        tags: ['backend', 'security', 'api'],
        createdAt: new Date('2024-01-16'),
        focusTime: 45,
        lastFocusSession: new Date('2024-01-16T14:30:00'),
        isActive: false
      },
      {
        id: 'task-3',
        title: 'Write documentation for API endpoints',
        tags: ['documentation', 'api', 'backend'],
        createdAt: new Date('2024-01-17'),
        focusTime: 0,
        lastFocusSession: null,
        isActive: false
      }
    ],
    inprogress: [
      {
        id: 'task-4',
        title: 'Optimize database queries',
        tags: ['database', 'performance', 'backend'],
        createdAt: new Date('2024-01-14'),
        focusTime: 120,
        lastFocusSession: new Date('2024-01-17T10:15:00'),
        isActive: true
      },
      {
        id: 'task-5',
        title: 'Create responsive mobile layout',
        tags: ['mobile', 'css', 'responsive'],
        createdAt: new Date('2024-01-13'),
        focusTime: 90,
        lastFocusSession: new Date('2024-01-16T16:45:00'),
        isActive: false
      }
    ],
    done: [
      {
        id: 'task-6',
        title: 'Set up CI/CD pipeline',
        tags: ['devops', 'automation', 'deployment'],
        createdAt: new Date('2024-01-10'),
        focusTime: 180,
        lastFocusSession: new Date('2024-01-12T11:20:00'),
        isActive: false
      },
      {
        id: 'task-7',
        title: 'Configure monitoring and alerts',
        tags: ['monitoring', 'devops', 'alerts'],
        createdAt: new Date('2024-01-08'),
        focusTime: 75,
        lastFocusSession: new Date('2024-01-11T09:30:00'),
        isActive: false
      }
    ]
  });

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    stats: {
      tasksCompleted: 24,
      focusHours: 45,
      streak: 7
    }
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: 'text-text-secondary' },
    { id: 'inprogress', title: 'In Progress', color: 'text-warning' },
    { id: 'done', title: 'Done', color: 'text-success' }
  ];

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const draggedTask = sourceColumn.find(task => task.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const newTasks = Array.from(sourceColumn);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: newTasks
      });
    } else {
      // Moving to a different column
      const sourceTasks = Array.from(sourceColumn);
      const destTasks = Array.from(destColumn);

      sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, draggedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks
      });
    }
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      tags: taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date(),
      focusTime: 0,
      lastFocusSession: null,
      isActive: false
    };

    setTasks({
      ...tasks,
      [selectedColumn]: [...tasks[selectedColumn], newTask]
    });

    setShowAddTaskModal(false);
  };

  const handleDeleteTask = (taskId, columnId) => {
    setTaskToDelete({ taskId, columnId });
    setShowDeleteModal(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      const { taskId, columnId } = taskToDelete;
      setTasks({
        ...tasks,
        [columnId]: tasks[columnId].filter(task => task.id !== taskId)
      });
    }
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const getFilteredTasks = (columnTasks) => {
    return columnTasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => task.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  };

  const getAllTags = () => {
    const allTags = new Set();
    Object.values(tasks).flat().forEach(task => {
      task.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  };

  return (
    <div className="min-h-screen bg-background ambient-glow">
      <Sidebar 
        user={user}
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-60'}`}>
        <Header 
          onMenuToggle={handleToggleSidebar}
          user={user}
        />
        
        <main className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Task Management
                </h1>
                <p className="text-text-secondary font-body">
                  Organize your work with Kanban-style task boards
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-text-secondary rounded-full"></div>
                  <span className="text-text-secondary">{tasks.todo.length} To Do</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-text-secondary">{tasks.inprogress.length} In Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-text-secondary">{tasks.done.length} Done</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={getAllTags()}
          />

          {/* Kanban Board */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {columns.map((column) => (
                <div key={column.id} className="bg-surface/30 rounded-lg border border-border">
                  {/* Column Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-heading font-semibold ${column.color}`}>
                          {column.title}
                        </h3>
                        <span className="bg-surface px-2 py-1 rounded-full text-xs text-text-secondary">
                          {getFilteredTasks(tasks[column.id]).length}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedColumn(column.id);
                          setShowAddTaskModal(true);
                        }}
                        className="p-2 rounded-md hover:bg-surface transition-colors duration-150 group"
                        title={`Add task to ${column.title}`}
                      >
                        <Icon 
                          name="Plus" 
                          size={16} 
                          color="currentColor"
                          className="text-text-secondary group-hover:text-accent transition-colors duration-150"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-4 min-h-[400px] transition-colors duration-200 ${
                          snapshot.isDraggingOver ? 'bg-accent/5' : ''
                        }`}
                      >
                        <div className="space-y-3">
                          {getFilteredTasks(tasks[column.id]).map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`transition-transform duration-200 ${
                                    snapshot.isDragging ? 'rotate-2 scale-105' : ''
                                  }`}
                                >
                                  <TaskCard
                                    task={task}
                                    onDelete={() => handleDeleteTask(task.id, column.id)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                        
                        {/* Empty State */}
                        {getFilteredTasks(tasks[column.id]).length === 0 && (
                          <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Icon 
                              name="Package" 
                              size={48} 
                              color="var(--color-text-secondary)"
                              className="mb-4 opacity-50"
                            />
                            <p className="text-text-secondary font-body">
                              {searchQuery || selectedTags.length > 0 
                                ? 'No tasks match your filters' 
                                : `No tasks in ${column.title.toLowerCase()}`
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </main>
      </div>

      {/* Modals */}
      {showAddTaskModal && (
        <AddTaskModal
          isOpen={showAddTaskModal}
          onClose={() => setShowAddTaskModal(false)}
          onSubmit={handleAddTask}
          columnTitle={columns.find(col => col.id === selectedColumn)?.title}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteTask}
          taskTitle={taskToDelete ? tasks[taskToDelete.columnId].find(t => t.id === taskToDelete.taskId)?.title : ''}
        />
      )}
    </div>
  );
};

export default TaskManagement;