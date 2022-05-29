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
import {Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";


const BahanKepentinganHalalPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [checkpoint, setCheckpoint] = useState(0);
    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Daftar Bahan',
            icon: <FileText size={18} />,
            content: <DaftarBahanTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Halaman 2',
            subtitle: 'Daftar Bahan Setiap Produk',
            icon: <User size={18} />,
            content: <DaftarBahanDigunakanSetiapProdukForm
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },        {
            id: 'hal3',
            title: 'Halaman 3',
            subtitle: 'Catatan Pembelian Bahan',
            icon: <User size={18} />,
            content: <CatatanPembelianBahanTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Halaman 3',
            subtitle: 'Form Pemeriksaan Bahan',
            icon: <MapPin size={18} />,
            content: <FormPemeriksaanBahanTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'suratPernyataanBebasBabi',
            title: 'Halaman 4',
            subtitle: 'Surat Pernyataan Bebas Babi',
            icon: <Link size={18}/>,
            content: <SuratPernyataanBebasBabiForm
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern'/>
        },
        {
            id: 'suratPermohonanPersetujuanPenggunaanBahanBaru',
            title: 'Halaman 5',
            subtitle: 'Surat Permohonan Persetujuan Penggunaaan Bahan Baru',
            icon: <Link size={18} />,
            content: <CatatanPenyimpananBahanProdukTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        }
    ]
    const [progress, setProgress] = useState(48);

    useEffect(() => {
        if (checkpoint === 0) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 48
                    if (oldProgress === 50.3) {
                        return 50.3;
                    }
                    const diff = 4 * 10;
                    return Math.min(oldProgress + diff, 50.3);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 1) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 50.3
                    if (oldProgress === 52.6) {
                        return 52.6;
                    }
                    const diff = 4 * 10;
                    return Math.min(oldProgress + diff, 52.6);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 2) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 52.6
                    if (oldProgress === 54.9) {
                        return 54.9;
                    }
                    const diff = 4 * 10;
                    return Math.min(oldProgress + diff, 54.9);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }
        } else if (checkpoint === 3) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 54.9
                    if (oldProgress === 57.2) {
                        return 57.2;
                    }
                    const diff = 5 * 10;
                    return Math.min(oldProgress + diff, 57.2);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }

        } else if (checkpoint === 4) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 57.2
                    if (oldProgress === 59.5) {
                        return 59.5;
                    }
                    const diff = 5 * 10;
                    return Math.min(oldProgress + diff, 59.5);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }
        } else if (checkpoint === 5) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 59.5
                    if (oldProgress === 61.8) {
                        return 61.8;
                    }
                    const diff = 5 * 10;
                    return Math.min(oldProgress + diff, 61.8);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }
        } else {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 61.8
                    if (oldProgress === 64) {
                        return 64;
                    }
                    const diff = 5 * 10;
                    return Math.min(oldProgress + diff, 64);
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
    //             if (oldProgress === 64) {
    //                 return 64;
    //             }
    //             const diff = 8 * 10;
    //             return Math.min(oldProgress + diff, 64);
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

export default BahanKepentinganHalalPage
