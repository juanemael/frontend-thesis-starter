import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
import SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable
    from "../../../tables/sjph/module_3/SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable";
import DaftarHadirPelatihanInternalForm from "../../../forms/sjph/module_3/DaftarHadirPelatihanInternalForm";
import DaftarHadirPelatihanInternalTable from "../../../tables/sjph/module_3/DaftarHadirPelatihanInternalTable";
import {Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";

const KebijakanEdukasiHalalPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Surat Keputusan',
            icon: <FileText size={18} />,
            content: <SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Halaman 2',
            subtitle: 'Daftar Hadir Pelatihan Internal Pt.1',
            icon: <User size={18} />,
            content: <DaftarHadirPelatihanInternalForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Halaman 3',
            subtitle: 'Daftar Hadir Pelatihan Internal Pt.2',
            icon: <MapPin size={18} />,
            content: <DaftarHadirPelatihanInternalTable stepper={stepper} type='wizard-modern' />
        }
    ]

    const [progress, setProgress] = useState(32);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 48) {
                    return 48;
                }
                const diff = 3 * 10;
                return Math.min(oldProgress + diff, 48);
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

export default KebijakanEdukasiHalalPage
