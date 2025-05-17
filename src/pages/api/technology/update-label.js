import uploadFile from "alibaba/uploadFileImage";
import { Technology, SubSectionTechnology } from "database/models";
import { IncomingForm } from "formidable";
import moment from "moment";

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
            return updateTechnology(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function updateTechnology(req, res) {
        const now = moment().local();
        try {
            await new Promise((resolve, reject) => {
                const form = new IncomingForm();
                form.parse(req, async (err, fields, files) => {
                    if (err) return reject(err);

                    // Temukan solusi yang ada
                    const findTechnology = await Technology.findOne({});
                    if (!findTechnology) {
                        return res.status(404).json({
                            success: false,
                            message: "Technology not found",
                        });
                    }

                    // Perbarui data solusi
                    const data = {
                        stitle: fields.stitle[0],
                        sdescription: fields.sdescription[0],
                        updated_at: now.format("YYYY-MM-DD HH:mm"),
                    };

                    // Perbarui solusi
                    await findTechnology.update(data);

                    // Parse Data subSections
                    const subSections = JSON.parse(fields.subSections);

                    for (var i = 0; i < subSections.length; i++) {
                        const findSubSection = await SubSectionTechnology.findOne({
                            where: {
                                id_section: findTechnology.id,
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
                                description: subSections[i].description,
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
                            await SubSectionTechnology.create({
                                id_section: findTechnology.id,
                                description: subSections[i].description,
                                link: subSections[i].link,
                                asset: logoUrl,
                                created_at: now.format("YYYY-MM-DD HH:mm"),
                                updated_at: now.format("YYYY-MM-DD HH:mm"),
                            });
                        }
                    }

                    return res.status(200).json({
                        success: true,
                        message: "Technologys updated successfully",
                        data: {
                            data: data,
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
