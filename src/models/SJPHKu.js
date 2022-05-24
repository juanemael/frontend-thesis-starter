import ApiRequest from "../utility/ApiRequest"

export default class SJPHKu {
    getAllByUserID = async (user_id) => {
        return await ApiRequest.set(`/sjph/user/${user_id}`, "GET")
    }

    getNamaPerusahaan = async (id) => {
        return await ApiRequest.set(`/sjph/nama_perusahaan/${id}`, "GET")
    }

    createSJPH = async (body) => {
        return await ApiRequest.set(`/sjph`, 'POST', body)
    }

    deleteSJPH = async (id) => {
        return await ApiRequest.set(`/sjph/${id}`, 'DELETE')
    }

}
