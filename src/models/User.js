import ApiRequest from "../utility/ApiRequest"

export default class User {
    static login = async (email, password) => {
        return await ApiRequest.set('/ppkm/user/login', "POST", {
            email,
            password
        })
    }

    getAll = async () => {
        return await ApiRequest.set("/ppkm/users", "GET")
    }

    getById = async (admin_id) => {
        return await ApiRequest.set(`/ppkm/user/${admin_id}`, "GET")
    }

    deleteUser = async (id) => {
        return await ApiRequest.set(`/ppkm/user/${id}`, "DELETE")
    }

    updateUser = async (id, body) => {
        return await ApiRequest.set(`/ppkm/user/${id}`, "PUT", body)
    }

    changePassword = async (id, body) => {
        return await ApiRequest.set(`/ppkm/user/${id}`, "POST", body)
    }

    register = async (body) => {
        return await ApiRequest.set(`/ppkm/user/register`, 'POST', body)
    }

}
