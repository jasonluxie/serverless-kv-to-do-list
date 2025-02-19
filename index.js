const responseElement = document.getElementById("response");
const putButton = document.getElementById("put-test");
const worker = "https://serverless-kv-to-do-list.jasonluxie.workers.dev";

const requestHeaders = {
  Origin: "http://127.0.0.1:5500/",
  "Access-Control-Request-Method": "GET, PUT, DELETE",
  "Access-Control-Request-Headers": "Content-Type",
};

const getFetch = () => {
  fetch(worker, {
    method: "GET",
  })
    .then((response) => response.text())
    .then((data) => {
      responseElement.innerHTML = data
    })
    .catch((error) => {
      console.error(error);
    });
};

const putFetch = async () => {
  const testBody = JSON.stringify({
    user: "test",
    password: "password",
    message: "test",
  });
  try {
    const response = await fetch(worker, {
      method: "PUT",
      body: testBody,
    });

    const data = await response.text();
    const parsedData = await JSON.parse(data);
    console.log(parsedData);
    responseElement.innerHTML = data;
  } catch (error) {
    console.error(error);
  }
};

const pageLoad = () => {
  getFetch();
  // putFetch();
};

// putButton.addEventListener("click", putFetch);
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
