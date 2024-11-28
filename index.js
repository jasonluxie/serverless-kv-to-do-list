fetch('https://note-taker-kv.jasonluxie.workers.dev/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });