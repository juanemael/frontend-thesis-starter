import ApiRequest from "../utility/ApiRequest"
import SuratPernyataanBebasBabiForm from "../views/forms/sjph/module_4/SuratPernyataanBebasBabiForm";

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
    createSuratPernyataanBebasBabi = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_pernyataan_bebas_babi/create/${sjph_id}`, 'POST', body)
    }
    createProduk = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan_setiap_produk/create/${sjph_id}`, 'POST', body)
    }
    editSuratPernyataanBebasBabi = async (surat_pernyataan_bebas_babi_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_pernyataan_bebas_babi/edit/${surat_pernyataan_bebas_babi_id}`, 'PUT', body)
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
    getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID = async (surat_pernyataan_bebas_babi_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/get/${surat_pernyataan_bebas_babi_id}`, 'GET')
    }
    getSuratPernyataanBebasBabiByID = async (surat_pernyataan_bebas_babi_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_pernyataan_bebas_babi/get/${surat_pernyataan_bebas_babi_id}`, 'GET')
    }
}
