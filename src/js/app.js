const todoInput = document.querySelector('#todoInput')
const todoAddButton = document.querySelector('#todoAddButton')
const todoContainer = document.querySelector('#todoContainer')
const quoteContainer = document.querySelector('#quoteContainer')

function addTodo(todo) {
    if (todo == "") {
        return alert('Please enter value')
    }

    todoContainer.innerHTML += `<li class="todoItem border border-todo-primary p-2 rounded-lg flex flex-row justify-between items-center">
                    <p class="todoText">${todo}</p>
                    <div>
                        <input  class="todoCheckbox cursor-pointer" type="checkbox" name="todoCheckbox" >
                        <button  class="deleteBtn text-todo-danger font-bold mr-2 cursor-pointer">Delete</button>
                    </div>
                </li>`

    todoInput.value = ''
}

todoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        e.target.closest('.todoItem').remove()
    }
})

todoContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('todoCheckbox')) {
        let todoItem = e.target.closest('.todoItem')
        let todoText = todoItem.querySelector('.todoText')

        if (e.target.checked) {
            todoText.classList.add('line-through')
        } else {
            todoText.classList.remove('line-through')

        }
    }

})

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