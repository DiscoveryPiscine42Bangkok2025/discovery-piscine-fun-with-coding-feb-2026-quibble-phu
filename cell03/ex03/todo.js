const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

window.onload = function() {
    loadTodo();
};

newBtn.addEventListener('click', function() {
    let todoText = prompt("Please enter your new TO DO:");

    if (todoText && todoText.trim() !== "") {
        addTodo(todoText);
        saveCookie();      
    }
});


function addTodo(text) {
    let div = document.createElement('div');
    div.innerHTML = text;

 
    div.addEventListener('click', function() {
        let confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            div.remove(); 
            saveCookie(); 
        }
    });


    ft_list.prepend(div);
}


function saveCookie() {
    let todos = [];

    let items = ft_list.children;
    for (let i = 0; i < items.length; i++) {
        todos.push(items[i].innerHTML);
    }
    

    let jsonStr = JSON.stringify(todos);
    document.cookie = "ft_list=" + encodeURIComponent(jsonStr) + "; path=/; max-age=31536000";
}


function loadTodo() {
    let cookies = document.cookie.split(';');
    let todoCookie = null;


    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf("ft_list=") === 0) {
            todoCookie = c.substring("ft_list=".length, c.length);
            break;
        }
    }

    if (todoCookie) {
        try {
  
            let todos = JSON.parse(decodeURIComponent(todoCookie));

            for (let i = todos.length - 1; i >= 0; i--) {
                addTodo(todos[i]);
            }
        } catch (e) {
            console.error("Error parsing cookie", e);
        }
    }
}