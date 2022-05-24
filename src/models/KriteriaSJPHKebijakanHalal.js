import ApiRequest from "../utility/ApiRequest"

export default class KriteriaSJPHKebijakanHalal {
    getAll = async () => {
        return await ApiRequest.set("/sjph/company_profiles", "GET")
    }

    getNamaPerusahaan = async (id) => {
        return await ApiRequest.set(`/sjph/nama_perusahaan/${id}`, "GET")
    }

    createKebijakanHalal = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/kebijkakan_halal/create/${sjph_id}`, 'POST', body)
    }
    createMediaKomunikasi = async (body) => {
        return await ApiRequest.set(`/sjph/kebijakan_halal/media_komunikasi`, 'POST', body)
    }
    getMediaKomunikasiAll = async () => {
        return await ApiRequest.set(`/sjph/kebijakan_halal/media_komunikasi`, 'GET')
    }

}
