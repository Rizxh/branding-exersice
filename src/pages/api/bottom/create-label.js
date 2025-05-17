import uploadFile from "alibaba/uploadFileImage";
import { Bottom } from "database/models";
import { IncomingForm } from "formidable";
var moment = require("moment");
var mv = require("mv");

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

                    const createBottom = await Bottom.create({
                        stitle: fields.stitle[0],
                        sdescription: fields.sdescription[0],
                        section: fields.section[0],
                        button: fields.button[0],
                        link: fields.link[0],

                        created_at: now.format("YYYY-MM-DD HH:mm"),
                        updated_at: now.format("YYYY-MM-DD HH:mm"),
                    });


                    const findBottom = await Bottom.findOne({
                        where: {
                            id: createBottom.id,
                        },
                    })

                    res.status(200).json({
                        success: true,
                        message: "Success",
                        data: findBottom,
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
