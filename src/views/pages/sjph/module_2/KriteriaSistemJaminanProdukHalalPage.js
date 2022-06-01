import {Card, CardHeader, CardBody, CardTitle, CardText, Progress, Breadcrumb, BreadcrumbItem, Badge} from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";
import KriteriaSistemJaminanProdukHalalForm from "../../../forms/sjph/module_2/KriteriaSistemJaminanProdukHalalForm";
import MediaKomunikasiTable from "../../../tables/sjph/module_2/MediaKomunikasiTable";
import {FileText, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

const KriteriaSistemJaminanProdukHalalPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [progress, setProgress] = useState(16);
    const [checkpoint, setCheckpoint] = useState(0);


    const steps = [
        {
            id: 'hal1',
            title: 'Wisata 1',
            subtitle: 'Keterangan Kriteria Kebijakan Halal',
            icon: <FileText size={18} />,
            content: <KriteriaSistemJaminanProdukHalalForm stepper={stepper}
                                                           type='wizard-modern' setCheckpoint={setCheckpoint} />
        },
        {
            id: 'hal2',
            title: 'Wisata 2',
            subtitle: 'Media Komunikasi Table',
            icon: <User size={18} />,
            content: <MediaKomunikasiTable stepper={stepper} setCheckpoint={setCheckpoint} type='wizard-modern' />
        }
    ]

    useEffect(() => {
        if (checkpoint === 0) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 16
                    if (oldProgress === 24) {
                        return 24;
                    }
                    const diff = 2 * 10;
                    return Math.min(oldProgress + diff, 24);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 24
                    if (oldProgress === 32) {
                        return 32;
                    }
                    const diff = 2 * 10;
                    return Math.min(oldProgress + diff, 32);
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
    //             if (oldProgress === 24) {
    //                 return 24;
    //             }
    //             const diff = 2 * 10;
    //             return Math.min(oldProgress + diff, 32);
    //         });
    //     }, 500);
    //
    //     return () => {
    //         clearInterval(timer);
    //     }
    // }, []);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((oldProgress) => {
    //             if (oldProgress === progress) {
    //                 return progress;
    //             }
    //             const diff = 2 * 10;
    //             return Math.min(oldProgress + diff, progress);
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
            {/*    <BreadcrumbItem active>*/}
            {/*        <span> Kriteria Sistem Jaminan Produk Halal </span>*/}
            {/*    </BreadcrumbItem>*/}
            {/*</Breadcrumb>*/}
            <Breadcrumb listClassName='breadcrumb-chevron'>
                <BreadcrumbItem>
                    <Link to='/sjph/sjph_ku'> SJPH-ku </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/informasi_umum_perusahaan'> Informasi Perusahaan </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span> Kriteria Sistem Jaminan Produk Halal </span>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kebijakan_dan_edukasi_halal'> Kebijakan dan Edukasi Halal </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/bahan_untuk_kepentingan_halal'> Bahan untuk Kepentingan Halal </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kepentingan_produksi_dan_distribusi_produk'> Kepentingan Produksi dan Distribusi Produk </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to='/sjph/kaji_ulang_manajemen'> Audit dan Kaji Ulang Manajemen </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <Card>
                <Progress striped animated value={progress} />
                <CardHeader>
                    <CardTitle> Form SJPH: &nbsp;
                        <Badge color='success' pill>
                            {sessionStorage.nama_sjph}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                {/*<div className='divider'>*/}
                {/*    <div className='divider-text'></div>*/}
                {/*</div>*/}
                <CardBody>
                    <h4>Destinasi Kedua: &nbsp;
                        <Badge color='primary' pill>
                            Kriteria Sistem Jaminan Produk Halal
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

export default KriteriaSistemJaminanProdukHalalPage
