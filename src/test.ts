import { details } from './main';

details({ movie_id: 'tt2267998' }).then(response => console.log(response.data));