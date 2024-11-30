const responseElement = document.getElementById("response");
const worker = "https://note-taker-kv.jasonluxie.workers.dev/";

const peageLoad = () => {
    fetch(worker, {
        method: "PUT",
        body: JSON.stringify({ user: "test", trigger: "load" }),
    })
        .then((response) => 
            response.text()
        )
        .then((data) => {
            console.log(data);
            responseElement.innerHTML = data;
        })
        .catch((error) => {
            console.error(error);
        });
};

const submitAndUpdateList = (event) => {
    event.preventDefault();
    if (event.target.id === "to-do-submit") {
        let formValue = document.getElementById("to-do-entry").value;
        fetch(worker, {
            method: "PUT",
            body: { value: formValue, user: "test", trigger: "add" },
        });
        document.getElementById("to-do-entry").value = "";
    }
};

peageLoad();
responseElement.addEventListener("click", submitAndUpdateList);
