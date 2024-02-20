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
