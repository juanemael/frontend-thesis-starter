import {FileText, MapPin, User, Link as LinkIcon} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
import SuratPernyataanBebasBabiForm from "../../../forms/sjph/module_4/SuratPernyataanBebasBabiForm";
import DaftarBahanTable from "../../../tables/sjph/module_4/DaftarBahanTable";
import DaftarBahanDigunakanSetiapProdukForm from "../../../forms/sjph/module_4/DaftarBahanDigunakanSetiapProdukForm";
import CatatanPembelianBahanTable from "../../../tables/sjph/module_4/CatatanPembelianBahanTable";
import FormPemeriksaanBahanTable from "../../../tables/sjph/module_4/FormPemeriksaanBahanTable";
import CatatanPenyimpananBahanProdukTable from "../../../tables/sjph/module_4/CatatanPenyimpananBahanProdukTable";
import {Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";
import {Link} from "react-router-dom";
import SuratPermohonanPersetujuanPenggunaanBahanBaruTable
    from "../../../tables/sjph/module_4/SuratPermohonanPersetujuanPenggunaanBahanBaru";
import SJPHKuModels from "../../../../models/SJPHKu";

const BahanKepentinganHalalPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [checkpoint, setCheckpoint] = useState(0);
    const [detailsSJPH,setDetailsSJPH] = useState([])

    const sjphKuModel = new SJPHKuModels()

    const getSJPHInfo= async (id) => {
        try {
            const result = await sjphKuModel.getSelectedSJPH(id)
            setDetailsSJPH(result)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(()=>{
        getSJPHInfo(sessionStorage.sjph_id)
    },[])
    const steps = [
        {
            id: 'hal1',
            title: 'Wisata 1',
            subtitle: 'Daftar Bahan',
            icon: <FileText size={18} />,
            content: <DaftarBahanTable
                getSJPHInfo={getSJPHInfo} detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Wisata 2',
            subtitle: 'Daftar Bahan Setiap Produk',
            icon: <User size={18} />,
            content: <DaftarBahanDigunakanSetiapProdukForm
                getSJPHInfo={getSJPHInfo} detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },        {
            id: 'hal3',
            title: 'Wisata 3',
            subtitle: 'Catatan Pembelian Bahan',
            icon: <User size={18} />,
            content: <CatatanPembelianBahanTable
                getSJPHInfo={getSJPHInfo}  detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Wisata 4',
            subtitle: 'Form Pemeriksaan Bahan',
            icon: <MapPin size={18} />,
            content: <FormPemeriksaanBahanTable
                getSJPHInfo={getSJPHInfo} detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'suratPernyataanBebasBabi',
            title: 'Wisata 5',
            subtitle: 'Surat Pernyataan Bebas Babi',
            icon: <LinkIcon size={18}/>,
            content: <SuratPernyataanBebasBabiForm
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern'/>
        },
        {
            id: 'catatanPenyimpananBahanProduk',
            title: 'Wisata 6',
            subtitle: 'Catatan Penyimpanan Bahan dan Produk',
            icon: <LinkIcon size={18}/>,
            content: <CatatanPenyimpananBahanProdukTable
                getSJPHInfo={getSJPHInfo} detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern'/>
        },
        {
            id: 'suratPermohonanPersetujuanPenggunaanBahanBaru',
            title: 'Wisata 7',
            subtitle: 'Surat Permohonan Persetujuan Penggunaaan Bahan Baru',
            icon: <LinkIcon size={18} />,
            content: <SuratPermohonanPersetujuanPenggunaanBahanBaruTable
                getSJPHInfo={getSJPHInfo} detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
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
            {/*<Breadcrumb listClassName='breadcrumb-chevron'>*/}
            {/*    <BreadcrumbItem>*/}
            {/*        <Link to='/sjph/sjph_ku'> SJPH-ku </Link>*/}
            {/*    </BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>*/}
            {/*        <Link to='/sjph/informasi_umum_perusahaan'> Informasi Perusahaan </Link>*/}
            {/*    </BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>*/}
            {/*        <Link to='/sjph/kriteria_sistem_jaminan_produk_halal'> Kriteria Sistem Jaminan Produk Halal </Link>*/}
            {/*    </BreadcrumbItem>*/}
            {/*    <BreadcrumbItem>*/}
            {/*        <Link to='/sjph/kebijakan_dan_edukasi_halal'> Kebijakan dan Edukasi Halal </Link>*/}
            {/*    </BreadcrumbItem>*/}
            {/*    <BreadcrumbItem active>*/}
            {/*        <span> Bahan untuk Kepentingan Halal </span>*/}
            {/*    </BreadcrumbItem>*/}
            {/*</Breadcrumb>*/}
            <Breadcrumb listClassName='breadcrumb-chevron'>
                <BreadcrumbItem>
                    <Link to='/sjph/sjph_ku'> SJPH-ku </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/informasi_umum_perusahaan'> Informasi Perusahaan </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kriteria_sistem_jaminan_produk_halal'> Kriteria Sistem Jaminan Produk Halal </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kebijakan_dan_edukasi_halal'> Kebijakan dan Edukasi Halal </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span> Bahan untuk Kepentingan Halal </span>
                   </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kepentingan_produksi_dan_distribusi_produk'> Kepentingan Produksi dan Distribusi Produk </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kaji_ulang_manajemen'> Audit dan Kaji Ulang Manajemen </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Progress striped animated value={progress} />
            <Card>
                <CardHeader>
                    <CardTitle> Form SJPH: &nbsp;
                        <Badge color='success' pill>
                            {sessionStorage.nama_sjph}
                        </Badge> </CardTitle>
                </CardHeader>
                <CardBody>
                    <h4>Destinasi Keempat: &nbsp;
                        <Badge color='primary' pill>
                            Bahan untuk Kepentingan Halal
                        </Badge>
                    </h4>
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
