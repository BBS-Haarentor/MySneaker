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
                  <tr>
                    <td>{name}</td>
                    <td>{last_login}</td>
                    <td>{id}</td>
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