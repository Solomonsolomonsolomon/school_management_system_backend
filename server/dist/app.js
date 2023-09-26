"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const v1_1 = __importDefault(require("./routes/versions/v1"));
const path_1 = __importDefault(require("path"));
const server = (0, http_1.createServer)(server_1.default);
const port = process.env.PORT || 2020;
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
//version 1 of api
server_1.default.get("/", (req, res) => {
    res.json({
        status: "success",
        msg: "test end point hit",
    });
});
server_1.default.get("/frontend", (req, res) => {
    server_1.default.use(express_1.default.static(path_1.default.join(__dirname, "..", "clients", "dist")));
    res.sendFile(path_1.default.join(__dirname, "..", "client", "src", "dist", "index.html"));
});
server_1.default.use("/v1", v1_1.default);
server_1.default.use(globalErrorHandler_1.ErrorHandler);
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
