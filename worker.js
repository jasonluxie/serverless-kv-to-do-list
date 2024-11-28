export default {
    async fetch(request, env, ctx) {
      const response = new Response('Test!');

      response.headers.set('Access-Control-Allow-Origin', '*'); // Change this to deployment domain later
      return response;
    },
  };