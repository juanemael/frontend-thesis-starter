import {FileText, Link as LinkIcon, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
import LayoutDenahRuangProduksiForm from "../../../forms/sjph/module_5/LayoutDenahRuangProduksiForm";
import DiagramAlirProsesProduksiForm from "../../../forms/sjph/module_5/DiagramAlirProsesProduksiForm";
import CatatanDistribusiPenjualanProdukTable from "../../../tables/sjph/module_5/CatatanDistribusiPenjualanProdukTable";
import CatatanHasilProduksiTable from "../../../tables/sjph/module_5/CatatanHasilProduksiTable";
import {Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";
import {Link} from "react-router-dom";
import SJPHKuModels from "../../../../models/SJPHKu";

const KepentinganProduksiDistribusiProdukPage = () => {
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
                detailsSJPH={detailsSJPH} setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'catatanDistribusiPenjualanProduk',
            title: 'Wisata 4',
            subtitle: 'Catatan Distribusi Penjualan Produk',
            icon: <LinkIcon size={18}/>,
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
                    if (oldProgress === 68) {
                        return 68;
                    }
                    const diff = 6 * 10;
                    return Math.min(oldProgress + diff, 68);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 1) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 68
                    if (oldProgress === 72) {
                        return 72;
                    }
                    const diff = 6 * 10;
                    return Math.min(oldProgress + diff, 72);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 2) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 72
                    if (oldProgress === 76) {
                        return 76;
                    }
                    const diff = 7 * 10;
                    return Math.min(oldProgress + diff, 76);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            }
        } else {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 76
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
                <BreadcrumbItem>
                    <Link to='/sjph/bahan_untuk_kepentingan_halal'> Bahan untuk Kepentingan Halal </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span> Kepentingan Produksi dan Distribusi Produk </span>
                    </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kaji_ulang_manajemen'> Audit dan Kaji Ulang Manajemen </Link>
                </BreadcrumbItem>
            </Breadcrumb>
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
            {/*    <BreadcrumbItem>*/}
            {/*        <Link to='/sjph/bahan_untuk_kepentingan_halal'> Bahan untuk Kepentingan Halal </Link>*/}
            {/*    </BreadcrumbItem>*/}
            {/*    <BreadcrumbItem active>*/}
            {/*        <span> Kepentingan Produksi dan Distribusi Produk </span>*/}
            {/*    </BreadcrumbItem>*/}
            {/*</Breadcrumb>*/}
            <Progress striped animated value={progress} />
            <Card>
                <CardHeader>
                    <CardTitle> Form SJPH: &nbsp;
                        <Badge color='success' pill>
                            {sessionStorage.nama_sjph}
                        </Badge> </CardTitle>
                </CardHeader>
            <CardBody>
                <h4>Destinasi Kelima: &nbsp;
                    <Badge color='primary' pill>
                        Kepentingan Produksi dan Distribusi Produk
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

export default KepentinganProduksiDistribusiProdukPage
