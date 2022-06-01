import ApiRequest from "../utility/ApiRequest"

export default class AuditKajiUlangManajemen {
    getKajiUlangManajemenByID = async (kaji_ulang_manajemen_id) => {
        return await ApiRequest.set(`/sjph/audit_kaji_ulang_manajemen/kaji_ulang_manajemen/get/${kaji_ulang_manajemen_id}`, "GET")
    }

    createKajiUlangManajemen = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/audit_kaji_ulang_manajemen/kaji_ulang_manajemen/create/${sjph_id}`, 'POST', body)
    }

    editKajiUlangManajemen = async (kaji_ulang_manajemen_id,body) => {
        return await ApiRequest.set(`/sjph/audit_kaji_ulang_manajemen/kaji_ulang_manajemen/edit/${kaji_ulang_manajemen_id}`, 'PUT', body)
    }

}
