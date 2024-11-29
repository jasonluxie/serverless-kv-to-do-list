export default {
    async fetch(request, env, ctx) {
        console.log(request);
        const toDoInput = `<form><input type="text" id="to-do-entry"/><input type="submit" id='to-do-submit' value="Add"/></form>`;
        if (request.body.trigger === "load") {
            try {
                const userToDo = await env.toDoDictionary.get(
                    request.body.user
                );
                console.log(typeof JSON.parse(userToDo));
                if (userToDo) {
                    let list = "";
                    for (let i = 0; i < userToDo.length; i++) {
                        const listItem = `<li><p id=${i}>${userToDo[i]}</p></li>`;
                        list = list + listItem;
                    }
                    console.log(list);
                    const response = new Response(toDoInput + list);
                    response.headers.set("Access-Control-Allow-Origin", "*"); //change wildcard to domain later
                    response.headers.set(
                        "Access-Control-Allow-Methods",
                        "GET, POST"
                    );
                    response.headers.set(
                        "Access-Control-Allow-Headers",
                        "Content-Type"
                    );
                    return response;
                }
            } catch (error) {
                console.error(error);
            }
        } else if (request.body.trigger === "add") {
            try {
                let testKV = await env.toDoDictionary.put(
                    "test",
                    request.body.value
                );
                console.log(await env.toDoDictionary.get("test"));
            } catch (error) {
                console.error(error);
            }
            const response = new Response(toDoInput);
            response.headers.set("Access-Control-Allow-Origin", "*");
            response.headers.set("Access-Control-Allow-Methods", "GET, POST");
            response.headers.set(
                "Access-Control-Allow-Headers",
                "Content-Type"
            );
            return response;
        } else {
            const response = "no entry";
            response.headers.set("Access-Control-Allow-Origin", "*");
            response.headers.set("Access-Control-Allow-Methods", "GET, POST");
            response.headers.set(
                "Access-Control-Allow-Headers",
                "Content-Type"
            );
            return response;
        }
    },
};
