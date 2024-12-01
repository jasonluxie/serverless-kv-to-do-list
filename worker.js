export default {
    async fetch(request, env, ctx) {
        const setKV = (user, data) => env.toDoDictionary.put(user, data);
        const getKV = (user) => env.toDoDictionary.get(user);
        // const toDoInput = `<form><input type="text" id="to-do-entry"/><input type="submit" id='to-do-submit' value="Add"/></form>`;
        const body = await request.text();
        try {
            //const parsed = JSON.parse(body)
            if(getKV(parsed.user)) {
                getKV(parsed.user).forEach(element => {
                    //make html for each item in array
                });
            }
            const response = new Response(body, { status: 200 });
            response.headers.set(
                "Access-Control-Allow-Origin",
                "http://127.0.0.1:5500"
            );
            response.headers.set("Access-Control-Allow-Methods", "PUT");
            return response;
        } catch (error) {
            const response = new Response(error, { status: 500 });
            response.headers.set(
                "Access-Control-Allow-Origin",
                "http://127.0.0.1:5500"
            );
            response.headers.set("Access-Control-Allow-Methods", "PUT");
            return response;
        }
    },
};
