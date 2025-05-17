import Label from "./label";
import Solution from "./solution";
import Product from "./product";
import VideoPage from "./video";
import Technology from "./technology";
import Article from "./article";
import Bottom from "./bottom";

import SubsectionSolution from "./subsection-solution";
import SubSectionProduct from "./subsection-product";
import SubSectionTechnology from "./subsection-technology";
import SubSectionArticle from "./subsection-article";
import SubSectionBottom from "./subsection-bottom";


Solution.hasMany(SubsectionSolution, {
  foreignKey: "id_section",
  sourceKey: "id",
  as: "subSections",
});

SubsectionSolution.hasOne(Solution, {
  foreignKey: "id",
  sourceKey: "id_section",
  as: "solution",
});

Product.hasMany(SubSectionProduct, {
  foreignKey: "id_section",
  sourceKey: "id",
  as: "subSections",
});

SubSectionProduct.hasOne(Product, {
  foreignKey: "id",
  sourceKey: "id_section",
  as: "product",
});

Technology.hasMany(SubSectionTechnology, {
  foreignKey: "id_section",
  sourceKey: "id",
  as: "subSections",
});

SubSectionTechnology.hasOne(Technology, {
  foreignKey: "id",
  sourceKey: "id_section",
  as: "technology",
});

Article.hasMany(SubSectionArticle, {
  foreignKey: "id_section",
  sourceKey: "id",
  as: "subSections",
});

SubSectionArticle.hasOne(Article, {
  foreignKey: "id",
  sourceKey: "id_section",
  as: "article",
});

Bottom.hasMany(SubSectionBottom, {
  foreignKey: "id_section",
  sourceKey: "id",
  as: "subSections",
});

SubSectionBottom.hasOne(Bottom, {
  foreignKey: "id",
  sourceKey: "id_section",
  as: "bottom",
});

export {
  Label,
  Solution,
  VideoPage,
  Bottom,
  Article,
  Product,
  Technology,
  SubsectionSolution,
  SubSectionProduct,
  SubSectionTechnology,
  SubSectionArticle,
  SubSectionBottom
};
