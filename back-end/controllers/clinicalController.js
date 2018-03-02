'use strict';
let Controller = require('baseComponents/controller');
let Logger = require('baseComponents/logger');
let Response = require('baseComponents/response');
var Path = require('path');

let clinicalController = new Controller();
clinicalController.router = function (controller) {
    controller.before(function (req, res, next) {
        // before action execute before every action
        Logger.info('Execute before every action');
        next();
    });

    controller.index(function (req, res, next) {
        try {
            let data = {
                name: "Manish Maharjan",
                pageName: "Home"
            };

            Response.render(res, 'clinical', data);
        } catch (error) {
            Response.renderErrorPage(res, '500', error);
        }
    });
};

clinicalController.route(Path.resolve(__filename));
module.exports = clinicalController;
