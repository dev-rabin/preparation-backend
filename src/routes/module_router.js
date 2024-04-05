const express = require("express");
const ModuleRouter = express.Router();
const ModuleController = require("../controllers/module_controller");


ModuleRouter.post("/createmodule",ModuleController.createModule);
ModuleRouter.get("/module",ModuleController.getModuleByCourseId);

module.exports = ModuleRouter;