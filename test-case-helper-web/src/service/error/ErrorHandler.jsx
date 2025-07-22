import {Routes} from "../../constants/Route.js";

export const handleError = (error, navigate) => {
    const errorsRoutes = new Map([
        [404, Routes.ERROR_ROUTE],
        [400, Routes.ERROR_ROUTE],
    ]);

    const errors = new Map([
        [404, "Not found"],
        [400, "Bad request"],
        [401, "Unauthorized"],
    ]);

    const status = error.response?.status || 500;

    navigate(errorsRoutes.get(status) || "/error", {
        state: {
            errorCode: status,
            errorMessage: errors.get(status) || "Internal server error"
        }
    });
}