import {useEffect, useState} from 'react'
import TeacherList from './AdminPage/TeacherList'
import PeriodenListe from './AdminPage/PeriodenListe'

const AdminPage = ({OnClick, state}) => {

    useEffect(() => {
        OnClick("Lehrer Liste")
    }, [])

    return (
        <>
            {state === 'Lehrer Liste' ? <TeacherList/> : <PeriodenListe/> }
        </>
    )
}

export default AdminPage