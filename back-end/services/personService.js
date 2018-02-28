let Model = require('models');

module.exports = {
    getPersonById: function (id) {
        return new Promise(function (resolve, reject) {
            Model.persons.findById(id).then(function (person) {
                if (person != null) {
                    return resolve(person.dataValues);
                } else {
                    return reject('Record not found');
                }
            }).catch(error=> {
                return reject(error);
            });
        });
    },
    getAllPersons: function () {
        return new Promise(function (resolve, reject) {
            Model.Persons.findAll().then(function (persons) {
                let personDataList = [];
                for (let person of persons) {
                    personDataList.push(person.dataValues);
                }
                return resolve(personDataList);
            }).catch(error=> {
                return reject(error);
            });
        });
    }
};