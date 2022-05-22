import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useRef, useState} from "react";
import KajiUlangManajemenTable from "../../../tables/sjph/module_6/KajiUlangManajemenTable";


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
            <Wizard
                type='modern-horizontal'
                ref={ref}
                steps={steps}
                options={{
                    linear: false
                }}
                instance={el => setStepper(el)}
            />
        </div>
    )
}

export default KajiUlangManajemenPage
