import uploadFile from "alibaba/uploadFileImage";
import { Article } from "database/models";
import { IncomingForm } from "formidable";
var moment = require("moment");

export const config = {
    api: {
        bodyParser: false,
    },
};

import { apiHandler } from "helpers/api";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return saveMenu();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function saveMenu() {
        try {
            var now = moment().local();

            await new Promise((resolve, reject) => {
                const form = new IncomingForm();
                form.parse(req, async (err, fields, files) => {
                    if (err) return reject(err);
                    var fs = require('fs');

                    if (files.asset) {
                        var imagePath = files.asset[0].filepath
                        await uploadFile(imagePath, files.asset[0].originalFilename)
                    }

                    const createArticle = await Article.create({
                        stitle: fields.stitle[0],
                        sdescription: fields.sdescription[0],
                        title: fields.title[0],
                        excerpts: fields.excerpts[0],
                        link: fields.link[0],
                        asset: `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${files.asset[0].originalFilename}`,

                        created_at: now.format("YYYY-MM-DD HH:mm"),
                        updated_at: now.format("YYYY-MM-DD HH:mm"),
                    });


                    const findArticle = await Article.findOne({
                        where: {
                            id: createArticle.id,
                        },
                    })

                    res.status(200).json({
                        success: true,
                        message: "Success",
                        data: findArticle,
                    });
                });
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }
}
