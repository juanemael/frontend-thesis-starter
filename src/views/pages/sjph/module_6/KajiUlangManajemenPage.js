import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useRef, useState} from "react";
import KajiUlangManajemenTable from "../../../tables/sjph/module_6/KajiUlangManajemenTable";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";


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
    return (
        <div>
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
