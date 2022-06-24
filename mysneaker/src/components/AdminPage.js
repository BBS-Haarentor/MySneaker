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

  const deleteTeacher = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    await fetch(process.env.REACT_APP_MY_API_URL + "/user/delete/" + id, requestOptions).then((element) => {
      if (element.status === 200) {
        element.json().then((element1) => {
          setTeachers(element1)
        })
      }
    })

    var requestOptions1 = {
      method: 'DELETE',
      headers: myHeaders,
    };
    await fetch(process.env.REACT_APP_MY_API_URL + "/user/teacher_list", requestOptions1).then((element) => {
      if (element.status === 200) {
        element.json().then((element1) => {
          setTeachers(element1)
        })
      }
    })
  }

  const showTeacher = async () => {

  }

  const createTeacher = async () => {
    
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
              <tr className='mb-12'>
                <td><hr /></td>
                <td><hr /></td>
                <td><hr /></td>
              </tr>
              {teachers.map(({ id, last_login, name }) => {
                let date = new Date(last_login)
                return (
                  <tr onClick={() => showTeacher()}>
                    <td>{name}</td>
                    <td>{date.getHours()}:{date.getSeconds()} {date.getDate()}.{date.getMonth()}.{date.getFullYear()}</td>
                    <td>
                      <button className='p-2' onClick={() => deleteTeacher(id)}>
                        <svg className='fill-red-500 hover:fill-red-600 h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                        </svg>
                      </button>
                      <button className='p-2'>
                        <svg className='fill-gray-500 hover:fill-gray-600 h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
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
          <button className='inline-block shadow-lg rounded-3xl m-2 h-32 bg-white w-[82%] my-12' onClick={() => createTeacher()}>
            Lehrer Hinzufügen
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminPage