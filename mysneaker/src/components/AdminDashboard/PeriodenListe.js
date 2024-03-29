import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import EditScenarioModal from "./Modals/EditScenarioModal";

const PeriodenListe = () => {

    const [scenarios, setScenarios] = useState([
        {
            "id": 1,
            "sneaker_price": 60,
            "paint_price": 10,
            "storage_fee_sneaker": 4,
            "storage_fee_paint": 1,
            "storage_fee_finished_sneaker": 8,
            "employee_count_modifier_temporary": 0,
            "employee_count_modifier_permanent": 0,
            "factor_interest_rate": 0.04,
            "employee_salary": 400,
            "employee_signup_bonus": 100,
            "employee_production_capacity": 10,
            "employee_cost_modfier": 0.2,
            "sneaker_ask": 400,
            "factor_ad_take": 0.1,
            "tender_offer_count": 0,
            "machine_purchase_allowed": true,
            "machine_purchase_cost1": 12000,
            "machine_purchase_cost2": 25000,
            "machine_purchase_cost3": 45000,
            "machine_production_capacity1": 200,
            "machine_production_capacity2": 500,
            "machine_production_capacity3": 1000,
            "machine_employee_max": 10,
            "machine_maintainance_cost1": 4000,
            "machine_maintainance_cost2": 6000,
            "machine_maintainance_cost3": 8000,
            "production_cost_per_sneaker1": 60,
            "production_cost_per_sneaker2": 50,
            "production_cost_per_sneaker3": 40,
            "char": "A",
            "description": "LOREM IPSUM"
        }
    ]);
    const [modal, setModal] = useState(<></>);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')
    myHeaders.append("accept", "application/json")

    useEffect(() => {
        updateScenarioList()
    }, [])

    const updateScenarioList = () => {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + "/api/v1/scenario/get_all_scenarios", requestOptions).then((element) => {
            if (element.status === 200) {
                element.json().then((element1) => {
                    setScenarios(element1.sort((a, b) => {
                        if (a["char"] < b["char"]) {
                            return -1;
                        }
                        if (a["char"] > b["char"]) {
                            return 1;
                        }
                        return 0;
                    }));
                })
            }
        })
    }

    function editScenario(char) {
        setModal(<EditScenarioModal updateScenarioList={updateScenarioList} myHeaders={myHeaders} char={char}
                                    setModal={setModal}/>)
    }

    return (
        <>
            {modal}
            <div className='h-screen w-screen justify-center flex  flex-wrap overflow-x-hidden'>
                {scenarios.map((element, index) => {
                    return (
                        <>
                            <div
                                className="mt-12 p-4 dark:bg-[#1f2733] flex-none dark:text-white xl:col-span-2 shadow-lg rounded-3xl mr-2 mb-2 bg-white overflow-y-auto w-96 h-[400px] mx-12"
                                key={index}>
                                <div className="relative">
                                    <div className='text-4xl text-center m-auto text-[#4fd1c5]'>
                                        <p>{new TextEncoder().encode(element.char) - 64}</p>
                                    </div>
                                    <div className="h-[2px] dark:bg-white bg-gray-400 rounded-full"/>
                                    <div className="h-[250px] overflow-x-hidden my-1">
                                        <p className={"my-3 text-center"}>{element.description}</p>
                                    </div>
                                    <div className="block w-full">
                                        <div className="h-[2px] dark:bg-white bg-gray-400 rounded-full"/>
                                        <div className="w-full flex">
                                            <button className='p-2 my-5 mx-auto w-5 h-5'
                                                    onClick={() => editScenario(element.char)}>

                                                <svg
                                                    className='fill-yellow-600 hover:fill-yellow-700 h-5 w-5'
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512">
                                                    <path
                                                        d="M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                })}
            </div>
        </>
    )

}

export default PeriodenListe