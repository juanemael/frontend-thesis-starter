import {FileText, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
import KajiUlangManajemenTable from "../../../tables/sjph/module_6/KajiUlangManajemenTable";
import {Badge, Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";
import {Link} from "react-router-dom";
import KajiUlangManajemenForm from "../../../forms/sjph/module_6/KajiUlangManajemenForm";

const KajiUlangManajemenPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [isFinish, setIsFinish] = useState(false)
    const steps = [
        {
            id: 'hal1',
            title: 'Wisata 1',
            subtitle: 'Kaji Ulang Manajemen',
            icon: <FileText size={18} />,
            content: <KajiUlangManajemenForm stepper={stepper} type='wizard-modern' />
        }
    ]

    const [progress, setProgress] = useState(80);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setIsFinish(true)
                    return 100;
                }
                const diff = 9 * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, []);
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
                <BreadcrumbItem>
                    <Link to='/sjph/kepentingan_produksi_dan_distribusi_produk'> Kepentingan Produksi dan Distribusi Produk </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <span> Audit dan Kaji Ulang Manajemen </span>
                </BreadcrumbItem>
            </Breadcrumb>
            {/* eslint-disable-next-line multiline-ternary */}
            { isFinish ?
                // eslint-disable-next-line multiline-ternary
                <><Progress className='progress-bar-success' value={100}>
                    Selesai
                </Progress></> :
                <><Progress animated striped value={progress} /></>
            }
            {/*<Progress className='progress-bar-success' value={progress}>*/}
            {/*    Selesai*/}
            {/*</Progress>*/}
            <Card>
                <CardHeader>
                    <CardTitle> Form SJPH: &nbsp;
                        <Badge color='success' pill>
                            {sessionStorage.nama_sjph}
                        </Badge> </CardTitle>
                </CardHeader>
                <CardBody>
                    <h4>Destinasi Keenam: &nbsp;
                        <Badge color='primary' pill>
                            Audit dan Kaji Ulang Manajemen
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
                />
                </CardBody>
            </Card>
        </div>
    )
}

export default KajiUlangManajemenPage
