import ApiRequest from "../utility/ApiRequest"

export default class KepentinganProduksiDistribusiProduk {
    // <----------------------Catatan Hasil Produksi----------------------->
    createCatatanHasilProduksiByGroupID = async (group_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/create/${group_id}`, 'POST', body)
    }
    getAllCatatanHasilProduksiByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/get/${group_id}`, 'GET')
    }
    getAllCatatanHasilProduksiGroupBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi_group/get/${sjph_id}`, 'GET')
    }
    createCatatanHasilProduksiGroupBySJPHID = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi_group/create/${sjph_id}`, 'POST', body)
    }
    editCatatanHasilProduksiGroupByGroupID = async (self_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi_group/create/${self_id}`, 'PUT', body)
    }

    // <-------------------------------------------------------------------------------------->

    createCatatanDistribusiPenjualanProdukByGroupID = async (group_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/create/${group_id}`, 'POST', body)
    }
    getAllCatatanDistribusiPenjualanProdukByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/get/${group_id}`, 'GET')
    }
    getAllCatatanDistribusiPenjualanProdukGroupBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk_group/get/${sjph_id}`, 'GET')
    }
    createCatatanDistribusiPenjualanProdukGroupBySJPHID = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk_group/create/${sjph_id}`, 'POST', body)
    }
    editCatatanDistribusiPenjualanProdukGroupByGroupID = async (self_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk_group/create/${self_id}`, 'PUT', body)
    }


}
