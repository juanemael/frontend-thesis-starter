import KriteriaSistemJaminanProdukHalalForm from "../../../forms/sjph/module_2/KriteriaSistemJaminanProdukHalalForm";
import MediaKomunikasiTable from "../../../tables/sjph/module_2/MediaKomunikasiTable";
import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
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
import {Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";


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
            title: 'Halaman 4',
            subtitle: 'Catatan Hasil Produksi',
            icon: <MapPin size={18} />,
            content: <CatatanHasilProduksiTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'catatanDistribusiPenjualanProduk',
            title: 'Halaman 5',
            subtitle: 'Catatan Distribusi Penjualan Produk',
            icon: <Link size={18}/>,
            content: <CatatanDistribusiPenjualanProdukTable stepper={stepper} type='wizard-modern'/>
        },
    ]

    const [progress, setProgress] = useState(64);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 80) {
                    return 80;
                }
                const diff = 8 * 10;
                return Math.min(oldProgress + diff, 80);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <Progress striped animated value={progress} />
            <Card>
            <CardHeader>
                <CardTitle> Form SJPH:  {sessionStorage.nama_sjph} </CardTitle>
            </CardHeader>
            <CardBody>
            <Wizard
                type='modern-horizontal'
                ref={ref}
                steps={steps}
                options={{
                    linear: false
                }}
                instance={el => setStepper(el)}
            />
            </CardBody>
            </Card>
        </div>
    )
}

export default KepentinganProduksiDistribusiProdukPage
