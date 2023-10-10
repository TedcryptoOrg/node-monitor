import {create} from "../controllers/configurations/create";
import {findAll} from "../controllers/configurations/findAll";
import {update} from "../controllers/configurations/update";
import {deleteConfiguration} from "../controllers/configurations/delete";

// Configuration Router
const configurationRouter = require("express").Router();

configurationRouter.post("/", create)
configurationRouter.get("/", findAll)
configurationRouter.put("/:id", update)
configurationRouter.delete('/:id', deleteConfiguration)

export default configurationRouter;