import { AxiosRequestConfig, AxiosRespons } from "../types"

export class AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosRespons


    constructor(
        message: string,
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosRespons
    ) {
        super(message)  // 继承Error 父类 XMLRequest已定义

        this.config = config
        this.code = code
        this.request = request
        this.response = response
        this.isAxiosError = true

        Object.setPrototypeOf(this, AxiosError.prototype)
    }
}


/**
 * func createError
 * desc: 修改关于错误对象创建部分的逻辑
 */
export function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosRespons
) {
    const error = new AxiosError(message, config, code, request, response)
    return error
}

