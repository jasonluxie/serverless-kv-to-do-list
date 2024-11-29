const responseElement = document.getElementById("response");
const worker = "https://note-taker-kv.jasonluxie.workers.dev/";

const userLogin = () => {
    const userName = document.getElementById("username");
};

const submitAndUpdateList = (event) => {
    if (event.target.id === "to-do-submit") {
        const formValue = document.getElementById("to-do-entry").value;
        fetch(worker, { method: "POST", body: formValue });
    }
};

responseElement.addEventListener("click", submitAndUpdateList);

fetch(worker)
    .then((response) => response.text())
    .then((data) => {
        console.log(data);
        responseElement.innerHTML = data;
    })
    .catch((error) => {
        console.error(error);
    });
