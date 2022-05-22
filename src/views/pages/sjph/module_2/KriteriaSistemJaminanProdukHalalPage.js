import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";
import KriteriaSistemJaminanProdukHalalForm from "../../../forms/sjph/module_2/KriteriaSistemJaminanProdukHalalForm";
import MediaKomunikasiTable from "../../../tables/sjph/module_2/MediaKomunikasiTable";
import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useRef, useState} from "react";

const KriteriaSistemJaminanProdukHalalPage = () => {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'hal1',
            title: 'Halaman 1',
            subtitle: 'Keterangan Kriteria',
            icon: <FileText size={18} />,
            content: <KriteriaSistemJaminanProdukHalalForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'hal2',
            title: 'Halaman 2',
            subtitle: 'Media Komunikasi Table',
            icon: <User size={18} />,
            content: <MediaKomunikasiTable stepper={stepper} type='wizard-modern' />
        }
    ]
    return (
        <div>
            <Wizard
                type='modern-vertical'
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

export default KriteriaSistemJaminanProdukHalalPage
