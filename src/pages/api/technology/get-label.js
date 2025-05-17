import { apiHandler } from "helpers/api";
import { Op } from "sequelize";
import { Technology, SubSectionTechnology } from "database/models";

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { id, technoId, asset } = req.query; // Ambil id untuk Technology dan productIds untuk Subsection
            if (id) {
                return getLabelById(req, res, id);
            } else if (technoId) {
                return getLabelBySubsection(req, res, technoId);
            } else if (asset) {
                return getAsset(req, res, asset);
            } else {
                return getLabels();
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getLabelById(req, res, id) {
        try {
            const findOneLabel = await Technology.findByPk(id, {
                include: [
                    {
                        model: SubSectionTechnology,
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
            const findLabel = await Technology.findOne({
                where: {
                    ...getLabel,
                },
                include: [
                    {
                        model: SubSectionTechnology,
                        as: "subSections", // Alias yang digunakan dalam asosiasi
                    },
                ],
            });

            // const totalLabel = Math.ceil(findLabel.count / limit);

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

    async function getLabelBySubsection(req, res, technoId) {
        try {
            const subsections = await SubSectionTechnology.findAll({
                where: {
                    id_section: technoId, // Mengambil subsections berdasarkan id_section
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
                data: subsections, // Mengambil data subsection
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }

    async function getAsset(req, res, asset) {
        try {
            const getAsset = await SubSectionTechnology.findAll({
                where: {
                    id_section: asset, // Mengambil subsections berdasarkan id_section
                },
            });

            if (!getAsset.length) {
                return res.status(404).json({
                    success: false,
                    message: "No Asset found for this solutions sections",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Success",
                data: getAsset.map((subsection) => subsection.asset), // Mengembalikan hanya Asset
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }
}
