import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import CompanyForm from "../../../forms/sjph/module_1/CompanyForm";
import KriteriaSistemJaminanProdukHalalForm from "../../../forms/sjph/module_2/KriteriaSistemJaminanProdukHalalForm";
import {FileText, Link, MapPin, User} from "react-feather";
import Wizard from '@components/wizard'
import {useRef, useState} from "react";
import { Fragment } from 'react'

const KriteriaSistemJaminanProdukHalalPageFragment = () => {
    return (
        <KriteriaSistemJaminanProdukHalalForm />
    )
}

export default KriteriaSistemJaminanProdukHalalPageFragment
