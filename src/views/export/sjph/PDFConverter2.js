/* eslint no-use-before-define: 0 */
// import { Coffee, X,} from 'react-feather'
import '@styles/react/pages/page-authentication.scss'
import {useContext, useState} from "react"
import toast from "react-hot-toast"
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import htmlContent from './index.html'

// const ToastContent = ({ t, name, role }) => {
//     return (
//         <div className='d-flex'>
//             <div className='me-1'>
//                 <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
//             </div>
//             <div className='d-flex flex-column'>
//                 <div className='d-flex justify-content-between'>
//                     <h6>{name}</h6>
//                     <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
//                 </div>
//                 <span>Kamu telah berhasi login sebagai {role} user di PasporUMKM. Sekarang kamu bisa mulai eksplorasimu.</span>
//             </div>
//         </div>
//     )
// }
//
// const ToastDanger = () =>{
//     return (
//         <div className='d-flex'>
//             <div className='me-1'>
//                 <Avatar size='sm' color='danger' icon={<FaInfo size={12} />} />
//             </div>
//             <div className='d-flex flex-column'>
//                 <div className='d-flex justify-content-between'>
//                     <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
//                 </div>
//                 <span>Email atau passwordmu salah. Tolong coba lagi.</span>
//             </div>
//         </div>
//     )
// }
//
// const ToastEmpty = () =>{
//     return (
//         <div className='d-flex'>
//             <div className='me-1'>
//                 <Avatar size='sm' color='danger' icon={<FaInfo size={12} />} />
//             </div>
//             <div className='d-flex flex-column'>
//                 <div className='d-flex justify-content-between'>
//                     <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
//                 </div>
//                 <span>Tolong isi kolom yang kosong.</span>
//             </div>
//         </div>
//     )
// }

const PDFConverter2 = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div dangerouslySetInnerHTML={{__html: htmlContent}}/>
    )

}

export default PDFConverter2
