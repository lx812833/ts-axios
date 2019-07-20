const toString = Object.prototype.toString

export function isDate(val: any): val is Date { // 类型保护
    return toString.call(val) === '[object Date]'  // 判断是否是日期格式
}

export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object object]'
}

export function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}