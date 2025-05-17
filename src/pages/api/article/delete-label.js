import { Article } from "database/models";
var moment = require("moment");

import { apiHandler } from "helpers/api";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return deleteArticle(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function deleteArticle(req, res) {
        try {
            var now = moment().local();

            const findArticle = await Article.findOne({
                where: {
                    stitle: req.body.stitle,
                    sdescription: req.body.sdescription,
                    asset: req.body.asset,
                    title: req.body.button,
                    excerpts: req.body.excerpts,
                    link: req.body.link,
                },
            });

            if (findArticle) {
                await Article.destroy({
                    where: {
                        stitle: req.body.stitle,
                        sdescription: req.body.sdescription,
                        asset: req.body.asset,
                        title: req.body.button,
                        excerpts: req.body.excerpts,
                    },
                });

                return res.status(200).json({
                    success: true,
                    message: "Success",
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Delete Article Failed! Check The Title and Description",
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
