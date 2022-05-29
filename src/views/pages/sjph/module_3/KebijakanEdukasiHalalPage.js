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
    const [checkpoint, setCheckpoint] = useState(0);
    const steps = [
        {
            id: 'hal1',
            title: 'Wisata 1',
            subtitle: 'Surat Keputusan',
            icon: <FileText size={18} />,
            content: <SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Wisata 2',
            subtitle: 'Daftar Hadir Pelatihan Internal Pt.1',
            icon: <User size={18} />,
            content: <DaftarHadirPelatihanInternalForm
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'step-address',
            title: 'Wisata 3',
            subtitle: 'Daftar Hadir Pelatihan Internal Pt.2',
            icon: <MapPin size={18} />,
            content: <DaftarHadirPelatihanInternalTable
                setCheckpoint={setCheckpoint} stepper={stepper} type='wizard-modern' />
        }
    ]

    const [progress, setProgress] = useState(32);

    useEffect(() => {
        if (checkpoint === 0) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 32
                    if (oldProgress === 37) {
                        return 37;
                    }
                    const diff = 3 * 10;
                    return Math.min(oldProgress + diff, 37);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else if (checkpoint === 1) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    // oldProgress = {...progress}
                    oldProgress = 37
                    if (oldProgress === 42) {
                        return 42;
                    }
                    const diff = 3 * 10;
                    return Math.min(oldProgress + diff, 42);
                });
            }, 200);

            return () => {
                clearInterval(timer);
            };
        } else {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    oldProgress = 42
                    if (oldProgress === 48) {
                        return 48;
                    }
                    const diff = 4 * 10;
                    return Math.min(oldProgress + diff, 48);
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
    //             if (oldProgress === 48) {
    //                 return 48;
    //             }
    //             const diff = 3 * 10;
    //             return Math.min(oldProgress + diff, 48);
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

export default KebijakanEdukasiHalalPage
