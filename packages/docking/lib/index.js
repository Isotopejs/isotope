#!/usr/bin/env node
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
const tasks_1 = require("./tasks");
const storage_1 = require("./storage");
const cac_1 = __importDefault(require("cac"));
const config_1 = require("./config");
const cli = cac_1.default("Docking");
const storage = new storage_1.Storage();
cli.command("build", "Build the website for production").action(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield config_1.loadConfig();
    yield tasks_1.build(storage, config);
}));
cli.command("watch", "Start the development server").action(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield config_1.loadConfig();
    yield tasks_1.build(storage, config, false);
    tasks_1.watch(storage, config);
}));
cli.help();
cli.parse();
//# sourceMappingURL=index.js.map