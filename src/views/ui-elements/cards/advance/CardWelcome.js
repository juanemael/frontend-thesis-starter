// ** Icons Imports
import {Award, CheckCircle} from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {Button, Card, CardBody, CardText} from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import {useNavigate} from "react-router-dom";

const CardWelcome = () => {
    const navigate = useNavigate()
    return (
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                <Avatar icon={<CheckCircle size={28} />} className='shadow' color='primary' size='xl' />
                <div className='text-center'>
                    <h1 className='mb-1 text-white'>Selamat {sessionStorage.username},</h1>
                    <CardText className='m-auto w-75' style={{paddingBottom: 20}}>
                        Kamu telah berhasil melakukan registrasi! Mulailah eksplorasimu disini.
                    </CardText>
                    <Button color={'success'} id={'buttonMulai'} onClick={()=>{ navigate('/sjph/sjph_ku') }} >
                        Mulai
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardWelcome
