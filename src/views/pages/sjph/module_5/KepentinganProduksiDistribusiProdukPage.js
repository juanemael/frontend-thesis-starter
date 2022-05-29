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
    const [checkpoint, setCheckpoint] = useState(0);
    const steps = [
        {
            id: 'hal1',
            title: 'Wisata 1',
            subtitle: 'Layout Ruang Produksi',
            icon: <FileText size={18} />,
            content: <LayoutDenahRuangProduksiForm
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Wisata 2',
            subtitle: 'Diagram Alir Proses Produksi',
            icon: <User size={18} />,
            content: <DiagramAlirProsesProduksiForm
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Wisata 3',
            subtitle: 'Catatan Hasil Produksi',
            icon: <MapPin size={18} />,
            content: <CatatanHasilProduksiTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'catatanDistribusiPenjualanProduk',
            title: 'Wisata 4',
            subtitle: 'Catatan Distribusi Penjualan Produk',
            icon: <Link size={18}/>,
            content: <CatatanDistribusiPenjualanProdukTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern'/>
        },
    ]

    const [progress, setProgress] = useState(64);

    useEffect(() => {
        if (checkpoint === 0) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 64
                    if (oldProgress === 67.2) {
                        return 67.2;
                    }
                    const diff = 6 * 10;
                    return Math.min(oldProgress + diff, 67.2);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 1) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 67.2
                    if (oldProgress === 70.4) {
                        return 70.4;
                    }
                    const diff = 6 * 10;
                    return Math.min(oldProgress + diff, 70.4);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 2) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 70.4
                    if (oldProgress === 73.6) {
                        return 73.6;
                    }
                    const diff = 6 * 10;
                    return Math.min(oldProgress + diff, 73.6);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }
        } else if (checkpoint === 3) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 73.6
                    if (oldProgress === 76.8) {
                        return 76.8;
                    }
                    const diff = 7 * 10;
                    return Math.min(oldProgress + diff, 76.8);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }

        } else {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 76.8
                    if (oldProgress === 80) {
                        return 80;
                    }
                    const diff = 7 * 10;
                    return Math.min(oldProgress + diff, 80);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }
        }
    }, [checkpoint]);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((oldProgress) => {
    //             if (oldProgress === 80) {
    //                 return 80;
    //             }
    //             const diff = 8 * 10;
    //             return Math.min(oldProgress + diff, 80);
    //         });
    //     }, 500);
    //
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

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
                setCheckpoint={setCheckpoint}
            />
            </CardBody>
            </Card>
        </div>
    )
}

export default KepentinganProduksiDistribusiProdukPage
