export default {
  async fetch(request, env, ctx) {
    const setKV = (user, data) => env.todokv.put(user, data);
    const getKV = (user) => env.todokv.get(user);

    const loginModal = `
      <h1 class="font-mono"><span id="username"></span>To-Do List</h1>
      <div id="modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 class="text-2xl font-bold mb-4">Login</h2>
          <form id="loginForm">
            <div class="mb-4">
              <label for="username" class="block text-gray-700">Username</label>
              <input type="text" id="username" name="username" class="w-full px-3 py-2 border rounded" required>
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-700">Password</label>
              <input type="password" id="password" name="password" class="w-full px-3 py-2 border rounded" required>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            </div>
          </form>
        </div>
      </div>
  `;

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

    switch (request.method) {
      case "OPTIONS":
        return new Response(null, {
          headers: {
            ...corsHeaders,
            "Access-Control-Max-Age": "86400",
          },
        });

      case "GET":
        return new Response(loginModal, {
          status: 200,
          headers: {
            ...corsHeaders,
          },
        });

      case "PUT":
        if (bodyJSON.type === "login") {
          const userInfo = await getKV(bodyJSON.user);
          console.log(userInfo);
          if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            if (parsedUserInfo.password === bodyJSON.password) {
              return new Response(toDoInput, {
                status: 200,
                headers: {
                  ...corsHeaders,
                },
              });
            }
          }
          return new Response("Invalid login", {
            status: 401,
            headers: {
              ...corsHeaders,
            },
          });
        }

      case "DELETE":
        return new Response("DELETE", {
          status: 200,
          headers: {
            ...corsHeaders,
          },
        });

      default:
        return new Response("Method not allowed", {
          status: 405,
          headers: {
            ...corsHeaders,
          },
        });
    }
  },
};
