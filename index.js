// const responseEl = document.getElementById("response");
// const putButton = document.getElementById("put-test");
// const localWorker = 'http://127.0.0.1:8787'
// const worker = "https://serverless-kv-to-do-list.jasonluxie.workers.dev";

// const requestHeaders = {
//   Origin: "http://127.0.0.1:5500/",
//   "Access-Control-Request-Method": "GET, PUT, DELETE",
//   "Access-Control-Request-Headers": "Content-Type",
// };

// const getFetch = () => {
//   fetch(localWorker || worker, {
//     method: "GET",
//   })
//     .then((response) => response.text())
//     .then((data) => {
//       responseEl.innerHTML =data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// const putFetch = async () => {
//   const testBody = JSON.stringify({
//     user: "test",
//     password: "password",
//     message: "test",
//   });
//   try {
//     const response = await fetch(worker, {
//       method: "PUT",
//       body: testBody,
//     });

//     const data = await response.text();
//     const parsedData = await JSON.parse(data);
//     console.log(parsedData);
//     responseElement.innerHTML = data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const pageLoad = () => {
//   getFetch();
// };


// pageLoad();
