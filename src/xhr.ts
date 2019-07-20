import { AxiosRequestConfig, AxiosPromise, AxiosRespons } from "./types/index"
import { parseHeaders } from "./helpers/headers"

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise(resolve => {
        const { data = null, url, method = 'get', headers, responseType } = config  // 解构赋值
        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }
        request.open(method.toUpperCase(), url, true)

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) return
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
            resolve(response)
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