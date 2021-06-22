console.clear();

const write = require('fs').writeFileSync;
const app = require('express')();
app.use(require('body-parser').json());
app.listen(9500, () => console.log('Waiting ~'));

const handle = (req, res) => {

    if (req.path !== '/dump') return res.status(404).end();
    res.status(200).end();

    const timestamp = Date.now();
    console.log('[~ Incoming]')

    let body = req.body;
    try { JSON.stringify(body) }
    catch { body = { raw: body } };

    const data = {
        body,
        __request_meta: {
            timestamp: timestamp,
            remoteAddress: req.connection.remoteAddress,
        }
    }


    write(`./data/${timestamp}.json`, JSON.stringify(data, null, 4));
    console.log(`[+ Data] ./data/${timestamp}.json`)

}

app.post('*', handle);
app.get('*', handle);
