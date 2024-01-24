"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
exports.cache = (_a = global.cache) !== null && _a !== void 0 ? _a : new Map();
global.cache = exports.cache;
console.log('cache module loaded');
