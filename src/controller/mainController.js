const axios = require('axios');

// Utility function to encode and decode base64
function encodeID(id) {
    return Buffer.from(id).toString('base64');
}

function decodeID(encodedID) {
    return Buffer.from(encodedID, 'base64').toString('ascii');
}

const index = async function (req, res) {
    res.render('index', { text: 'This is EJS' });
}

const staff = async function (req, res, next) {
    const decodedName = decodeID(req.params.name);
    let mainURL = ("http://staff-system.rupp.edu.kh/api/resource/Employee/" + decodedName).toString();

    try {
        const response = await axios.get(mainURL, {
            headers: { Authorization: "token 758918cedd8ac69:2129ee1699a8f2a" }
        });

        if (response.data && response.data.data) {
            res.render('staff', { data: response.data.data, encodedName: req.params.name });
        } else {
            res.status(404).render('404', { message: 'Staff not found' });
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).render('404', { message: 'Staff not found' });
        } else {
            next(error);
        }
    }
}

// New function to handle redirection from original to encoded URL
const redirectToEncoded = async function (req, res) {
    const originalID = req.params.name;
    const encodedID = encodeID(originalID);

    // Redirect to the encoded URL
    res.redirect(`/staff/${encodedID}`);
}

module.exports = { index, staff, redirectToEncoded };
