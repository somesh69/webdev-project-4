// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.tab-btn.active').classList.remove('active');
    btn.classList.add('active');
    document.querySelector('.tab-content.active').classList.remove('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'portfolio') animateSkills();
  });
});

// Skill bar animation
function animateSkills() {
  document.querySelectorAll('.bar').forEach(bar => {
    let skill = bar.getAttribute('data-skill');
    bar.querySelector('::after');
    bar.style.setProperty('--width', skill + '%');
    bar.style.background = 'rgba(255,255,255,0.1)';
    bar.innerHTML = `<div style="height:100%;background:#00ff88;width:${skill}%;transition:width 1s"></div>`;
  });
}
animateSkills();

// To-Do List
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function renderTasks(filter = 'all') {
  todoList.innerHTML = '';
  tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');
    li.addEventListener('click', () => toggleTask(index));
    todoList.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.getElementById('add-task').addEventListener('click', () => {
  if (todoInput.value.trim()) {
    tasks.push({ text: todoInput.value, completed: false });
    todoInput.value = '';
    renderTasks();
  }
});
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  });
});
renderTasks();

// Products
const products = [
  { name: "Laptop", category: "electronics", price: 800 },
  { name: "Headphones", category: "electronics", price: 50 },
  { name: "T-Shirt", category: "clothing", price: 20 },
  { name: "Smartphone", category: "electronics", price: 600 },
  { name: "Jeans", category: "clothing", price: 40 }
];
const productList = document.getElementById('product-list');

function displayProducts(list) {
  productList.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `<h4>${p.name}</h4><p>${p.category}</p><p>$${p.price}</p>`;
    productList.appendChild(div);
  });
}
displayProducts(products);

document.getElementById('search').addEventListener('input', e => {
  let filtered = products.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()));
  displayProducts(filtered);
});
document.getElementById('category-filter').addEventListener('change', e => {
  let filtered = e.target.value === 'all' ? products : products.filter(p => p.category === e.target.value);
  displayProducts(filtered);
});
document.getElementById('sort-price').addEventListener('change', e => {
  let sorted = [...products];
  if (e.target.value === 'low-high') sorted.sort((a,b) => a.price - b.price);
  if (e.target.value === 'high-low') sorted.sort((a,b) => b.price - a.price);
  displayProducts(sorted);
});
