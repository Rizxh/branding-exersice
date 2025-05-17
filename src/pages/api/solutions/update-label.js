import uploadFile from "alibaba/uploadFileImage";
import { Solution, SubsectionSolution } from "database/models";
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
      return updateSolution(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function updateSolution(req, res) {
    const now = moment().local();
    try {
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err);

          // Temukan solusi yang ada
          const findSolution = await Solution.findOne({});
          if (!findSolution) {
            return res.status(404).json({
              success: false,
              message: "Solution not found",
            });
          }

          // Perbarui data solusi
          const data = {
            stitle: fields.stitle[0],
            sdescription: fields.sdescription[0],
            updated_at: now.format("YYYY-MM-DD HH:mm"),
          };

          // Perbarui solusi
          await findSolution.update(data);

          // Perbarui atau buat subsection
          const subSections = JSON.parse(fields.subSections);

          for (var i = 0; i < subSections.length; i++) {
            const findSubSection = await SubsectionSolution.findOne({
              where: {
                id_section: findSolution.id,
                id: subSections[i].id,
              },
            });

            if (findSubSection) {
              var logoUrl = null;
              if (Object.keys(files).length > 0) {
                if (files["logo[]"][i].originalFilename != "blob") {
                  const imagePath = files["logo[]"][i].filepath;
                  await uploadFile(
                    imagePath,
                    files["logo[]"][i].originalFilename
                  );
                  logoUrl = `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${files["logo[]"][i].originalFilename}`;
                } else {
                  logoUrl = subSections[i].asset;
                }
              }
              // Perbarui subsection yang ada
              await findSubSection.update({
                title: subSections[i].title,
                description: subSections[i].description,
                logo: logoUrl,
                updated_at: now.format("YYYY-MM-DD HH:mm"),
              });
            } else {
              var logoUrl = null;
              if (Object.keys(files).length > 0) {
                if (files["logo[]"][i].originalFilename != "blob") {
                  const imagePath = files["logo[]"][i].filepath;
                  await uploadFile(
                    imagePath,
                    files["logo[]"][i].originalFilename
                  );
                  logoUrl = `https://xion1.oss-ap-southeast-5.aliyuncs.com/media/photo/${files["logo[]"][i].originalFilename}`;
                } else {
                  logoUrl = subSections[i].asset;
                }
              }
              // Buat subsection baru
              await SubsectionSolution.create({
                id_section: findSolution.id,
                title: subSections[i].title,
                description: subSections[i].description,
                logo: logoUrl,
                created_at: now.format("YYYY-MM-DD HH:mm"),
                updated_at: now.format("YYYY-MM-DD HH:mm"),
              });
            }
          }

          return res.status(200).json({
            success: true,
            message: "Solutions updated successfully",
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
