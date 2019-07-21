import { AxiosRequestConfig, AxiosPromise, AxiosRespons } from "./types/index"
import { parseHeaders } from "./helpers/headers"
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config  // 解构赋值
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        // 请求超时 默认为0
        if (timeout) {
            request.timeout = timeout
        }
        request.open(method.toUpperCase(), url, true)

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) return
            // 处理非 200 状态码
            if (request.status === 0) return
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            const response: AxiosRespons = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }
        // 网络错误
        request.onerror = function handleError() {
            reject(createError(
                'NetWork Error',
                config,
                null,
                request
            ))
        }

        request.ontimeout = function handleTimeout() {
            reject(createError(
                `Timeout of ${timeout} ms exceeded`,
                config,
                `ECONNABORTED`,  // Timeout
                request
            ))
        }

        // 处理非 200 状态码
        function handleResponse(response: AxiosRespons): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request,
                    response
                ))
            }
        }

        Object.keys(headers).forEach(name => {
            // data 为空的时候，请求 header 配置 Content-Type 是没有意义的
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)
    })
}