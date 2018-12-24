const fs = require('fs');
var path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const tags = ["cat, cute", "cat, cute","cat, cute","cat, cute","cat, cute","dog, woof", "dog, woof", "dog, woof", "dog, woof", "dog, woof", "bunny, fluffy", "bunny, fluffy", "bunny, fluffy", "bunny, fluffy", "bunny, fluffy"];

function getUID() {
    var now = Date.now();
    return `${now}.jpg`;
}

function upload(dirname, destination) {
    fs.readdir(dirname, (err, filenames) => {
        if (err) {
            console.log(err);
            return;
        }

        var i = 0;
        filenames.forEach( (filename) => {
            fs.readFile(dirname + filename, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    var uid = getUID();
                    var num = Math.floor(Math.random() * 10) + 2
                    // var payload = {
                        //     image: data,
                        //     uid: uid,
                        //     number: num,
                        //     tags: tags[i]
                        // };

                        var bodyFormData = new FormData();
                        bodyFormData.append('uid', uid);
                        bodyFormData.append('number', num);
                        bodyFormData.append('tags', tags[i]);
                        bodyFormData.append('image', data);

                        // console.log(bodyFormData);

                        // axios({
                        //     method: 'post',
                        //     url: `http://${destination}/upload`,
                        //     config: { headers: {'Content-Type': 'multipart/form-data' }},
                        //     data: bodyFormData
                        // })

                        axios.post(`http://${destination}/upload`, bodyFormData)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }
            });
            // i = i + 1;
        });
    });
}

var destination = process.argv[2];
var dirname     = path.join(__dirname, process.argv[3]);

upload(dirname, destination);
