import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Routes } from "../../constants/Route";

export const useError = () => {
    const[error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            navigate(Routes.HOME_ROUTE);
        }
    }, [error, navigate])

    return {setError};
}