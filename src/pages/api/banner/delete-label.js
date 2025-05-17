import { Label } from "database/models";
var moment = require("moment");

import { apiHandler } from "helpers/api";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return deleteLabel(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function deleteLabel(req, res) {
        try {
            var now = moment().local();

            const findLabel = await Label.findOne({
                where: {
                    title: req.body.title,
                    description: req.body.description,
                },
            });

            if (findLabel) {
                await Label.destroy({
                    where: {
                        title: req.body.title,
                        description: req.body.description,
                    },
                });

                return res.status(200).json({
                    success: true,
                    message: "Success",
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Delete Label Failed! Check The Title and Description",
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
