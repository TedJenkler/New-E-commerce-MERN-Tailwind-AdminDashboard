"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const Request_1 = require("./Request");
class Api {
    getDomain() {
        return this.config.domain;
    }
    getRoot() {
        return this.config.root;
    }
    getBaseUrl() {
        const root = (this.config.root == undefined) ?
            "" :
            this.config.root;
        return `${this.config.domain}${root}`;
    }
    constructor(config) {
        this.config = config;
        this.instance = axios.default.create({
            baseURL: this.getBaseUrl(),
            responseType: "json",
        });
    }
    request(route) {
        return Request_1.Request.Create(this, route)
            .setOnTransformBody(this.config.onTransformBody)
            .setOnInjectHeader(this.config.onInjectHeader)
            .setOnTransformResponse(this.config.onTransformResponse);
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map