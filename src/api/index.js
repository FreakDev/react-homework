export default {
    get: (limit = 10, offset = 0, sort = 'id') => {
        return new Promise((resolve, fail) => {
            fetch (`http://localhost:8000/api?limit=${limit}&skip=${offset}&sort=${sort}`)
                .then(response => {
                    if (!response.ok)
                        throw new Error('http request fail')

                    return response
                })
                .then(response => response && response.text())
                .then(text => {
                    const dataText = '[' + text.trim().replace(/\n/g, ',') + ']'
                    console.log(dataText)
                    resolve(JSON.parse(dataText))
                })
                .catch(e => {
                    fail(e)
                })
        })
    },
    getAds: () => {

    }
}