import TeacherList from './TeacherList'
import PeriodenListe from './PeriodenListe'
import SpieleListe from "./SpieleListe";

const AdminPage = ({state}) => {

    return (
        <>
            {state === 'Lehrer Liste' ? <TeacherList/> : state === 'Spiele Liste' ? <SpieleListe/> : <PeriodenListe/> }
        </>
    )
}

export default AdminPage