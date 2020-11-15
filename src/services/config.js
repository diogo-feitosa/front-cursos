import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://apirest-cursos.herokuapp.com/api',
});