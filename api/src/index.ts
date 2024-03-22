import {server} from "./Infrastructure/Http/Server";

server.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
