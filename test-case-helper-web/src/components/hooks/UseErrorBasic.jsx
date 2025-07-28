import React, {useEffect, useState} from 'react';

export const useErrorBasic = () => {
    const[errorBasic, setErrorBasic] = useState([]);
    const[filteredErrors, setFilteredErrors] = useState([]);

    useEffect(() => {
        if (errorBasic) {
            const filtered = errorBasic.filter(err => err.errorCode === "VALIDATION_ERROR").map(err => err.errorMessage);
            setFilteredErrors(filtered);
        }
    }, [errorBasic])

    return {filteredErrors, setErrorBasic};
}