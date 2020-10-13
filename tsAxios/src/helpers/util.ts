const toString = Object.prototype.toString

/**
 * @param val is Date 类型保护
 * 判断是否是日期格式
 */
export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}

/**
 * @param val 判断是否是（普通）对象
 */
export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]'
}

/**
 * @param val encodeURIComponent
 * 
 * encodeURIComponent()函数通过将一个，两个，三个或四个表示字符的UTF-8编码的转义序列
 * 替换某些字符的每个实例来编码 URI 
 * （对于由两个“代理”字符组成的字符而言，将仅是四个转义序列） 
 */
export function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}