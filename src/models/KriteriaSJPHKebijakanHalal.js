import ApiRequest from "../utility/ApiRequest"

export default class KriteriaSJPHKebijakanHalal {
     getKeteranganKriteria = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/get/${sjph_id}`, "GET")
    }

    getNamaPerusahaan = async (id) => {
        return await ApiRequest.set(`/sjph/nama_perusahaan/${id}`, "GET")
    }

    createKebijakanHalal = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/create/${sjph_id}`, 'POST', body)
    }
    createMediaKomunikasi = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/media_komunikasi/create/${sjph_id}`, 'POST', body)
    }
    getMediaKomunikasiAll = async () => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/media_komunikasi`, 'GET')
    }
    getMediaKomunikasiBySJPHId = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/media_komunikasi/${sjph_id}`, 'GET')
    }
}
