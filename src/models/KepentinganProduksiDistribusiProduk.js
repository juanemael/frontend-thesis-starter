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
    editCatatanHasilProduksiBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/edit/${self_id}`, 'PUT',body)
    }
    deleteCatatanHasilProduksiBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/self/delete/${self_id}`, 'DELETE')
    }
    deleteAllCatatanHasilProduksiByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi/all/delete/${group_id}`, 'DELETE')
    }
    deleteCatatanHasilProduksiGroupBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_hasil_produksi_group/self/delete/${self_id}`, 'DELETE')
    }
    // <-------------------------------------------------------------------------------------->
    // <----------------------CatatanDistribusiPenjualanProdu----------------------->
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
    editCatatanDistribusiPenjualanProdukBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/edit/${self_id}`, 'PUT',body)
    }
    deleteCatatanDistribusiPenjualanProdukBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/self/delete/${self_id}`, 'DELETE')
    }
    deleteAllCatatanDistribusiPenjualanProdukByGroupID = async (group_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk/all/delete/${group_id}`, 'DELETE')
    }
    deleteCatatanDistribusiPenjualanProdukGroupBySelfID = async (self_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/catatan_distribusi_penjualan_produk_group/self/delete/${self_id}`, 'DELETE')
    }
    // <-------------------------------------------------------------------------------------->
    // <----------------------LayoutDenahRuangProduksi----------------------->
    getLayoutDenahRuangProduksiBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/layout_denah_ruang_produksi/get/${sjph_id}`, 'GET')
    }
    createLayoutDenahRuangProduksiBySJPHID = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/layout_denah_ruang_produksi/create/${sjph_id}`, 'POST', body)
    }
    editLayoutDenahRuangProduksiBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/layout_denah_ruang_produksi/edit/${self_id}`, 'PUT',body)
    }
    // <-------------------------------------------------------------------------------------->
    // <----------------------DiagramAlirProsesProduksi----------------------->

    getDiagramAlirProsesProduksiBySJPHID = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/diagram_alir_proses_produksi/get/${sjph_id}`, 'GET')
    }
    createDiagramAlirProsesProduksiBySJPHID = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/diagram_alir_proses_produksi/create/${sjph_id}`, 'POST', body)
    }
    editDiagramAlirProsesProduksiBySelfID = async (self_id,body) =>{
        return await ApiRequest.set(`/sjph/kepentingan_produksi_distribusi_produk/diagram_alir_proses_produksi/edit/${self_id}`, 'PUT',body)
    }
}
