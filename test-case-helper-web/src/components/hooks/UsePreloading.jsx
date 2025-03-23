import { useState } from "react";

export const usePreloading = () => {
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            return <div>Loading...</div>
        }
    }, [loading])

    return {setLoading};
}