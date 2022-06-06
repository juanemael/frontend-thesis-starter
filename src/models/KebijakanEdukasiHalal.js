import ApiRequest from "../utility/ApiRequest"

export default class KebijakanEdukasiHalal {
    getKebijakanHalal = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/get/${sjph_id}`, "GET")
    }

    getNamaPerusahaan = async (id) => {
        return await ApiRequest.set(`/sjph/nama_perusahaan/${id}`, "GET")
    }

    createDaftarHadirPelatihanInternalForm = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/create/daftar_hadir_pelatihan_internal/form/${sjph_id}`, 'POST', body)
    }

    createEvaluasiPelatihanInternal = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/evaluasi_pelatihan_internal/create/${sjph_id}`, 'POST', body)
    }

    getDaftarHadirPelatihanInternal = async () => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/daftar_hadir_pelatihan_internal`, 'GET')
    }

    createSuratKeputusan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/surat_keputusan/create/${sjph_id}`, 'POST', body)
    }

    createSoalEvaluasiPelatihanEvaluasi = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/soal_evaluasi_pelatihan_evaluasi/create/${sjph_id}`, 'POST', body)
    }

    getSuratKeputusanBySJPHID = async (id) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/surat_keputusan/${id}`, 'GET')
    }
    editSuratKeputusanBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/surat_keputusan/edit/${self_id}`, 'PUT',body)
    }
    deleteSuratKeputusanBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/surat_keputusan/self/delete/${self_id}`, 'DELETE')
    }
    getEvaluasiPelatihanInternal = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kebijakan_edukasi_halal/soal_evaluasi_pelatihan_internal/get/${sjph_id}`, 'GET')
    }
}
