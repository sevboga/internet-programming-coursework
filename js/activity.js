//chose activity list
const activity_list = document.querySelector("#activity_list");


function formatTime(date_string) {
    return new Date(date_string).toLocaleDateString("en-GB");
}

//show latest activity
function showActivity() {
    const latest = getActivity().slice(0,5);

    //clearing other activities
    activity_list.replaceChildren();

    //validation if thers no activity
    if (latest.length === 0) {
        const item = document.createElement("li");
        item.className = "list-group-item text-body-secondary";
        item.textContent = "No activity yet. Add your task!";
        activity_list.appendChild(item);
        return;
    }

    //display activities with descr and date
    latest.forEach(activity => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between gap-3";

        const text = document.createElement("span");
        text.textContent = activity.text;

        const time = document.createElement("small");
        time.className = "text-body-secondary text-nowrap";
        time.textContent = formatTime(activity.time);

        item.append(text, time);
        activity_list.appendChild(item);
    });
}

showActivity();