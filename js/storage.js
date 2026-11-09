    const tasks_key = "labov_tasks";
    const activity_key = "labov_activity";

    //get the date from where it was created
    function dateFromToday(n) {
        const date = new Date();
        date.setTime(date.getTime() + n);

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        //adding 0 before for the full format dd/mm/yyyy
        if (day <10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        return day + "/" + month + "/" + year;
    }

    //save the tasks
    function saveTasks(tasks) {
        const lines = tasks.map(task => {
            const values = [
                task.id,
                task.title,
                task.description,
                task.due,
                task.priority,
                task.status
            ];
            //external source: change value in the safe text, and will be separated by |
            return values.map(encodeURIComponent).join("|");
        });

        localStorage.setItem(tasks_key, lines.join("\n"));
    }

    //load the tasks
    function getTasks() {
        const saved = localStorage.getItem(tasks_key);
        //if empty
        if (!saved) {
            return [];
        }

        return saved.split("\n").map(line => {
            const t = line.split("|").map(decodeURIComponent);

            return {
                id: Number(t[0]),
                title: t[1],
                description: t[2],
                due: t[3],
                priority: t[4],
                status: t[5]
            };
        });
    }

    //get activity
    function getActivity() {
        const saved = localStorage.getItem(activity_key);

        if (!saved) {
            return [];
        }

        return saved.split("\n").map(line => {
            const a = line.split("|").map(decodeURIComponent);

            return {
                text: a[0],
                time: a[1]
            };
        });
    }
    //add activity
    function addActivity(text) {
        const activity = getActivity();

        activity.unshift({
            text: text,
            time: new Date().toISOString()
        });

        const lines = activity.slice(0, 20).map(item => {
            return [
                encodeURIComponent(item.text),
                encodeURIComponent(item.time)
            ].join("|");
        });

        localStorage.setItem(activity_key, lines.join("\n"));
    }