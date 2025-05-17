import uploadFile from "alibaba/uploadFileImage";
import { VideoPage } from "database/models";
import { IncomingForm } from "formidable";
var moment = require("moment");
var fs = require("fs");

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
            return updateVideopage(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function updateVideopage(req, res) {
        var now = moment().local();
        try {
            await new Promise((_resolve, reject) => {
                const form = new IncomingForm();
                form.parse(req, async (err, fields, files) => {
                    if (err) return reject(err);

                    const subSections = JSON.parse(fields.subSections);

                    for (var i = 0; i < subSections.length; i++) {
                        const findSubSection = await VideoPage.findOne({
                            where: {
                                id: subSections[i].id,
                            },
                        });

                        if (findSubSection) {
                            var logoUrl = null;
                            if (Object.keys(files).length > 0) {
                                if (files["asset[]"][i].originalFilename != "blob") {
                                    const imagePath = files["asset[]"][i].filepath;
                                    await uploadFile(
                                        imagePath,
                                        files["asset[]"][i].originalFilename
                                    );
                                    logoUrl = `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${files["asset[]"][i].originalFilename}`;
                                } else {
                                    logoUrl = subSections[i].asset;
                                }
                            }

                            // Perbarui subsection yang ada
                            await findSubSection.update({
                                title: subSections[i].title,
                                description: subSections[i].description,
                                button: subSections[i].button,
                                link: subSections[i].link,
                                asset: logoUrl,
                                updated_at: now.format("YYYY-MM-DD HH:mm"),
                            });
                        } else {
                            var logoUrl = null;
                            if (Object.keys(files).length > 0) {
                                if (files["asset[]"][i].originalFilename != "blob") {
                                    const imagePath = files["asset[]"][i].filepath;
                                    await uploadFile(
                                        imagePath,
                                        files["asset[]"][i].originalFilename
                                    );
                                    logoUrl = `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${files["asset[]"][i].originalFilename}`;
                                } else {
                                    logoUrl = subSections[i].asset;
                                }
                            }

                            // Buat subsection baru
                            await VideoPage.create({
                                title: subSections[i].title,
                                description: subSections[i].description,
                                button: subSections[i].button,
                                link: subSections[i].link,
                                asset: logoUrl,
                                created_at: now.format("YYYY-MM-DD HH:mm"),
                                updated_at: now.format("YYYY-MM-DD HH:mm"),
                            });
                        }
                    }

                    return res.status(200).json({
                        success: true,
                        message: "Videopage updated successfully",
                        data: {
                            data: subSections,
                            subsection: subSections.length,
                            files: files,
                        },
                    });
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
