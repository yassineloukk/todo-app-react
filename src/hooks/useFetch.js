import { useEffect, useState } from "react";

const useFetch = (url ) => {
    const [data, setData] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    let [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(results => {
                setIsLoading(false);
                setData(results);
            })
            .catch(error => {
                setIsLoading(false);
                setErrorMessage("There was an error.");
            })
    }, [url]);

    return { data, isLoading, errorMessage }
}

export default useFetch