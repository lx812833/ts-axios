import axios, { AxiosError } from "../../src/index"
import { AxiosError } from "../../src/helpers/error";

axios({
    method: 'get',
    url: '/error/get1',
}).then(res => {
    console.log("404", res)
}).catch(err => {
    console.log("404 error", err)
})

axios({
    method: 'get',
    url: '/error/get'
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

setTimeout(() => {
    axios({
        method: 'get',
        url: '/error/get'
    }).then(res => {
        console.log("超时", res)
    }).catch(err => {
        console.log("超时 error", err)
    })
}, 5000)

axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then(res => {
    console.log("超时", res)
}).catch((err: AxiosError) => {
    console.log("超时 error", err)
    console.log("超时 error message", err.message)
    console.log("超时 error code", err.code)
})