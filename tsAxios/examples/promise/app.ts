import axios from '../../src/index'

axios({
    method: 'post',
    url: '/promise/post',
    data: {
        a: 1,
        b: 2
    }
}).then(res => {
    console.log(res)
})

axios({
    method: 'post',
    url: '/promise/post',
    responseType: 'json',
    data: {
        c: 3,
        d: 4
    }
}).then(res => {
    console.log(res)
})
