export default {
  async fetch(request, env, ctx) {
    const setKV = (user, data) => env.todokv.put(user, data);
    const getKV = (user) => env.todokv.get(user);
    const toDoInput = `<form><input type="text" id="to-do-entry"/><input type="submit" id='to-do-submit' value="Add"/></form>`;
    const body = await request.text();
    let bodyJSON;
    if (body) {
      bodyJSON = await JSON.parse(body);
      console.log(bodyJSON.user, bodyJSON.password, bodyJSON.message);
    }
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
      const testInfo = JSON.stringify({
        password: bodyJSON.password,
        list: [bodyJSON.message],
      });
      const setInfo = await setKV(bodyJSON.user, testInfo);
      console.log(setInfo)
      const returnedInfo = await getKV(bodyJSON.user);
      return new Response(returnedInfo, {
        status: 200,
        headers: {
          ...corsHeaders,
        },
      });
    }
  },
};
