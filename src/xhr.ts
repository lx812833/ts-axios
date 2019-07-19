import { AxiosRequestConfig } from "./types/index"

export default function xhr(config: AxiosRequestConfig): void {
    const { data = null, url, method = 'get' } = config  // 解构赋值
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}