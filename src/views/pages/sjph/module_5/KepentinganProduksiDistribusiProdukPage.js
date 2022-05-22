import KriteriaSistemJaminanProdukHalalForm from "../../../forms/sjph/module_2/KriteriaSistemJaminanProdukHalalForm";
import MediaKomunikasiTable from "../../../tables/sjph/module_2/MediaKomunikasiTable";
import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useRef, useState} from "react";
import SuratPernyataanBebasBabiForm from "../../../forms/sjph/module_4/SuratPernyataanBebasBabiForm";
import DaftarBahanTable from "../../../tables/sjph/module_4/DaftarBahanTable";
import DaftarBahanDigunakanSetiapProdukForm from "../../../forms/sjph/module_4/DaftarBahanDigunakanSetiapProdukForm";
import CatatanPembelianBahanTable from "../../../tables/sjph/module_4/CatatanPembelianBahanTable";
import FormPemeriksaanBahanTable from "../../../tables/sjph/module_4/FormPemeriksaanBahanTable";
import CatatanPenyimpananBahanProdukTable from "../../../tables/sjph/module_4/CatatanPenyimpananBahanProdukTable";
import LayoutDenahRuangProduksiForm from "../../../forms/sjph/module_5/LayoutDenahRuangProduksiForm";
import DiagramAlirProsesProduksiForm from "../../../forms/sjph/module_5/DiagramAlirProsesProduksiForm";
import CatatanDistribusiPenjualanProdukTable from "../../../tables/sjph/module_5/CatatanDistribusiPenjualanProdukTable";
import CatatanHasilProduksiTable from "../../../tables/sjph/module_5/CatatanHasilProduksiTable";


const KepentinganProduksiDistribusiProdukPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Layout Ruang Produksi',
            icon: <FileText size={18} />,
            content: <LayoutDenahRuangProduksiForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Halaman 2',
            subtitle: 'Diagram Alir Proses Produksi',
            icon: <User size={18} />,
            content: <DiagramAlirProsesProduksiForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal3',
            title: 'Halaman 3',
            subtitle: 'Catatan Pembelian Bahan',
            icon: <User size={18} />,
            content: <CatatanPembelianBahanTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Halaman 3',
            subtitle: 'Catatan Hasil Produksi',
            icon: <MapPin size={18} />,
            content: <CatatanHasilProduksiTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'catatanDistribusiPenjualanProduk',
            title: 'Halaman 4',
            subtitle: 'Catatan Distribusi Penjualan Produk',
            icon: <Link size={18}/>,
            content: <CatatanDistribusiPenjualanProdukTable stepper={stepper} type='wizard-modern'/>
        },
    ]
    return (
        <div>
            <Wizard
                type='modern-horizontal'
                ref={ref}
                steps={steps}
                options={{
                    linear: false
                }}
                instance={el => setStepper(el)}
            />
        </div>
    )
}

export default KepentinganProduksiDistribusiProdukPage
