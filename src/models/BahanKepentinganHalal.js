import ApiRequest from "../utility/ApiRequest"

export default class BahanKepentinganHalal {
    getKeteranganKriteria = async (sjph_id) => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/get/${sjph_id}`, "GET")
    }

    getNamaPerusahaan = async (id) => {
        return await ApiRequest.set(`/sjph/nama_perusahaan/${id}`, "GET")
    }

    createKebijakanHalal = async (sjph_id,body) => {
        return await ApiRequest.set(`/sjph/kriteria_sjph/create/${sjph_id}`, 'POST', body)
    }
    createDaftarBahan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/daftar_bahan/create/${sjph_id}`, 'POST', body)
    }
    createCatatanPembelianBahan = async (sjph_id, body) => {
        return await ApiRequest.set(`/sjph/bahan_kepentingan_halal/catatan_pembelian_bahan/create/${sjph_id}`, 'POST', body)
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
}
