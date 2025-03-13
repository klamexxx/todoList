<template>
    <header class="todo-header">
        <h1>ToDoList</h1>
    </header>
    <div class="todo-content">
        <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="请输入待办事项..." />
        <button @click="addTodo">Submit</button>
    </div>
    <div class="todo-list-container">
        <div class="todo">
            <div class="todo-list-title">
                <span>正在进行</span>
                <span class="todo-count">{{ todoList.length }}</span>
            </div>
            <div class="todo-items">
                <div v-for="(item, index) in todoList" :key="index" class="todo-item">
                    <div class="todo-item-content">
                        <span class="todo-text">{{ item.text }}</span>
                        <span class="todo-time">创建时间：{{ formatTime(item.createTime) }}</span>
                    </div>
                    <span class="todo-check" @click="completeTodo(index)">✓</span>
                </div>
            </div>
        </div>
        <div class="over">
            <div class="todo-list-title">
                <span>已经完成</span>
                <span class="todo-count">{{ completedList.length }}</span>
            </div>
            <div class="todo-items">
                <div v-for="(item, index) in completedList" :key="index" class="todo-item completed">
                    <div class="todo-item-content">
                        <span class="todo-text">{{ item.text }}</span>
                        <div class="todo-times">
                            <span class="todo-time">创建时间：{{ formatTime(item.createTime) }}</span>
                            <span class="todo-time">完成时间：{{ formatTime(item.completeTime) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'TodoList'
})

const newTodo = ref('')
const todoList = ref([])
const completedList = ref([])

const formatTime = (date) => {
    const pad = (num) => String(num).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const addTodo = () => {
    if (newTodo.value.trim()) {
        todoList.value.push({
            text: newTodo.value.trim(),
            createTime: new Date()
        })
        newTodo.value = ''
    }
}

const completeTodo = (index) => {
    const completedTodo = todoList.value.splice(index, 1)[0]
    completedTodo.completeTime = new Date()
    completedList.value.push(completedTodo)
}
</script>

<style>
.todo-header {
    height: 40px;
    background: linear-gradient(to right, #2196F3, #ffffff);
    color: white;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
}

.todo-header h1 {
    margin-left: 20px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.todo-content {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    z-index: 90;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.todo-content input {
    padding: 8px 12px;
    border: 2px solid #2196F3;
    border-radius: 4px 0 0 4px;
    width: 300px;
    font-size: 16px;
    outline: none;
    height: 40px;
    box-sizing: border-box;
    transition: all 0.3s ease;
}

.todo-content input:focus {
    border-color: #1976D2;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.todo-content button {
    padding: 8px 20px;
    background-color: #2196F3;
    border: 2px solid #2196F3;
    border-radius: 0 4px 4px 0;
    margin-left: -2px;
    color: white;
    font-family: 'Submit', sans-serif;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
    height: 40px;
    box-sizing: border-box;
}

.todo-content button:hover {
    background-color: #1976D2;
    border-color: #1976D2;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.todo-list-container {
    position: fixed;
    top: 120px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 60px;
    gap: 30px;
    background: #f5f7fa;
}

.todo, .over {
    flex: 1;
    background: #fff;
    overflow: hidden;
}

.todo-list-title {
    height: 40px;
    background: linear-gradient(to right, #2196F3, #ffffff);
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-weight: 500;
    justify-content: space-between;
}

.todo-list-title span:first-child {
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.todo-count {
    background: rgba(33, 150, 243, 0.2);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: normal;
    min-width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s;
    color: #2196F3;
}

.todo-count:hover {
    background: rgba(33, 150, 243, 0.3);
    transform: scale(1.05);
}

.todo-items {
    padding: 20px;
    height: calc(100% - 40px);
    overflow-y: auto;
}

.todo-items::-webkit-scrollbar {
    width: 6px;
}

.todo-items::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.todo-items::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    background: #fff;
    margin-bottom: 12px;
    transition: all 0.3s;
    border-radius: 8px;
    border: 1px solid #eee;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.todo-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border-color: #e0e0e0;
}

.todo-item-content {
    flex: 1;
    margin-right: 15px;
}

.todo-text {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    color: #2c3e50;
    line-height: 1.4;
}

.todo-time {
    font-size: 12px;
    color: #94a3b8;
    display: block;
    line-height: 1.6;
}

.todo-times {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed #eee;
}

.todo-check {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #2196F3;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s;
    flex-shrink: 0;
    box-shadow: 0 2px 5px rgba(33, 150, 243, 0.3);
}

.todo-check:hover {
    background: #1976D2;
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 3px 8px rgba(25, 118, 210, 0.4);
}

.completed .todo-text {
    color: #94a3b8;
    text-decoration: line-through;
}

.completed.todo-item {
    background: #f8fafc;
}
</style>
