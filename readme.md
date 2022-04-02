# 🌿 yts.mx API wrapper for NodeJS

A promised based node module to interact with the yts.mx/api/v2

NOTE: The YTS API is not always working as intended. I have notified YTS about some issues, to this date I did not get any reply and the issues are not fixed.

One of the issues is that the `order_by` and `sort_by` params are not working with `seeds` and `peers`. The other *sort* options seem to be working fine.

Another problem is that some routes are not working at all, like the *movie comments* and *list upcomming* are not working and result into a `404 not found`. I have added the `@deprecated` flag to it, so you will be warned by your *IDE* when using these methods.

## 🪄 Installation

```typescript
npm install yts-api-node
```

## 🔌 API usage

### 📝 Search

###### Usage

```typescript
import { search } from 'yts-api-node';

// Search for movies with title 'The hobbit' and limit results by 50
search({ query_term: 'The hobbit', limit: 50 }).then(results => /** ... */)
```

###### Parameters
| Parameter        | Required | Type                                                                               | Default    | Description                                                          |
| ---------------- | -------- | ---------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| `limit`          | ❌        | 1 - 50                                                                             | 20         | Limit result per page                                                |
| `page`           | ❌        |                                                                                    | 1          | Used for paging                                                      |
| `quality`        | ❌        | `720p` `1080p` `2160p` `3D` `all`                                                  | All        | Filter by quality                                                    |
| `minimum_rating` | ❌        | 0 - 9                                                                              | 0          | Filter by minimum IMDb rating                                        |
| `query_term`     | ❌        | string                                                                             | ''         | Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code |
| `genre`          | ❌        | string                                                                             | All        | Filter by genre                                                      |
| `sort_by`        | ❌        | `title` `year` `rating` `peers` `seeds` `download_count` `like_count` `date_added` | date_added | Sort result                                                          |
| `order_by`       | ❌        | `asc` `desc`                                                                       | desc       | Ascending or Descending order                                        |

###### Response
```typescript
"status": string;
"status_message": string;
"data": {
    "movie_count": number;
    "limit":number;
    "page_number": number;
    "movies": [
        {
            "id": number;
            "url": string;
            "imdb_code": string;
            "title": string;
            "title_english": string;
            "title_long": string;
            "slug": string;
            "year": number;
            "rating": number;
            "runtime": number;
            "genres": string[];
            "summary": string;
            "description_full": string;
            "synopsis": string;
            "yt_trailer_code": string;
            "language": string;
            "mpa_rating": string;
            "background_image": string;
            "background_image_original": string;
            "small_cover_image": string;
            "medium_cover_image": string;
            "large_cover_image": string;
            "state": string;,
            "torrents": [
                {
                    "url": string;
                    "hash": string;
                    "quality": string;
                    "type": string;
                    "seeds": number;
                    "peers": number;
                    "size": string;
                    "size_bytes": number;
                    "date_uploaded": string;
                    "date_uploaded_unix": number;
                },
                //...
            ]
        },
        //...
    ]
"@meta": {
    "server_time": number;
    "server_timezone": string;
    "api_version": number;
    "execution_time": string;
}

```

### 📝 Details

###### Usage

```typescript
import { details } from 'yts-api-node';

// Can be a YTS movie ID or an IMDb ID
// This example uses an IMDb ID
details({ movie_id: 'tt2267998' }).then(results => /** ... */)
```

###### Parameters
| Parameter     | Required | Type              | Default | Description               |
| ------------- | -------- | ----------------- | ------- | ------------------------- |
| `movie_id`    | ✅        | `number` `string` |         | YTS movie ID or IMDb ID   |
| `with_images` | ❌        | boolean           | false   | Include images in result? |
| `with_cast`   | ❌        | boolean           | false   | Include cast in result?   |

###### Response
```javascript
{
    "status": string;
    "status_message": string;
    "data": {
        "movie": {
            "id": number;
            "url": string;
            "imdb_code": string;
            "title": string;
            "title_english": string;
            "title_long": string;
            "slug": string;
            "year": number;
            "rating": number;
            "runtime": number;
            "genres": string[];
            "download_count": number;
            "like_count": number;
            "description_intro": string;
            "description_full": string;
            "yt_trailer_code": string;
            "language": string;
            "mpa_rating": string;
            "background_image": string;
            "background_image_original": string;
            "small_cover_image": string;
            "medium_cover_image": string;
            "large_cover_image": string;
            "torrents": [
                {
                    "url": string;
                    "hash": string;
                    "quality": string;
                    "type": string;
                    "seeds": number;
                    "peers": number;
                    "size": string;
                    "size_bytes": number;
                    "date_uploaded": string;
                    "date_uploaded_unix": number;
                },
                // ...
            ]
            "date_uploaded": string;
            "date_uploaded_unix": number;
        }
    },
    "@meta": {
        "server_time": number;
        "server_timezone": string;
        "api_version": number;
        "execution_time": string;
    }
}
```

### 📝 Suggestions

###### Usage

```typescript
import { suggestions } from 'yts-api-node';

// Movie ID must be an YTS movie ID, IMDb ID's are not working
suggestions({ movie_id: 10 }).then(results => /** ... */)
```

###### Parameters
| Parameter  | Required | Type              | Default | Description  |
| ---------- | -------- | ----------------- | ------- | ------------ |
| `movie_id` | ✅        | `number` `string` |         | YTS movie ID |

###### Response

```typescript
{
    "status": string;
    "status_message": string;
    "data": {
        "movie_count": number;
        "movies": [
            "id": number;
            "url": string;
            "imdb_code": string;
            "title": string;
            "title_english": string;
            "title_long": string;
            "slug": string;
            "year": number;
            "rating": number;
            "runtime": number;
            "genres": string[];
            "summary": string;
            "description_full": string;
            "synopsis": string;
            "yt_trailer_code": string;
            "language": string;
            "mpa_rating": string;
            "background_image": string;
            "background_image_original": string;
            "small_cover_image": string;
            "medium_cover_image": string;
            "state": "ok",
            "torrents": [
                {
                    "url": string;
                    "hash": string;
                    "quality": string;
                    "seeds": number;
                    "peers": number;
                    "size": string;
                    "size_bytes": number;
                    "date_uploaded": string;
                    "date_uploaded_unix": number;
                },
                // ...
            ],
            "date_uploaded": string;
            "date_uploaded_unix": number;
        ]
    },
    "@meta": {
        "server_time": number;
        "server_timezone": string;
        "api_version": number;
        "execution_time": string;
    }
}
```

### 📝 Comments (not working)
Route does not exist on [yts.mx/api/v2/](https://yts.mx/api/v2/movie_comments.json).

https://yts.mx/api#movie_comments

###### Usage

```typescript
import { comments } from 'yts-api-node';

// Movie ID must be an YTS movie ID, IMDb ID's are not working
comments({ movie_id: 10 }).then(results => /** ... */)
```

###### Parameters
| Parameter  | Required | Type              | Default | Description  |
| ---------- | -------- | ----------------- | ------- | ------------ |
| `movie_id` | ✅        | `number` `string` |         | YTS movie ID |

### 📝 Reviews (not working)
Route does not exist on [yts.mx/api/v2/](https://yts.mx/api/v2/movie_reviews.json). 

https://yts.mx/api#movie_reviews

###### Usage

```typescript
import { reviews } from 'yts-api-node';

// Movie ID must be an YTS movie ID, IMDb ID's are not working
reviews({ movie_id: 10 }).then(results => /** ... */)
```

###### Parameters
| Parameter  | Required | Type              | Default | Description  |
| ---------- | -------- | ----------------- | ------- | ------------ |
| `movie_id` | ✅        | `number` `string` |         | YTS movie ID |

### 📝 Parentals

This is apparently not implemented yet in the YTS API, returned results show

```javascript
"parental_guide_text": "Parental Guide for all the movies will be republished soon. Thank you for understanding!"
```

###### Usage

```typescript
import { parentals } from 'yts-api-node';

// Movie ID must be an YTS movie ID, IMDb ID's are not working
parentals({ movie_id: 10 }).then(results => /** ... */)
```

###### Parameters
| Parameter  | Required | Type              | Default | Description  |
| ---------- | -------- | ----------------- | ------- | ------------ |
| `movie_id` | ✅        | `number` `string` |         | YTS movie ID |

```typescript
{
    "status": string;
    "status_message": string;
    "data": {
        "parental_guide_count": number;
        "parental_guides": [
            {
                "type": string;
                "parental_guide_text":string;
            }
        ]
    },
    "@meta": {
        "server_time": number;
        "server_timezone": string;
        "api_version": number;
        "execution_time": string;
    }
}
```

### 📝 Upcomming (not working)
Route does not exist on [yts.mx/api/v2/](https://yts.mx/api/v2/list_upcoming.json). 

https://yts.mx/api#list_upcoming

```typescript
import { upcomming } from 'yts-api-node';

upcomming().then(results => /** ... */)
```

###### Parameters
| Parameter  | Required | Type              | Default | Description  |
| ---------- | -------- | ----------------- | ------- | ------------ |
| `movie_id` | ✅        | `number` `string` |         | YTS movie ID |