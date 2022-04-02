export type ConfigType = {
    baseUrl: string;
    format: 'xml'|'json'|'jsonp';
    paths: {
        search: string;
        details: string;
        suggestions: string;
        comments: string;
        reviews: string;
        parentals: string;
        upcomming: string;
    }
}

export type MovieId = {
    movie_id: number;
}

export type ListMoviesParams = {
    limit?: number;
    page?: number;
    quality?: '720p'|'1080p'|'2160p'|'3D'|'All';
    minimum_rating?: number;
    query_term?: string;
    genre?: string;
    sort_by?: 'title'|'year'|'rating'|'peers'|'seeds'|'download_count'|'like_count'|'date_added';
    order_by?: 'desc'|'asc';
    with_rt_ratings?: boolean;
}
export type MovieDetailsParams = {
    movie_id: number|string; // can be either a YTS movie ID or IMDb ID
    with_images?: boolean;
    with_cast?: boolean;
}
export type MovieSuggestions = & MovieId;
export type MovieComments = & MovieId;
export type MovieReviews = & MovieId;
export type MovieParentalGuides = & MovieId;

export type Response<ResponseData> = {
    status: string;
    status_message: string;
    data: ResponseData,
    '@meta': ResponseMeta
}

export type ResponseMovies<Movies> = {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Movies[]
}

export type SearchResponse = Response<ResponseMovies<ResponseMovie>>
export type SuggestionsResponse = Response<ResponseMovies<ResponseMovie>>
export type DetailsResponse = Response<{
    movie: ResponseMovie;
}>

export type ResponseMeta = {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
}

export type ResponseMovie = {
    id: number;
    url: string;
    imdb_code: string;
    title: string;
    title_english: string;
    title_long: string;
    slug: string;
    year: number;
    rating: number;
    runtime: number;
    genres: string[];
    summary: string;
    description_full: string;
    synopsis: string;
    yt_trailer_code: string;
    language: string;
    mpa_rating: string;
    background_image: string;
    background_image_original: string;
    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;
    state: string;
    torrents: ResponseTorrent[],
    date_uploaded: string;
    date_uploaded_unix: number;
}

export type ResponseTorrent = {
    url: string;
    hash: string;
    quality: ResponseQuality;
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
}

export type ResponseQuality = '720p'|'1080p'|'2160p'|'3D'