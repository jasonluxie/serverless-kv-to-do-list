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
      responseEl.innerHTML = data;
      const script = document.createElement("script");
      script.innerHTML = `
        const loginSignup = async () => {
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;
          const userBody = JSON.stringify({
            user: username,
            password: password,
          });
          try {
            const response = await fetch(worker, {
              method: "PUT",
              body: userBody,
            });
          } catch (err) {
            console.error(err);
          }
        };
        document.getElementById("loginForm").addEventListener("submit", (event) => {
          event.preventDefault();
          loginSignup();
        });
      `;
      document.body.appendChild(script);
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
