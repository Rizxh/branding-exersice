import uploadFile from "alibaba/uploadFileImage";
import { Solution, SubsectionSolution } from "database/models";
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

                    if (files.logo) {
                        var imagePath = files.logo[0].filepath
                        await uploadFile(imagePath, files.logo[0].originalFilename)
                    }

                    const createSolution = await Solution.create({
                        stitle: fields.stitle[0],
                        sdescription: fields.sdescription[0],

                        created_at: now.format("YYYY-MM-DD HH:mm"),
                        updated_at: now.format("YYYY-MM-DD HH:mm"),
                    });

                    const solutions = JSON.parse(fields.solutions[0])

                    for(let i = 0; i < solutions.length; i++) {
                        let subsection = await SubsectionSolution.create({
                            solution_id: createSolution.id,
                            title: solutions[i].title,
                            description: solutions[i].description,
                            logo: `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${solutions.logo[0].originalFilename}`,

                            created_at: now.format("YYYY-MM-DD HH:mm"),
                            updated_at: now.format("YYYY-MM-DD HH:mm"),
                        });
                    }

                    res.status(200).json({
                        success: true,
                        message: "Success",
                        data: findSolution,
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
