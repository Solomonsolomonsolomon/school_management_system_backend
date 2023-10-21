"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance;
class MessagesController {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
}
exports.default = Object.freeze(new MessagesController());
