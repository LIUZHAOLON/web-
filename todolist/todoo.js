let todoItems = [];
let finishedItems = [];

//输出待办事项列表
function renderTodoItemslist(todoItems, finishedItems) {
    let listEle = document.querySelector(".todolist-frame > .list");

    listEle.innerHTML = "";

    for (let i = 0; i < todoItems.length; i++) {
        let item = todoItems[i];

        let itemDiv = document.createElement('div')
        itemDiv.className = 'todo-item'

        let markEl = document.createElement('input')
        markEl.type = 'checkbox';
        markEl.addEventListener("change", (e) => {
            finishedItems.push(item);
            todoItems.splice(i, 1);
            renderTodoItemslist(todoItems, finishedItems)
        })

        let titleEl = document.createElement('input')
        titleEl.className = 'item-title'
        titleEl.addEventListener('change', (e) => {

            todoItems[i].title = titleEl.value;
            renderTodoItemslist(todoItems, finishedItems)
        })


        let importantEl = document.createElement('button')
        importantEl.id = 'fire'
        importantEl.innerHTML = '⭐'

        if (item.isImportant) {
            importantEl.classList.add('open')
        }

        importantEl.addEventListener('click', (e) => {
            if (item.isImportant) {
                item.isImportant = false

            } else {
                item.isImportant = true
            }
            renderTodoItemslist(todoItems, finishedItems)
        })







        let deleteEl = document.createElement('div')
        deleteEl.innerHTML = '<button>❌</button>'
        deleteEl.addEventListener('click', (e) => {
            todoItems.splice(i, 1);
            renderTodoItemslist(todoItems, finishedItems)

        })

        titleEl.value = item.title;

        listEle.append(itemDiv)



        itemDiv.append(markEl);
        itemDiv.append(titleEl);
        itemDiv.append(importantEl);
        itemDiv.append(deleteEl)



    }
}

//输出完成事项的列表
function renderFinishedItemslist(finishedItems) {
    let listEle = document.querySelector(".todolist-frame2");

    listEle.innerHTML = "";

    for (let i = 0; i < finishedItems.length; i++) {
        let item = finishedItems[i];

        let itemDiv = document.createElement('div')
        itemDiv.className = 'todo-item'



        let titleEl = document.createElement('input')
        titleEl.className = 'item-title'


        let importantEl = document.createElement('button')
        importantEl.id = 'fire'
        importantEl.innerHTML = '⭐'
        if (item.isImportant) {
            importantEl.classList.add('open')
        }


        let deleteEl = document.createElement('div')
        deleteEl.innerHTML = '<button>❌</button>'
        deleteEl.addEventListener('click', (e) => {
            finishedItems.splice(i, 1);
            renderFinishedItemslist(finishedItems)

        })

        titleEl.value = item.title;

        listEle.append(itemDiv)

        itemDiv.append(titleEl)

        itemDiv.append(importantEl)

        itemDiv.append(deleteEl)
    }
}

function renderInput(todoItems, finishedItems) {
    let addbnt = document.querySelector(".input-part  #add")
    let hisbntEl = document.querySelector(".input-part  #history")

    hisbntEl.addEventListener('click', (e) => {
        if (hisbntEl.classList.contains("open")) {
            hisbntEl.classList.remove("open");
            let listEle = document.querySelector(".todolist-frame2");
            listEle.innerHTML = ''
        } else {
            hisbntEl.classList.add("open");
            renderFinishedItemslist(finishedItems);
        }
    })

    addbnt.addEventListener('click', (e) => {
        let addbnt = document.querySelector(".input-part > input")

        todoItems.push({
            title: addbnt.value,
            finished: false,
            isImportant: false
        })

        renderTodoItemslist(todoItems, finishedItems);

    })



}



renderInput(todoItems, finishedItems);
renderTodoItemslist(todoItems, finishedItems);