const { expressjwt: expressJwt } = require("express-jwt");
const util = require("util");
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressJwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      `/api/admin/authenticate`,
      `/api/banner/create-label`,
      `/api/banner/get-label`,
      `/api/banner/update-label`,
      `/api/banner/delete-label`,
      `/api/solutions/create-label`,
      `/api/solutions/get-label`,
      `/api/solutions/update-label`,
      `/api/solutions/delete-label`,
      `/api/solutions/create-label`,
      `/api/product/get-label`,
      `/api/product/update-label`,
      `/api/product/delete-label`,
      `/api/product/create-label`,
      `/api/bottom/get-label`,
      `/api/bottom/update-label`,
      `/api/bottom/delete-label`,
      `/api/bottom/create-label`,
      `/api/videopage/get-label`,
      `/api/videopage/update-label`,
      `/api/videopage/delete-label`,
      `/api/videopage/create-label`,
      `/api/article/get-label`,
      `/api/article/update-label`,
      `/api/article/delete-label`,
      `/api/article/create-label`,
      `/api/technology/get-label`,
      `/api/technology/update-label`,
      `/api/technology/delete-label`,
      `/api/technology/create-label`,

    ],
  });

  return util.promisify(middleware)(req, res);
}
