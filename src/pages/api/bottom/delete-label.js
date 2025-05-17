import { Bottom } from "database/models";
var moment = require("moment");

import { apiHandler } from "helpers/api";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return deleteBottom(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function deleteBottom(req, res) {
        try {
            var now = moment().local();

            const findBottom = await Bottom.findOne({
                where: {
                    stitle: req.body.stitle,
                    sdescription: req.body.sdescription,
                    section: req.body.section,
                    button: req.body.button,
                    link: req.body.link,
                },
            });

            if (findBottom) {
                await Bottom.destroy({
                    where: {
                        stitle: req.body.stitle,
                        sdescription: req.body.sdescription,
                        button: req.body.button,
                        link: req.body.link,
                    },
                });

                return res.status(200).json({
                    success: true,
                    message: "Success",
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Delete Bottom Failed! Check The Title and Description",
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
