export const cache = global.cache ?? new Map<string, any>();
global.cache = cache;
console.log('cache module loaded')
