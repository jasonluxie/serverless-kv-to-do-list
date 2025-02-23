const localWorker = "http://127.0.0.1:8787";
const productionWorker =
  "https://serverless-kv-to-do-list.jasonluxie.workers.dev";
const worker =
  window.location.hostname === "127.0.0.1" ? localWorker : productionWorker;

const responseEl = document.getElementById("response");

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
      const parser = new DOMParser();
      const parsedData = parser.parseFromString(data, "text/html");
      const modal = parsedData.getElementById("modal");
      const toDoEntry = parsedData.getElementById("to-do-section");
      const parsedScript = parsedData.getElementsByTagName("script");
      const modalScript = document.createElement("script");
      modalScript.textContent = parsedScript[0].textContent;
      responseEl.appendChild(modal);
      responseEl.appendChild(toDoEntry);
      responseEl.appendChild(modalScript);
      let username, password
    })
    .catch((error) => {
      console.error(error);
    });
};

getFetch();