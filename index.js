const responseElement = document.getElementById("response");
const worker = "https://note-taker-kv.jasonluxie.workers.dev/";

const userLogin = () => {
    fetch(worker, {
        method: "POST",
        user: "test",
        body: { user: "test", trigger: "load" },
    })
        .then((response) => response.text())
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
            method: "POST",
            user: "test",
            trigger: "add",
            body: {value: formValue, user:'test', trigger:'add'},
        });
        document.getElementById("to-do-entry").value = "";
    }
};

userLogin();
responseElement.addEventListener("click", submitAndUpdateList);
