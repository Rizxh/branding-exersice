import { Technology } from "database/models";
var moment = require("moment");

import { apiHandler } from "helpers/api";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return deleteTechnology(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function deleteTechnology(req, res) {
        try {
            var now = moment().local();

            const findTechnology = await Technology.findOne({
                where: {
                    stitle: req.body.stitle,
                    sdescription: req.body.sdescription,
                    description: req.body.description,
                    link: req.body.link
                },
            });

            if (findTechnology) {
                await Technology.destroy({
                    where: {
                        stitle: req.body.stitle,
                        sdescription: req.body.sdescription,
                        description: req.body.description,
                        link: req.body.link
                    },
                });

                return res.status(200).json({
                    success: true,
                    message: "Success",
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Delete Data Failed! Check The Data",
                });
            }
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }
}
