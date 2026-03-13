import { AuthRoutes } from "@/features";
import { useRoutes } from "react-router-dom";

export const Router = () => {
    return useRoutes([
        AuthRoutes
    ])
}