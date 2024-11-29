export default {
    async fetch(request, env, ctx) {
        try {
            let testKV = await env.toDoDictionary.put("test", request.body);
            console.log(await env.toDoDictionary.get("test"));
        } catch (error) {
            console.error(error);
        }
        console.log(request);
        const toDoForm = `<form><input type="text" id="to-do-entry"/><input type="submit" id='to-do-submit' value="Add"/></form>`;
        const response = new Response(toDoForm);
        response.headers.set("Access-Control-Allow-Origin", "*"); // Change this to deployment domain later
        return response;
    },
};
