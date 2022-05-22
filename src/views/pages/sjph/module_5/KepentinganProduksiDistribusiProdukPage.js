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


const KepentinganProduksiDistribusiProdukPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Daftar Bahan',
            icon: <FileText size={18} />,
            content: <DaftarBahanTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Halaman 2',
            subtitle: 'Daftar Bahan Setiap Produk',
            icon: <User size={18} />,
            content: <DaftarBahanDigunakanSetiapProdukForm stepper={stepper} type='wizard-modern' />
        },        {
            id: 'hal3',
            title: 'Halaman 3',
            subtitle: 'Catatan Pembelian Bahan',
            icon: <User size={18} />,
            content: <CatatanPembelianBahanTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Halaman 3',
            subtitle: 'Form Pemeriksaan Bahan',
            icon: <MapPin size={18} />,
            content: <FormPemeriksaanBahanTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'suratPernyataanBebasBabi',
            title: 'Halaman 4',
            subtitle: 'Surat Pernyataan Bebas Babi',
            icon: <Link size={18}/>,
            content: <SuratPernyataanBebasBabiForm stepper={stepper} type='wizard-modern'/>
        },
        {
            id: 'suratPermohonanPersetujuanPenggunaanBahanBaru',
            title: 'Halaman 4',
            subtitle: 'Surat Permohonan Persetujuan Penggunaaan Bahan Baru',
            icon: <Link size={18} />,
            content: <CatatanPenyimpananBahanProdukTable stepper={stepper} type='wizard-modern' />
        }
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
