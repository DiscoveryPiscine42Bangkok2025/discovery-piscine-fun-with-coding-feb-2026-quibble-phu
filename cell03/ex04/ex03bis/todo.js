 $(document).ready(function() {
            
            loadCookie();

            $('#newBtn').click(function() {
                let todo = prompt("New TO DO:");
                if (todo && todo.trim() !== "") {
                    addTodo(todo);
                    saveCookie();
                }
            });

            function addTodo(text) {
                let $div = $('<div>').text(text);

                $div.click(function() {
                    if (confirm("Remove this TO DO?")) {
                        $(this).remove(); 
                        saveCookie();
                    }
                });

                $('#ft_list').prepend($div);
            }

            function saveCookie() {
                let todos = [];
                $('#ft_list').children().each(function() {
                    todos.push($(this).text()); 
                });
                
                document.cookie = "ft_list=" + JSON.stringify(todos) + "; path=/; max-age=31536000";
            }

            function loadCookie() {
                let cookies = document.cookie.split(';');
                let list = null;
                
                cookies.forEach(c => {
                    c = c.trim();
                    if (c.indexOf("ft_list=") === 0) {
                        list = c.substring("ft_list=".length, c.length);
                    }
                });

                if (list) {
                    try {
                        let todos = JSON.parse(list);
                        for (let i = todos.length - 1; i >= 0; i--) {
                            addTodo(todos[i]);
                        }
                    } catch (e) {}
                }
            }
        });