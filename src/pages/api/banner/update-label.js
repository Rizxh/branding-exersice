import uploadFile from "alibaba/uploadFileImage";
import { Label } from "database/models";
import { IncomingForm } from "formidable";
var moment = require("moment");
var fs = require('fs');

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
            return updateLabel(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function updateLabel(req, res) {
        var now = moment().local();
        try {
            await new Promise((_resolve, reject) => {
                const form = new IncomingForm();
                form.parse(req, async (err, fields, files) => {
                    if (err) return reject(err);

                    const findLabel = await Label.findOne({
                        where: {
                            id: fields.id[0],
                        },
                    });

                    if (findLabel) {
                        const data = {
                            title: fields.title[0],
                            description: fields.description[0],
                            updated_at: now.format("YYYY-MM-DD HH:mm"),
                        };

                        if (files.logo) {
                            var imagePath = files.logo[0].filepath;
                            await uploadFile(imagePath, files.logo[0].originalFilename);

                            data.logo = `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${files.logo[0].originalFilename}`;
                        }

                        await findLabel.update(data);

                        const updatedLabel = await Label.findOne({
                            where: {
                                id: fields.id[0],
                            },
                        });

                        return res.status(200).json({
                            success: true,
                            message: "Label updated successfully",
                            data: updatedLabel,
                        });
                    } else {
                        return res.status(404).json({
                            success: false,
                            message: "Label not found",
                        });
                    }
                });
            });
        } catch (e) {
            console.error("Error:", e.message);
            return res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }
}
