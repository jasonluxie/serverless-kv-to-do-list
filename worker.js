export default {
  async fetch(request, env, ctx) {
    const setKV = (user, data) => env.todokv.put(user, data);
    const getKV = (user) => env.todokv.get(user);

    const loginModalScript = `
      <h1 class="font-mono"><span id="user"></span>To-Do List</h1>
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
          <div class="flex justify-between items-center">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            <div id="error-message" class="text-red-500 hidden">Invalid password, please try again</div>
          </div>
          </form>
        </div>
      </div>
      <section id='todo'><section>
      <script>
      const loginSignup = async () => {
        console.log(document.getElementById("username"));
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const userBody = JSON.stringify({
          user: username,
          password: password,
          type: "login",
        });
        console.log(userBody);
        try {
          const response = await fetch(worker, {
            method: "PUT",
            body: userBody,
          });
          if (!response.ok) {
            const error = document.getElementById("error-message");
            error.classList.remove("hidden");
            throw new Error("Password does not match username");
          } else {
            const data = await response.text();
            const modal = document.getElementById("modal");
            modal.classList.add("hidden");
            const todoEl = document.getElementById("todo");
            todoEl.innerHTML = data;
          }
        } catch (err) {
          console.error(err);
        }
      };
      document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        loginSignup();
      });
      </script>`;

    function generateToDoList(items) {
      let listItems = items
        .map(
          (item, index) => `
          <div class="flex items-center space-x-4" data-id="${index}">
            <input type="checkbox" id="to-do-${index}" ${
            item.completed ? "checked" : ""
          } class="mr-2">
            <label for="to-do-${index}" class="flex-1">${item.text}</label>
          </div>
        `
        )
        .join("");

      return `
          <form class="flex items-center space-x-4" id='to-do-form'>
            <input type="text" id="to-do-entry" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your to-do item" />
            <input type="submit" id="to-do-submit" value="Add" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
          </form>
          <div id="to-do-list">
            ${listItems}
          </div>
        `;
    }

    const body = await request.text();
    let bodyJSON;
    if (body) {
      bodyJSON = await JSON.parse(body);
      console.log(bodyJSON.user, bodyJSON.password, bodyJSON.type);
    }
    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500", // Change to deployment website later
      "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    console.log(request.method);
    switch (request.method) {
      case "OPTIONS":
        return new Response(null, {
          headers: {
            ...corsHeaders,
            "Access-Control-Max-Age": "86400",
          },
        });

      case "GET":
        return new Response(loginModalScript, {
          status: 200,
          headers: {
            ...corsHeaders,
          },
        });

      case "PUT":
        if (bodyJSON.user === null || bodyJSON.password === undefined) {
          return new Response("Invalid request", {
            status: 400,
            headers: {
              ...corsHeaders,
            },
          });
        }
        const userInfo = await getKV(bodyJSON.user);
        console.log("putInfo", userInfo);
        if (bodyJSON.type === "login") {
          console.log(userInfo);
          if (userInfo !== null) {
            const parsedUserInfo = JSON.parse(userInfo);
            if (parsedUserInfo.password === bodyJSON.password) {
              return new Response(generateToDoList(parsedUserInfo.list), {
                status: 200,
                headers: {
                  ...corsHeaders,
                },
              });
            } else {
              return new Response("Invalid login", {
                status: 401,
                headers: {
                  ...corsHeaders,
                },
              });
            }
          } else {
            const newUser = {
              password: bodyJSON.password,
              list: [],
            };
            await setKV(bodyJSON.user, JSON.stringify(newUser));
            const userInfo = await getKV(bodyJSON.user);
            console.log("userInfo", userInfo);
            const parsedUserInfo = JSON.parse(userInfo);
            return new Response(generateToDoList(parsedUserInfo.list), {
              status: 200,
              headers: {
                ...corsHeaders,
              },
            });
          }
        } else if (bodyJSON.type === "add") {
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
