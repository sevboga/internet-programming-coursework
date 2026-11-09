    let tasks = getTasks();
    let editing_id = null; //null in order to start adding

    //elemnt
    const task_form = document.querySelector("#task_form");
    const task_title = document.querySelector("#task_title");
    const task_description = document.querySelector("#task_description");
    const task_due = document.querySelector("#task_due");
    const task_priority = document.querySelector("#task_priority");
    const form_title = document.querySelector("#form_title");
    const form_message = document.querySelector("#form_message");
    const save_btn = document.querySelector("#save_btn");
    const cancel_btn = document.querySelector("#cancel_btn");

    // Search filters sorting
    const search_input = document.querySelector("#search_input");
    const status_filter = document.querySelector("#status_filter");
    const priority_filter = document.querySelector("#priority_filter");
    const sort_select = document.querySelector("#sort_select");

    // Task table
    const task_body = document.querySelector("#task_body");
    const empty_message = document.querySelector("#empty_message");

    // Kanban status
    const statuses = ["todo", "inprogress", "done"];
    const priorities = ["high", "medium", "low"];


    // reformat to YYYY-MM-DD
    function fixDate(date) {
        if (!date) return "";
        if (date.includes("/")) {
            const parts = date.split("/");
            return parts[2] + "-" + parts[1] + "-" + parts[0];
        }
        return date;
    }

    // reformat DD/MM/YYYY
    function showDate(date) {
        date = fixDate(date);

        if (!date) return "No date";
        const parts = date.split("-");
        return parts[2] + "/" + parts[1] + "/" + parts[0];
    }

    // find task
    function findTask(id) {
        return tasks.find(task => task.id === id);
    }

    // Save and refresh
    function update() {
        saveTasks(tasks);
        render();
    }

    // create a button
    function makeButton(text, action) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-sm btn-outline-secondary me-1";
        button.textContent = text;
        button.addEventListener("click", action);
        return button;
    }

    // add and edit tasks
    if (task_form) {
        task_form.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = task_title.value.trim();
        const description = task_description.value.trim();
        const due = task_due.value;
        const priority = task_priority.value;

        // check input
        if (title.length < 3 || due === "") {
            form_message.textContent = "Enter a task name and due date.";
            form_message.className = "mb-3 text-danger";
            return;
        }

        if (editing_id === null) {
            // add new task
            tasks.push({
                id: Date.now(),
                title: title,
                description: description,
                due: due,
                priority: priority,
                status: "todo"
            });
            addActivity("Added task: " + title);

        } else {
            // edit existing task
            const task = findTask(editing_id);
            if (!task) return;
            task.title = title;
            task.description = description;
            task.due = due;
            task.priority = priority;
            addActivity("Edited task: " + title);
        }
        resetForm();
        update();

        form_message.textContent = "Task saved successfully.";
        form_message.className = "mb-3 text-success";
        });
    }

    // Fill form when editing
    function editTask(id) {
        const task = findTask(id);
        if (!task) return;
        editing_id = id;
        task_title.value = task.title;
        task_description.value = task.description;
        task_due.value = fixDate(task.due);
        task_priority.value = task.priority;
        form_title.textContent = "Edit Task";
        save_btn.textContent = "Save changes";
        cancel_btn.classList.remove("d-none");
        task_form.scrollIntoView({ behavior: "smooth" });
    }

    // reset the form
    function resetForm() {
        task_form.reset();
        editing_id = null;
        form_title.textContent = "Add a Task";
        save_btn.textContent = "Add task";
        cancel_btn.classList.add("d-none");
        form_message.textContent = "";
    }

    if (cancel_btn) {
        cancel_btn.addEventListener("click", resetForm);
    }

    // Delete a task
    function deleteTask(id) {
        const task = findTask(id);
        if (!task) return;
        if (!confirm("Delete " + task.title + "?")) return;
        tasks = tasks.filter(item => item.id !== id);
        addActivity("Deleted task: " + task.title);
        if (editing_id === id) resetForm();
        update();
    }

    // complete, undo a task
    function completeTask(id) {
        const task = findTask(id);
        if (!task) return;
        if (task.status === "done") {
            task.status = "todo";
            addActivity("Reopened task: " + task.title);
        } else {
            task.status = "done";
            addActivity("Completed task: " + task.title);
        }

        update();
    }

    // move task in Kanbanbord
    function moveTask(id, direction) {
        const task = findTask(id);
        if (!task) return;
        const position = statuses.indexOf(task.status);
        const next = position + direction;
        if (next < 0 || next > 2) return;
        task.status = statuses[next];
        addActivity("Moved task: " + task.title);

        update();
    }

    //search, sort,
    function visibleTasks() {
        const search = search_input.value.trim().toLowerCase();
        const status = status_filter.value;
        const priority = priority_filter.value;
        const sort = sort_select.value;

        let result = tasks.filter(function(task) {
            const text = (task.title + " " + task.description).toLowerCase();
            //search
            if (!text.includes(search)) return false;
            //status
            if (status === "pending" && task.status === "done") return false;
            if (status === "completed" && task.status !== "done") return false;
            //priority
            if (priority !== "all" && task.priority !== priority) return false;

            return true;
        });

        // sorting
        result.sort(function(a, b) {
            if (sort === "name") {
                return a.title.localeCompare(b.title);
            }

            if (sort === "priority") {
                return priorities.indexOf(a.priority) -
                    priorities.indexOf(b.priority);
            }

            const dateA = fixDate(a.due) || "9999-12-31";
            const dateB = fixDate(b.due) || "9999-12-31";

            if (sort === "due_desc") {
                return dateB.localeCompare(dateA);
            }

            return dateA.localeCompare(dateB);
        });

        return result;
    }


    //task table
    function renderTable() {
        task_body.replaceChildren();

        const visible = visibleTasks();

        empty_message.classList.toggle("d-none", visible.length > 0);

        visible.forEach(function(task) {
            const row = document.createElement("tr");

            const name = document.createElement("td");
            const due = document.createElement("td");
            const priority = document.createElement("td");
            const status = document.createElement("td");
            const actions = document.createElement("td");

            name.textContent = task.title;

            //description
            if (task.description) {
                const small = document.createElement("small");
                small.textContent = task.description;
                small.className = "d-block text-body-secondary";
                name.appendChild(small);
            }

            due.textContent = showDate(task.due);
            priority.textContent = task.priority;
            status.textContent = {
                todo: "To Do",
                inprogress: "In Progress",
                done: "Completed"
            }[task.status];

            actions.className = "text-center text-nowrap";

            //overdue
            const today = new Date();
            const today_date =
                today.getFullYear() + "-" +
                String(today.getMonth() + 1).padStart(2, "0") + "-" +
                String(today.getDate()).padStart(2, "0");

            if (task.status !== "done" &&
                fixDate(task.due) &&
                fixDate(task.due) < today_date) {
                due.className = "text-danger fw-bold";
            }

            //buttons
            actions.append(
                makeButton(
                    task.status === "done" ? "Undo" : "Done",
                    () => completeTask(task.id)
                ),
                makeButton("Edit", () => editTask(task.id)),
                makeButton("Delete", () => deleteTask(task.id))
            );

            row.append(name, due, priority, status, actions);
            task_body.appendChild(row);
        });
    }

    //kanbanboard
    function renderBoard() {
        const columns = [
            document.querySelector("#column_todo"),
            document.querySelector("#colum_inprogress"),
            document.querySelector("#colum_done")
        ];
        const counts = [
            document.querySelector("#count_todo"),
            document.querySelector("#count_inprogress"),
            document.querySelector("#count_done")
        ];
        statuses.forEach(function(status, index) {
            const column = columns[index];
            column.replaceChildren();
            const list = tasks.filter(task => task.status === status);
            counts[index].textContent = list.length;

            if (list.length === 0) {
                const message = document.createElement("p");
                message.textContent = "No tasks";
                message.className = "text-body-secondary";
                column.appendChild(message);
            }
            list.forEach(function(task) {
                const card = document.createElement("div");
                card.className = "border rounded p-2 mb-2";

                const title = document.createElement("div");
                title.textContent = task.title;
                title.className = "fw-bold";

                const date = document.createElement("small");
                date.textContent = showDate(task.due) + " | " + task.priority;
                date.className = "d-block text-body-secondary mb-2";

                card.append(title, date);

                //move left
                if (index > 0) {
                    card.appendChild(
                        makeButton("←", () => moveTask(task.id, -1))
                    );
                }

                // move right
                if (index < 2) {
                    card.appendChild(
                        makeButton("→", () => moveTask(task.id, 1))
                    );
                }

                column.appendChild(card);
            });
        });
    }

    //analytics
    // Task counters
    function renderSummary() {
        const completed = tasks.filter(task => task.status === "done").length;

        document.querySelector("#total_count").textContent = String(tasks.length);
        document.querySelector("#pending_count").textContent = String(tasks.length - completed);
        document.querySelector("#completed_count").textContent = String(completed);
    }

    //progress bars --external source
    function renderBars(containerId, field, values, colors) {
        const container = document.querySelector(containerId);
        container.replaceChildren();

        values.forEach(function(value, index) {
            const count = tasks.filter(task => task[field] === value).length;
            const percent = tasks.length
                ? Math.round(count / tasks.length * 100)
                : 0;

            const label = document.createElement("div");
            label.className = "small mb-1";
            const statusLabels = {
                todo: "To Do",
                inprogress: "In Progress",
                done: "Completed"
            };

            const priorityLabels = {
                high: "High",
                medium: "Medium",
                low: "Low"
            };

            const displayName = field === "status"
                ? statusLabels[value]
                : priorityLabels[value];

            label.textContent = displayName + ": " + count + " (" + percent + "%)";
            const progress = document.createElement("div");
            progress.className = "progress mb-2";
            const bar = document.createElement("div");
            bar.className = "progress-bar " + colors[index];
            bar.style.width = percent + "%";
            progress.appendChild(bar);
            container.append(label, progress);
        });
    }

    function renderAnalytics() {
        renderBars(
            "#status_bars",
            "status",
            statuses,
            ["bg-secondary", "bg-info", "bg-success"]
        );

        renderBars(
            "#priority_bars",
            "priority",
            priorities,
            ["bg-danger", "bg-warning", "bg-success"]
        );
    }

    // Search while typing
    if (search_input) {
        search_input.addEventListener("input", renderTable);
    }

    // Filter and sort
    document.querySelectorAll("#status_filter, #priority_filter, #sort_select").forEach(function(select) {
        select.addEventListener("change", renderTable);
    });

    // refresh page sections
    function render() {
        renderSummary();
        renderAnalytics();
        renderTable();
        renderBoard();
    }

    if (document.querySelector("#task_form")) {
        render();
    } else if (document.querySelector("#status_bars")) {
        renderAnalytics();
    }
