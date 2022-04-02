import { search } from './main';

search({ query_term: 'Gone Girl' }).then(response => console.log(response.data));