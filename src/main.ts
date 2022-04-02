import fetch from 'cross-fetch';
import * as YTS from './types/types';

/**
 * TODO: Implement proxy? 
 */
export const config: YTS.ConfigType = {
    baseUrl: 'https://yts.mx/api/v2/',
    format: 'json',
    paths: {
        search: '/list_movies',
        details: '/movie_details',
        suggestions: '/movie_suggestions',
        comments: '/movie_comments',
        reviews: '/movie_reviews',
        parentals: '/movie_parental_guides',
        upcomming: '/list_upcoming',
    }
}
/**
 * TypeScript compiler complains about strings only
 * This helper converts all params to strings
 * 
 * @param params 
 * @returns URLSearchParams
 */
function searchParams(params: Record<string, any>) {
    Object.keys(params).forEach(param => params[param] = params[param].toString())

    return new URLSearchParams(params);
}
/**
 * Send a request to YTS API
 * 
 * @param path      - path to api endpoint
 * @param params    - https://yts.mx/api
 * @param format    - json|jsonp|xml
 * @returns 
 */
async function doFetch(path: string, params?: URLSearchParams, format = config.format) {
    try {
        return await fetch(`${config.baseUrl}/${path}?${params}`.replace('///', '/')).then(async response => {
            if ( format === 'xml' ) {
                return await response.text();
            }

            return await response.json();
        });
    }
    catch(e) {
        if ( e instanceof Error ) {
            throw new YtsApiException(e.message, { cause: e })
        }
        
        throw new YtsApiException('Could not fullfill request');
    }
}
/**
 * Used to list and search through out all the available movies. Can sort, filter, search and order the results
 * 
 * @param params 
 * @param format 
 * @returns 
 */
export async function search(params?: YTS.ListMoviesParams, format?: YTS.ConfigType['format']): Promise<YTS.SearchResponse> {
    return await doFetch(`${config.paths.search}.${format || config.format}`, params ? searchParams(params) : undefined, format);
}
/**
 * Returns the information about a specific movie
 * 
 * @param params 
 * @param format 
 * @returns 
 */
export async function details(params?: YTS.MovieDetailsParams, format?: YTS.ConfigType['format']): Promise<YTS.DetailsResponse> {
    return await doFetch(`${config.paths.details}.${format || config.format}`, params ? searchParams(params) : undefined, format);
}
/**
 * Returns 4 related movies as suggestions for the user
 * 
 * @param params 
 * @param format 
 * @returns 
 */
export async function suggestions(params?: YTS.MovieSuggestions, format?: YTS.ConfigType['format']): Promise<YTS.SuggestionsResponse> {
    return await doFetch(`${config.paths.suggestions}.${format || config.format}`, params ? searchParams(params) : undefined, format);
}
/**
 * Returns all the comments for the specified movie
 * 
 * ! NOTE: The API route is broken, this function is non functional for the time being
 * ! Mabye in the future this will be working again. This is a YTS problem and not a package problem
 * ! As soon as these routings are working as intended I will remove the @deprecated marker

 * @deprecated This method is not working, API route is not working on YTS side
 * @param params 
 * @param format
 */
export async function comments(params?: YTS.MovieComments, format?: YTS.ConfigType['format']) {
    return await doFetch(`${config.paths.comments}.${format || config.format}`, params ? searchParams(params) : undefined, format);
}
/**
 * Returns all the IMDb movie reviews for the specified movie
 * 
 * ! NOTE: The API route is broken, this function is non functional for the time being
 * ! Mabye in the future this will be working again. This is a YTS problem and not a package problem
 * ! As soon as these routings are working as intended I will remove the @deprecated marker

 * @deprecated This method is not working, API route is not working on YTS side
 * @param params 
 * @param format 
 */
export async function reviews(params?: YTS.MovieReviews, format?: YTS.ConfigType['format']) {
    return await doFetch(`${config.paths.reviews}.${format || config.format}`, params ? searchParams(params) : undefined, format);
}
/**
 * Returns all the parental guide ratings for the specified movie
 * 
 * ! Apparently this is not yet implemented inside the YTS API
 * 
 * @param params 
 * @param format 
 * @returns 
 */
export async function parentals(params?: YTS.MovieParentalGuides, format?: YTS.ConfigType['format']) {
    return await doFetch(`${config.paths.parentals}.${format || config.format}`, params ? searchParams(params) : undefined, format);
}
/**
 * Returns the 4 latest upcoming movies
 * 
 * ! NOTE: The API route is broken, this function is non functional for the time being
 * ! Mabye in the future this will be working again. This is a YTS problem and not a package problem
 * ! As soon as these routings are working as intended I will remove the @deprecated marker

 * @deprecated This method is not working, API route is not working on YTS side
 * @param format 
 * @returns 
 */
export async function upcomming(format?: YTS.ConfigType['format']) {
    return await doFetch(`${config.paths.upcomming}.${format || config.format}`, undefined, format);
}

class YtsApiException extends Error {}