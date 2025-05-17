import uploadFile from "alibaba/uploadFileImage";
import { Product, SubSectionProduct } from "database/models";
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
      return updateProduct(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function updateProduct(req, res) {
    const now = moment().local();
    try {
      await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
          if (err) return reject(err);

          // Temukan solusi yang ada
          const findProduct = await Product.findOne({});
          if (!findProduct) {
            return res.status(404).json({
              success: false,
              message: "Product not found",
            });
          }

          // Perbarui data solusi
          const data = {
            stitle: fields.stitle[0],
            sdescription: fields.sdescription[0],
            updated_at: now.format("YYYY-MM-DD HH:mm"),
          };

          // Perbarui solusi
          await findProduct.update(data);

          // Perbarui atau buat subsection
          const subSections = JSON.parse(fields.subSections);

          for (var i = 0; i < subSections.length; i++) {
            const findSubSection = await SubSectionProduct.findOne({
              where: {
                id_section: findProduct.id,
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
              await SubSectionProduct.create({
                id_section: findProduct.id,
                title: subSections[i].title,
                link: subSections[i].link,
                asset: logoUrl,
                created_at: now.format("YYYY-MM-DD HH:mm"),
                updated_at: now.format("YYYY-MM-DD HH:mm"),
              });
            }
          }

          const updatedProduct = await Product.findOne({
            where: {
              stitle: fields.stitle[0],
            },
          });

          return res.status(200).json({
            success: true,
            message: "Products updated successfully",
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
