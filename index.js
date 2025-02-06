const responseElement = document.getElementById("response");
const worker = "https://serverless-kv-to-do-list.jasonluxie.workers.dev";

const requestHeaders = {
  Origin: "http://127.0.0.1:5500/",
  "Access-Control-Request-Method": "GET, PUT, POST",
  "Access-Control-Request-Headers": "Content-Type",
};

const getFetch = () => {
  fetch(worker, {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const putFetch = () => {
  fetch(worker, {
    method: "PUT",
    body: JSON.stringify({ user: "test", trigger: "load" }),
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

const pageLoad = () => {
  getFetch();
  putFetch();
};

// const submitAndUpdateList = (event) => {
//     event.preventDefault();
//     if (event.target.id === "to-do-submit") {
//         let formValue = document.getElementById("to-do-entry").value;
//         fetch(worker, {
//             method: "PUT",
//             body: { value: formValue, user: "test", trigger: "add" },
//         });
//         document.getElementById("to-do-entry").value = "";
//     }
// };

pageLoad();
// responseElement.addEventListener("click", submitAndUpdateList);
