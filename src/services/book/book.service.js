import axios from "axios";
import authHeader from "../auth/auth-header";
const user = JSON.parse(localStorage.getItem('user'));
const user1 = localStorage.getItem('user');
const API_URL = "http://localhost:8085/api/v1/book/";

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: { 'Authorization': 'Bearer ' + user.access_token }
});


const getAllbook = () => {
    console.log('tokennn  ' + user.access_token)
    return axios.get(API_URL + "getall", {}, {
        headers: { 'Authorization': user.access_token }
    }

    );
}

const getBookId = async (id) => {
    try {
        const res = await axios.get(API_URL + `getdetail?id=${id}`);

        return res.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
const AddBook = async (name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid) => {

    try {

        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('img', img);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('quantityTotal', quantityTotal);
        formData.append('quantityAvailabel ', quantityAvailabel);
        formData.append('Cateid', Cateid);

        const res = await axios.post(API_URL + "addbook", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
const UpdateBook = async (id, name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid) => {

    try {

        const formData = new FormData();
        formData.append('id', id);

        formData.append('title', title);
        formData.append('img', img);
        formData.append('author', author);
        formData.append('isbn', isbn);
        formData.append('publisher', publisher);
        formData.append('quantityTotal', quantityTotal);
        formData.append('quantityAvailabel ', quantityAvailabel);
        formData.append('Cateid', Cateid);

        const res = await axios.post(API_URL + "update", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
const bookService = {
    getAllbook,
    getBookId,
    AddBook,
    UpdateBook
};

export default bookService;