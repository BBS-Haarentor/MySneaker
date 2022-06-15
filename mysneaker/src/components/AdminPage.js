import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

const AdminPage = () => {

  const [teachers, setTeachers] = useState([]);

  useEffect(async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    await fetch(process.env.REACT_APP_MY_API_URL + "/user/teacher_list", requestOptions).then((element) => {
      if (element.status === 200) {
        element.json().then((element1) => {
          setTeachers(element1)
        })
      }
    })
  }, [])

  const deleteTeacher = async () => {

  }

  const showTeacher = async () => {
    
  }

  return (
    <>
      <div className='h-screen w-full overflow-hidden'>
        <div className='mt-12 p-4 xl:col-span-2 shadow-lg rounded-3xl m-2 bg-white overflow-y-auto justify-center snap-start grid-cols-1 w-[90%] h-[60%] mx-12'>
          <table className='w-full text-center'>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Letzter Login</td>
                <td>Aktionen</td>
              </tr>
              {teachers.map(({ id, last_login, name }) => {
                return (
                  <tr onClick={() => showTeacher()}>
                    <td>{name}</td>
                    <td>{last_login}</td>
                    <td>
                      <button className='fill-red-500 hover:fill-red-600 h-5 w-5' onClick={() => deleteTeacher(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='p-4 xl:col-span-2 m-2 flex justify-center snap-start grid-cols-3 w-[90%] h-[30%] mx-12 overflow-hidden'>

        </div>
      </div>
    </>
  )
}

export default AdminPage