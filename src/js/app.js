const todoInput = document.querySelector('#todoInput')
const todoAddButton = document.querySelector('#todoAddButton')
const todoContainer = document.querySelector('#todoContainer')
const quoteContainer = document.querySelector('#quoteContainer')
let todos = JSON.parse(localStorage.getItem('todos')) || []

function renderTodo() {
    todoContainer.innerHTML = ''

    todos.forEach((e) => {
        todoContainer.innerHTML += `<li class="todoItem border border-todo-primary p-2 rounded-lg flex flex-row justify-between items-center">
                    <p class="todoText ${e.complete ? 'line-through' : ''}">${e.name}</p>
                    <div>
                        <input ${e.complete ? 'checked' : ''}  onchange="completeTodo(${e.id})" class="todoCheckbox cursor-pointer" type="checkbox" name="todoCheckbox" >
                        <button onclick="deleteTodo(${e.id})"   class="deleteBtn text-todo-danger font-bold mr-2 cursor-pointer">Delete</button>
                    </div>
                </li>`

    })


}

function addTodo(newTodo) {

    if (newTodo == "") {
        return alert('Please enter value')
    }

    todos.push({
        id: Date.now(),
        name: newTodo.trim(),
        complete: false
    })

    localStorage.setItem('todos', JSON.stringify(todos))

    todoInput.value = ''

    renderTodo()
}

function deleteTodo(item) {

    let index = todos.findIndex((e) => e.id == item)

    todos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(todos))

    renderTodo()
}

function completeTodo(id) {

    let item = todos.find(e => e.id == id)


    item.complete = !item.complete

    localStorage.setItem('todos', JSON.stringify(todos))

    renderTodo()

}

todoInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        let todo = todoInput.value;
        addTodo(todo)
    }
})

todoAddButton.addEventListener('click', () => {
    let todo = todoInput.value;
    addTodo(todo)
});

fetch('https://dummyjson.com/quotes?limit=7')
    .then(res => res.json())
    .then((data) => {
        const q = data.quotes
        q.forEach(e => {
            quoteContainer.innerHTML += `
            <div class="border p-3 rounded-lg">
                    <p>"${e.quote}"</p>
                    <p>— ${e.author}</p>
                </div>
        `
        });

    })
    .catch((error) => {
        console.log(error);
    })

renderTodo()