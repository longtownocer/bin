export default function Asynchronous(objparams) {
    return new Promise((resolve, reject) => {
        $.ajax({
            dataType: 'jsonp',
            url: 'http://api.dagoogle.cn/news' + objparams.url,
            data: objparams.params
        }).then((ret) => {
            resolve(ret)
        }).catch((err) => {
            reject(err)
            console.log(err)
        })
    })
}
