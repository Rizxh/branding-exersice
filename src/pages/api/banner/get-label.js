import { apiHandler } from "helpers/api";
import Label from "database/models/label"; // Ensure the correct path to the Label model

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { id } = req.query;
            if (id) {
                return getLabelById(req, res, id);
            } else {
                const { page = 1, limit = 10 } = req.query;
                return getLabels(req, res, parseInt(page), parseInt(limit));
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getLabelById(req, res, id) {
    try {
        const findOneLabel = await Label.findByPk(id);

        if (!findOneLabel) {
            return res.status(404).json({
                success: false,
                message: "Label not found",
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

async function getLabels(req, res, page, limit) {
    try {
        const { logo, title, description } = req.query;

        const getLabel = req.query.keywords
            ? {
                [Op.or]: [
                    { logo: { [Op.like]: `%${logo}%` } },
                    { title: { [Op.like]: `%${title}%` } },
                    { description: { [Op.like]: `%${description}%` } },
                ],
            }
            : {};

        const offset = (page - 1) * limit;
        const findLabel = await Label.findAndCountAll({
            where: {
                ...getLabel,
            },
            offset,
            limit,
        });

        const totalLabel = Math.ceil(findLabel.count / limit);

        res.status(200).json({
            success: true,
            message: "Success",
            data: findLabel.rows,
            total: findLabel.count,
            totalLabel: totalLabel,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}
