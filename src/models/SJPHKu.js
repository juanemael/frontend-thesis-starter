import ApiRequest from "../utility/ApiRequest"

export default class SJPHKu {
    getAllByUserID = async (user_id) => {
        return await ApiRequest.set(`/sjph/user/${sessionStorage.user_id}`, "GET")
    }

    getAll = async () => {
        return await ApiRequest.set(`/sjph`, "GET")
    }
    getSelectedSJPH = async () => {
        return await ApiRequest.set(`/sjph/selected/get/${sessionStorage.sjph_id}`, "GET")
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
    editTempatTanggalKeputusanSJPH = async (sjph_id,body) =>{
        return await ApiRequest.set(`/sjph/tempat_tanggal_keputusan/edit/${sjph_id}`, 'PUT',body)
    }

}
