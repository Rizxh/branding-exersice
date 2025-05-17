import { Bottom, SubSectionBottom } from "database/models";
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
            return updateBottom(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function updateBottom(req, res) {
        const now = moment().local();
        try {
            await new Promise((resolve, reject) => {
                const form = new IncomingForm();
                form.parse(req, async (err, fields, files) => {
                    if (err) return reject(err);

                    // Temukan solusi yang ada
                    const findBottom = await Bottom.findOne({});
                    if (!findBottom) {
                        return res.status(404).json({
                            success: false,
                            message: "Bottom not found",
                        });
                    }

                    // Perbarui data solusi
                    const data = {
                        stitle: fields.stitle[0],
                        sdescription: fields.sdescription[0],
                        updated_at: now.format("YYYY-MM-DD HH:mm"),
                    };

                    // Perbarui solusi
                    await findBottom.update(data);

                    // Perbarui atau buat subsection
                    const subSections = JSON.parse(fields.subSections);

                    for (const subSection of subSections) {
                        const findSubSection = await SubSectionBottom.findOne({
                            where: {
                                id_section: findBottom.id,
                                id: subSection.id,
                            },
                        });

                        if (findSubSection) {
                            // Perbarui subsection yang ada
                            await findSubSection.update({
                                section: subSection.section,
                                button: subSection.button,
                                link: subSection.link,
                                updated_at: now.format("YYYY-MM-DD HH:mm"),
                            });
                        } else {
                            // Buat subsection baru
                            await SubSectionBottom.create({
                                id_section: findBottom.id,
                                section: subSection.section,
                                button: subSection.button,
                                link: subSection.link,
                                created_at: now.format("YYYY-MM-DD HH:mm"),
                                updated_at: now.format("YYYY-MM-DD HH:mm"),
                            });
                        }

                    }

                    const updatedBottom = await Bottom.findOne({
                        where: {
                            stitle: fields.stitle[0],
                        },
                    });

                    return res.status(200).json({
                        success: true,
                        message: "Bottoms updated successfully",
                        data: updatedBottom,
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
