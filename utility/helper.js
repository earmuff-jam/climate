import cacheData from "memory-cache";

/**
 * Function to cache data from the request url for a period of said hours. The time period is currently default to 24 hours.
 * @param {string} url 
 * @param {object} options 
 * @returns the response of the api. if the time period is crossed, the data is refetched.
 */
export const fetchWithCache = async (url, options) => {
    const value = cacheData.get(url);
    if (value) {
        return value;
    } else {
        const hours = 24;
        const res = await fetch(url, options);
        const data = await res.json();
        cacheData.put(url, data, hours * 1000 * 60 * 60);
        return data;
    };
};


/**
 * Function to encode the query parameters that are passed in.
 * @param {object} data 
 * @returns a string of combined query parameters
 */
export const encodeQuery = (data) => {
    let query = data.url
    for (let d in data.params)
        query += encodeURIComponent(d) + '='
            + encodeURIComponent(data.params[d]) + '&';
    return query.slice(0, -1);
};