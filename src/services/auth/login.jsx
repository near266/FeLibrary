import request from '../../utils/httpRequest';

export const login = async ({ phoneNumber, password }) => {
    try {
        const res = await request.post('auth/login', { phoneNumber, password });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};
