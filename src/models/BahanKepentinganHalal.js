import ApiRequest from "../utility/ApiRequest"
import SuratPernyataanBebasBabiForm from "../views/forms/sjph/module_4/SuratPernyataanBebasBabiForm";

export default class BahanKepentinganHalal {

    //<----------------------Catatan Pembelian Bahan Produk----------------------->
    createCatatanPembelianBahanByGroupID = async (group_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/create/${group_id}`, 'POST', body)
    }
    createCatatanPembelianBahanGroup = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan_group/create/${sjph_id}`, 'POST', body)
    }
    getAllCatatanPembelianBahanByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/get/${group_id}`, 'GET')
    }
    getCatatanPembelianBahanGroupBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan_group/get/${sjph_id}`, 'GET')
    }
    editCatatanPembelianGroup = async (group_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan_group/edit/${group_id}`, 'PUT',body)
    }
    deleteCatatanPembelianBahanBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/self/delete/${self_id}`, 'DELETE')
    }
    editCatatanPembelianBahanBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/edit/${self_id}`, 'PUT',body)
    }
    deleteAllCatatanPembelianBahanByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/all/delete/${group_id}`, 'DELETE')
    }
    deleteCatatanPembelianBahanGroupBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan_group/self/delete/${self_id}`, 'DELETE')
    }
    // <-------------------------------------------------------------------------------------->

    //<----------------------Catatan Penyimpanan Bahan Produk----------------------->
    createCatatanPenyimpananBahanProdukGroupBySJPHID = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk_group/create/${sjph_id}`, 'POST', body)
    }
    createCatatanPenyimpananBahanProdukByGroupID = async (group_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk/create/${group_id}`, 'POST', body)
    }
    getAllCatatanPenyimpananBahanProdukGroupBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk_group/get/${sjph_id}`, 'GET')
    }
    getAllCatatanPenyimpananBahanProdukByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk/get/${group_id}`, 'GET')
    }
    editCatatanPenyimpananBahanProdukGroupByGroupID = async (group_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk_group/edit/${group_id}`, 'PUT',body)
    }
    editCatatanPenyimpananBahanProdukBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk/edit/${self_id}`, 'PUT',body)
    }
    deleteCatatanPenyimpananBahanProdukBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk/self/delete/${self_id}`, 'DELETE')
    }
    deleteAllCatatanPenyimpananBahanProdukByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk/all/delete/${group_id}`, 'DELETE')
    }
    deleteCatatanPenyimpananBahanProdukGroupBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_penyimpanan_bahan_produk_group/self/delete/${self_id}`, 'DELETE')
    }
    // <-------------------------------------------------------------------------------------->

    //<----------------------Daftar Bahan----------------------->
    getDaftarBahanAll = async () => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/media_komunikasi`, 'GET')
    }
    getAllDaftarBahanBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/all/get/${sjph_id}`, 'GET')
    }
    createDaftarBahanByGroupID = async (group_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/create/${group_id}`, 'POST', body)
    }
    createDaftarBahanGroupBySJPHID = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan_group/create/${sjph_id}`, 'POST', body)
    }
    getAllDaftarBahanGroupBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan_group/get/${sjph_id}`, 'GET')
    }
    getAllDaftarBahanByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/get/${group_id}`, 'GET')
    }
    editDaftarBahanGroupByGroupID = async (group_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan_group/edit/${group_id}`, 'PUT',body)
    }
    editDaftarBahanBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/edit/${self_id}`, 'PUT',body)
    }
    deleteDaftarBahanBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/self/delete/${self_id}`, 'DELETE')
    }
    deleteAllDaftarBahanByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/all/delete/${group_id}`, 'DELETE')
    }
    deleteDaftarBahanGroupBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan_group/self/delete/${self_id}`, 'DELETE')
    }

    // <-------------------------------------------------------------------------------------->


    getFormPemeriksaanBahanBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/form_pemeriksaan_bahan/get/${sjph_id}`, 'GET')
    }
    createFormPemeriksaanBahan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/form_pemeriksaan_bahan/create/${sjph_id}`, 'POST', body)
    }
    editFormPemeriksaanBahanBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/form_pemeriksaan_bahan/edit/${self_id}`, 'PUT',body)
    }
    deleteFormPemeriksaanBahanBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/form_pemeriksaan_bahan/self/delete/${self_id}`, 'DELETE')
    }


    getSuratPermohonanPersetujuanPenggunaanBahanBaruBySJPHID = async (surat_pernyataan_bebas_babi_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/get/${surat_pernyataan_bebas_babi_id}`, 'GET')
    }
    createSuratPermohonanPersetujuanPenggunaanBahanBaru = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/create/${sjph_id}`, 'POST', body)
    }
    editSuratPermohonanPersetujuanPenggunaanBahanBaruBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/edit/${self_id}`, 'PUT',body)
    }
    deleteSuratPermohonanPersetujuanPenggunaanBahanBaruBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_permohonan_persetujuan_penggunaan_bahan_baru/self/delete/${self_id}`, 'DELETE')
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
    getDaftarBahanProdukBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan_setiap_produk/get/${sjph_id}`, 'GET')
    }
    // getCatatanPembelianBahanBySJPHID = async (sjph_id) => {
    //     return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/get/${sjph_id}`, 'GET')
    // }

    getSuratPernyataanBebasBabiByID = async (surat_pernyataan_bebas_babi_id) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/surat_pernyataan_bebas_babi/get/${surat_pernyataan_bebas_babi_id}`, 'GET')
    }

}
