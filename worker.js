export default {
  async fetch(request, env, ctx) {
    const setKV = (user, data) => env.toDoDictionary.put(user, data);
    const getKV = (user) => env.toDoDictionary.get(user);
    const toDoInput = `<form><input type="text" id="to-do-entry"/><input type="submit" id='to-do-submit' value="Add"/></form>`;
    const body = await request.text();

    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500", // Change to deployment website later
      "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...corsHeaders,
          "Access-Control-Max-Age": "86400",
        },
      });
    }
    if (request.method === "GET") {
      return new Response("GET", {
        status: 200,
        headers: {
          ...corsHeaders,
        },
      });
    } else if (request.method === "DELETE") {
      return new Response("DELETE", {
        status: 200,
        headers: {
          ...corsHeaders,
        },
      });
    } else if (request.method === "PUT") {
      return new Response("PUT", {
        status: 200,
        headers: {
          ...corsHeaders,
        },
      });
    }
  },
};
