import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useEffect, useRef, useState} from "react";
import KajiUlangManajemenTable from "../../../tables/sjph/module_6/KajiUlangManajemenTable";
import {Card, CardBody, CardHeader, CardTitle, Progress} from "reactstrap";


const KajiUlangManajemenPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Kaji Ulang Manajemen',
            icon: <FileText size={18} />,
            content: <KajiUlangManajemenTable stepper={stepper} type='wizard-modern' />
        }
    ]

    const [progress, setProgress] = useState(80);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = 10 * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div>
            <Progress className='progress-bar-success' value={progress} />
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

export default KajiUlangManajemenPage
