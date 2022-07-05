import axios from 'axios'


const USER_API_URL = 'https://thawing-plateau-46522.herokuapp.com/api/v1'


class UserDataService {


    retrieveAllUsers() {

        return axios.get(`${USER_API_URL}/users`);
    }


    retrieveUser(id) {

        return axios.get(`${USER_API_URL}/users/${id}`);
    }


    deleteUser(id) {

        return axios.delete(`${USER_API_URL}/users/${id}`);
    }


    updateUser(id, user) {

        return axios.put(`${USER_API_URL}/users/${id}`, user);
    }


    createUser(user) {

        return axios.post(`${USER_API_URL}/users`, user);
    }
    // novo
    retrieveAllPopis() {

        return axios.get(`${USER_API_URL}/CijeliPopis`);
    }

    retrievePopis(id) {

        return axios.get(`${USER_API_URL}/CijeliPopis/${id}`);
    }


    deletePopis(id) {

        return axios.delete(`${USER_API_URL}/CijeliPopis/${id}`);
    }


    updatePopis(id, popis) {

        return axios.put(`${USER_API_URL}/CijeliPopis/${id}`, popis);
    }


    createPopis(popis) {

        return axios.post(`${USER_API_URL}/CijeliPopis`, popis);
    }

    createLikeDislike(id, likeDislike) {

        return axios.post(`${USER_API_URL}/rejting/${id}`, likeDislike);
    }

    createKoment(id, koment) {

        return axios.post(`${USER_API_URL}/komentar/${id}`, koment);
    }

    retrieveKoments(id) {

        return axios.get(`${USER_API_URL}/komentar/${id}`);
    }

    goToShopping() {

        return axios.get(`${USER_API_URL}/CijeliPopis`);
    }


}

export default new UserDataService()