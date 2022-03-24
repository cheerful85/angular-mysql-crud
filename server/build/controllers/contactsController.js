"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ContactsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contacts = yield database_1.default.query('SELECT * FROM contacts');
            res.json(contacts);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'Listing contact ' + req.params.id});
            const { id } = req.params;
            const contacts = yield database_1.default.query('SELECT * FROM contacts WHERE id = ?', [id]);
            if (contacts.length > 0) {
                return res.json(contacts[0]);
            }
            res.status(404).json({ text: 'The contact doesn`t exists' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            try {
                yield database_1.default.query('INSERT INTO contacts SET ?', [req.body]);
                console.log(req.body);
                res.json({ message: 'Contact saved' });
            }
            catch (ER_DUP_ENTRY) {
                res.json({ message: 'Contact duplicated' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({ text: 'Updating the contact ' + req.params.id});
            const { id } = req.params;
            yield database_1.default.query('UPDATE contacts SET ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The contact was updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'Deleting the contact ' + req.params.id})
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM contacts WHERE id = ?', [id]);
            res.json({ message: 'Contact was deleted' });
        });
    }
}
const contactsController = new ContactsController();
exports.default = contactsController;
