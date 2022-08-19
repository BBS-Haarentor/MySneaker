import {useEffect} from 'react'
import TeacherList from './TeacherList'
import PeriodenListe from './PeriodenListe'

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