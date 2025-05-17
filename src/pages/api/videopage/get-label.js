import { apiHandler } from "helpers/api";
import VideoPage from "database/models/video"; // Ensure the correct path to the VideoPage model

export default apiHandler(handler);

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            const { id } = req.query;
            if (id) {
                return getVideoPageById(req, res, id);
            } else {
                const { page = 1, limit = 10 } = req.query;
                return getVideoPages(req, res, parseInt(page), parseInt(limit));
            }
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getVideoPageById(req, res, id) {
    try {
        const findOneVideoPage = await VideoPage.findByPk(id);

        if (!findOneVideoPage) {
            return res.status(404).json({
                success: false,
                message: "VideoPage not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Success",
            data: findOneVideoPage,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}

async function getVideoPages(req, res, page, limit) {
    try {
        const { asset, title, description, button, link } = req.query;

        const getVideoPage = req.query.keywords
            ? {
                [Op.or]: [
                    { asset: { [Op.like]: `%${asset}%` } },
                    { title: { [Op.like]: `%${title}%` } },
                    { description: { [Op.like]: `%${description}%` } },
                    { button: { [Op.like]: `%${button}%` } },
                    { link: { [Op.like]: `%${link}%` } },
                ],
            }
            : {};

        const offset = (page - 1) * limit;
        const findVideoPage = await VideoPage.findAndCountAll({
            where: {
                ...getVideoPage,
            },
            offset,
            limit,
        });

        const totalVideoPage = Math.ceil(findVideoPage.count / limit);

        res.status(200).json({
            success: true,
            message: "Success",
            data: findVideoPage.rows,
            total: findVideoPage.count,
            totalVideoPage: totalVideoPage,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
}
