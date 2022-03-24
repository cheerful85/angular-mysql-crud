"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactsController_1 = __importDefault(require("../controllers/contactsController"));
class ContactsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', contactsController_1.default.list);
        this.router.get('/:id', contactsController_1.default.getOne);
        this.router.post('/', contactsController_1.default.create);
        this.router.put('/:id', contactsController_1.default.update);
        this.router.delete('/:id', contactsController_1.default.delete);
    }
}
const contactsRoutes = new ContactsRoutes();
exports.default = contactsRoutes.router;
