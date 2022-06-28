import React from 'react'
import Swal from 'sweetalert2'

const Analytics = ({ myHeaders, gameId, cycle_index }) => {

    const setBackGame = () => {
        Swal.fire({
            title: 'Möchten Sie wirklich zurück Springen?',
            text: "Wollen Sie es wirklich?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7FFFD4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ja, zurückspringen',
            cancelButtonText: "Nein"
          }).then((result) => {
            if (result.isConfirmed) {
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                };
                fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game&setabck_game/' + gameId + '/index/' + cycle_index, requestOptions).then((element) => {
                    if (element.status === 202) {
                        Swal.fire(
                            'Zurück gesprungen!',
                            'Sie sind jetzt in der Periode',
                            'success'
                          )
                    }
                })
              
            }
          })
    }

    return (
        <>
            <button className='my-6 w-[100%]  bg-red-400 text-white rounded-3xl shadow-lg p-3' onClick={() => setBackGame()}>Zu dieser Periode zurückspringen</button>
        </>
    )
}

export default Analytics