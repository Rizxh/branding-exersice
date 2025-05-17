import { apiHandler } from "helpers/api";
import { Op } from "sequelize";
import { Solution, SubsectionSolution } from "database/models";

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const { id, solutionId, logo } = req.query; // Ambil id untuk Solution dan solutionId untuk Subsection
      if (id) {
        return getLabelById(req, res, id);
      } else if (solutionId) {
          return getLabelBySubsection(req, res, solutionId);
      } else if(logo) {
          return getLogo(req, res, logo);
      }
      else {
        return getLabels();
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getLabelById(req, res, id) {
    try {
      const findOneLabel = await Solution.findByPk(id, {
        include: [
          {
            model: SubsectionSolution,
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
      const findLabel = await Solution.findOne({
        where: {
          ...getLabel,
        },
        include: [
          {
            model: SubsectionSolution,
            as: "subSections", // Alias yang digunakan dalam asosiasi
          },
        ],
      });

      // const totalLabel = Math.ceil(findLabel.count / limit);

      res.status(200).json({
        success: true,
        message: "Success",
        data: findLabel,
        // total: findLabel.count,
        // totalLabel: totalLabel,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  }

  async function getLabelBySubsection(req, res, solutionId) {
    try {
        const subsections = await SubsectionSolution.findAll({
            where: {
                id_section: solutionId, // Mengambil subsections berdasarkan id_section
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

  async function getLogo(req, res, logo) {
    try {
        const getLogo = await SubsectionSolution.findAll({
            where: {
                id_section: logo, // Mengambil subsections berdasarkan id_section
            },
        });

        if (!getLogo.length) {
            return res.status(404).json({
                success: false,
                message: "No Logo found for this solutions sections",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Success",
            data: getLogo.map(subsection => subsection.logo), // Mengembalikan hanya logo
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        });
    }
  }

}
