import { VideoPage } from "database/models";
var moment = require("moment");

import { apiHandler } from "helpers/api";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return deleteVideoPage(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function deleteVideoPage(req, res) {
        try {
            var now = moment().local();

            const findVideoPage = await VideoPage.findOne({
                where: {
                    title: req.body.title,
                    description: req.body.description,
                    title: req.body.title,
                    link: req.body.link
                },
            });

            if (findVideoPage) {
                await VideoPage.destroy({
                    where: {
                        stitle: req.body.stitle,
                        sdescription: req.body.sdescription,
                        title: req.body.title,
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
                    message: "Delete Data Failed! Check The Title and Description",
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
