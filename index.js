const responseEl = document.getElementById("response");
const putButton = document.getElementById("put-test");

const localWorker = "http://127.0.0.1:8787"; 
const productionWorker = "https://serverless-kv-to-do-list.jasonluxie.workers.dev";
const worker = window.location.hostname === "127.0.0.1" ? localWorker : productionWorker;

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
      const parsedModal = parsedData.getElementById("modal");
      const parsedScript = parsedData.getElementsByTagName("script");
      const scriptEl = document.createElement("script");
      scriptEl.textContent = parsedScript[0].textContent;
      console.log(parsedData);
      responseEl.appendChild(parsedModal);
      responseEl.appendChild(scriptEl);
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
    responseEl.innerHTML = data;
  } catch (error) {
    console.error(error);
  }
};

const pageLoad = () => {
  getFetch();
};

pageLoad();
