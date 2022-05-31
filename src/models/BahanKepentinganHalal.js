import ApiRequest from "../utility/ApiRequest"

export default class BahanKepentinganHalal {
    createDaftarBahan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/create/${sjph_id}`, 'POST', body)
    }
    createCatatanPembelianBahan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/create/${sjph_id}`, 'POST', body)
    }
    createFormPemeriksaanBahan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/form_pemeriksaan_bahan/create/${sjph_id}`, 'POST', body)
    }
    createSuratPermohonanPersetujuanPenggunaanBahanBaru = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/create/${sjph_id}`, 'POST', body)
    }
    getDaftarBahanAll = async () => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/media_komunikasi`, 'GET')
    }
    getDaftarBahanBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/get/${sjph_id}`, 'GET')
    }
    getCatatanPembelianBahanBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/get/${sjph_id}`, 'GET')
    }
    getFormPemeriksaanBahanBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/form_pemeriksaan_bahan/get/${sjph_id}`, 'GET')
    }
    getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/get/${sjph_id}`, 'GET')
    }
}
