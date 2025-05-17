import { apiHandler } from "helpers/api";
import { Op } from "sequelize";
import { Bottom, SubSectionBottom } from "database/models";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { id, bottomId } = req.query; // Ambil id untuk Bottom dan solutionId untuk Subsection
            if (id) {
                return getLabelById(req, res, id);
            } else if (bottomId) {
                return getLabelBySubsection(req, res, bottomId);
            }
            else {
                return getLabels();
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getLabelById(req, res, id) {
        try {
            const findOneLabel = await Bottom.findByPk(id, {
                include: [
                    {
                        model: SubSectionBottom,
                        as: "subSections", // Alias yang digunakan dalam asosiasi
                    },
                ],
            });

            if (!findOneLabel) {
                return res.status(404).json({
                    success: false,
                    message: "Data not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Success",
                data: findOneLabel,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }

    async function getLabels() {
        try {
            const { stitle, sdescription } = req.query;

            const getLabel = req.query.keywords
                ? {
                    [Op.or]: [
                        { stitle: { [Op.like]: `%${stitle}%` } },
                        { sdescription: { [Op.like]: `%${sdescription}%` } },
                    ],
                }
                : {};

            // const offset = (page - 1) * limit;
            const findLabel = await Bottom.findOne({
                where: {
                    ...getLabel,
                },
                include: [
                    {
                        model: SubSectionBottom,
                        as: "subSections", // Alias yang digunakan dalam asosiasi
                    },
                ],
            });

            res.status(200).json({
                success: true,
                message: "Success",
                data: findLabel,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }

    async function getLabelBySubsection(req, res, bottomId) {
        try {
            const subsections = await SubSectionBottom.findAll({
                where: {
                    id_section: bottomId, 
                },
            });

            if (!subsections.length) {
                return res.status(404).json({
                    success: false,
                    message: "No subsections found for this solution",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Success",
                data: subsections,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }

}
