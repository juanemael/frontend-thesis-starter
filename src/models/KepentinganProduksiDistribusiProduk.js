import ApiRequest from "../utility/ApiRequest"

export default class KepentinganProduksiDistribusiProduk {
    createCatatanHasilProduksi = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/create/${sjph_id}`, 'POST', body)
    }
    createCatatanDistribusiPenjualanProduk = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/create/${sjph_id}`, 'POST', body)
    }
    getCatatanHasilProduksiBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/get/${sjph_id}`, 'GET')
    }
    getCatatanDistribusiPenjualanProdukBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/get/${sjph_id}`, 'GET')
    }

}
