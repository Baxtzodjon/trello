let arrow = document.querySelectorAll('.arrow')
let sidebar = document.querySelector('.sidebar')
let chocolate_menu = document.querySelector('.chocolate_menu')
let sidebarBtn = document.querySelector('.bx-chevron-left')

for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu')
    })
}

chocolate_menu.addEventListener("click", () => {
    sidebar.classList.toggle('close')
})

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle('close');
})

function createPopup(open) {
    let popupNode = document.querySelector(open);
    let overlay = popupNode.querySelector('.overlay')
    let closeBtn = popupNode.querySelector('.close-btn')

    function openPopup() {
        popupNode.classList.add('active')
    }

    function closePopup() {
        popupNode.classList.remove('active')
    }

    overlay.addEventListener('click', closePopup)
    closeBtn.addEventListener('click', closePopup)
    return openPopup
}

let popup = createPopup('#popup')
document.querySelector('#open-popup').addEventListener('click', popup)

const empties = document.querySelectorAll('.first_box')
const form = document.forms.add_task

let todos = []
let temp = []
let temp_id

form.onsubmit = (e) => {
    e.preventDefault()

    const fm = new FormData(e.target)

    const todo = { id: Math.random() }

    fm.forEach((val, key) => todo[key] = val)

    todos.push(todo)
    reload(todos, empties)

    console.log(todo);
}

function reload(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for (let todo of arr) {
        let div = document.createElement('div')
        let span = document.createElement('span')
        let p = document.createElement('p')

        div.setAttribute('id', todo.id)
        // div.setAttribute('class', 'inner_block')
        div.classList.add('inner_block')
        div.setAttribute('draggable', true)

        span.classList.add('span_styling')
        p.classList.add('p_styling')

        span.innerHTML = todo.title
        p.innerHTML = todo.description

        div.append(span, p,)
        switch (todo.status) {
            case "Нужно сделать":
                places[0].append(div)
                break;
            case "В процессе":
                places[1].append(div)
                break;
            case "Готово":
                places[2].append(div)
                break;
        }

        div.addEventListener('dragstart', dragStart)
        div.addEventListener('dragend', dragEnd)

        temp.push(div)
    }
}

for (let empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

function dragStart() {
    console.log('dragStart');
    temp_id = this.id
    this.classList += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
}

function dragEnd() {
    console.log('dragEnd');
    this.className = 'fill'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    event.preventDefault()
    this.className += ' hovered'
}

function dragLeave() {
    console.log('dragDrop');
    this.className = 'first_box'
    console.log(this);
}

function dragDrop() {
    console.log('dragDrop');
    this.className = 'first_box'
    temp.forEach((item) => {
        if (item.id === temp_id) {
            this.append(item)
        }
    })
}