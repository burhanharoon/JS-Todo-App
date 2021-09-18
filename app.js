const ul = document.querySelector('.todos');
const addForm = document.querySelector('.add');
const search = document.querySelector('.search');
const error = document.querySelector('.error');


const addTodoInDoc = todoName => {
    const html =
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todoName}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>`;
    ul.innerHTML += html;
}

addForm.addEventListener('submit', e => {
    e.preventDefault();
    if (ul.childElementCount === 0) {
        error.classList.add('d-none');
    }
    const todoName = addForm.add.value.trim().toLowerCase();
    console.log(todoName);
    if (todoName.length) {
        addTodoInDoc(todoName);
    }

    addForm.reset();
});

ul.addEventListener('click', e => {

    console.log(ul.childElementCount);
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
    if (ul.childElementCount === 0) {
        error.classList.remove('d-none');
    }

});

const searchTodos = (term) => {
    const noOfTodos = ul.childElementCount;
    if (ul.childElementCount === 0) {
        error.classList.remove('d-none');
    } else {
        let count = 0;
        Array.from(ul.children)
            .filter(todo => !todo.textContent.toLowerCase().includes(term))
            .forEach(todo => todo.classList.add('nodisplay'));

        Array.from(ul.children)
            .filter(todo => todo.textContent.toLowerCase().includes(term))
            .forEach(todo => todo.classList.remove('nodisplay'));

        Array.from(ul.children).forEach(todo => {
            if (todo.classList.contains('nodisplay')) {
                count++;
            }
        });
        if (count === noOfTodos) {
            error.classList.remove('d-none');
        }
        if (count < noOfTodos) {
            error.classList.add('d-none');
        }
    }

};

search.addEventListener('keyup', () => {
    const searchTodo = search.searchBox.value.toLowerCase();
    searchTodos(searchTodo);
});