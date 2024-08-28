const axios = require('axios');

const index = async function (req, res) {
    res.render('index', { text: 'This is EJS' });
}

const staff = async function (req, res, next) {
    try {
        console.log(req.params.id);
        let mainURL = ("http://staff-system.rupp.edu.kh/api/resource/Employee/" + req.params.id).toString();
        const response = await axios.get(mainURL, {
            headers: { Authorization: "token 758918cedd8ac69:2129ee1699a8f2a" }
        });

        if (response.data && response.data.data) {
            res.render('staff', { data: response.data.data });
        } else {
            // If the data is not found, trigger a 404 error
            res.status(404).render('404', { message: 'Staff not found' });
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Handle 404 error from API
            res.status(404).render('404', { message: 'Staff not found' });
        } else {
            // Handle other errors
            next(error); // Pass the error to the default Express error handler
        }
    }
}

module.exports = { index, staff };
