import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useRef, useState} from "react";
import SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable
    from "../../../tables/sjph/module_3/SuratKeputusanPenetapanTimManejemenHalalPenyeliaHalalTable";
import DaftarHadirPelatihanInternalForm from "../../../forms/sjph/module_3/DaftarHadirPelatihanInternalForm";
import DaftarHadirPelatihanInternalTable from "../../../tables/sjph/module_3/DaftarHadirPelatihanInternalTable";

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

export default KebijakanEdukasiHalalPage
