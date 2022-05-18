// ** Icons Imports
import {Award, CheckCircle} from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardWelcome = () => {
    return (
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                <Avatar icon={<CheckCircle size={28} />} className='shadow' color='primary' size='xl' />
                <div className='text-center'>
                    <h1 className='mb-1 text-white'>Selamat {sessionStorage.username},</h1>
                    <CardText className='m-auto w-75'>
                        Kamu telah berhasil melakukan registrasi! Mulailah eksplorasimu disini.
                    </CardText>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardWelcome