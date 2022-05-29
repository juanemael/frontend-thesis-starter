import {Card, CardHeader, CardBody, CardTitle, CardText, Progress} from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";
import KriteriaSistemJaminanProdukHalalForm from "../../../forms/sjph/module_2/KriteriaSistemJaminanProdukHalalForm";
import MediaKomunikasiTable from "../../../tables/sjph/module_2/MediaKomunikasiTable";
import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";

const KriteriaSistemJaminanProdukHalalPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [progress, setProgress] = useState(16);
    const [checkpoint, setCheckpoint] = useState(0);

    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Keterangan Kriteria',
            icon: <FileText size={18} />,
            content: <KriteriaSistemJaminanProdukHalalForm stepper={stepper}
                                                           type='wizard-modern' setCheckpoint={setCheckpoint} />
        },
        {
            id: 'hal2',
            title: 'Halaman 2',
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
            <Card>
                <Progress striped animated value={progress} />
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

export default KriteriaSistemJaminanProdukHalalPage
