var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../data_accesss/user');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signup', async (req, res) => {
    var response = await User.signup(req, res);
    console.log("response", response)
    res.status(200).send(response).end();
})

router.post('/resend', async (req, res) => {
    var response = await User.resend(req, res);
    console.log(response)
    res.status(200).send(response).end();
})

router.get('/verify', async (req, res) => {
    var response = await User.verify(req, res, req.query.decoded);
    console.log(response)
    res.status(200).send(response).end();
})

router.post('/login', async (req, res) => {
    await User.login(req, res);
})

router.get('/forgotpassword', async (req, res) => {
    var response = await User.forgotpassword(req, res);
    res.status(200).send(response).end();

});

router.get('/resetverification', async (req, res) => {
    var response = await User.resetverification(req, res);
    if (response.success) {
        res.writeHead(301,
            { Location: response.Location }
        );
        res.end()
    }
    else {
        res.status(200).send(response).end();
    }
});

router.post('/request', async (req, res) => {
    var response = await User.request(req, res);
    res.status(200).send(response).end();
});

router.post('/confirm', async (req, res) => {
    var response = await User.confirm(req, res);
    res.status(200).send(response).end();
});

router.get('/check', async (req, res) => {
    var response = await User.checkuser(req, res);
    res.status(200).send(response).end();
});

router.get('/checkrefreshToken', async (req, res) => {
    var response = await User.checkrefreshToken(req, res);
    res.status(200).send(response).end();
});

module.exports = router