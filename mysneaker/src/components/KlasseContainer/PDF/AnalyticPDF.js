import React, {useEffect, useRef, useState} from 'react';
import {Page, Text, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import CompanyItemsTable from "./CompanyTable";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#c0c0c0'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
const AnalyticPDF = () => {
    let {gameId, current_cycle_index} = useParams()

    const navigate = useNavigate()

    const [companyInfo, setCompanyInfo] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
    myHeaders.append('Access-Control-Allow-Origin', '*')

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/game/info/' + gameId + '/index/' + current_cycle_index, requestOptions).then((element) => {
            if (element.status === 200) {
                return element.json().then(element1 => {
                    setCompanyInfo(element1)
                    return element1
                });
            } else if(element.status === 401) {
                navigate('/')
            }
        }).then((element2) => {
            element2.forEach(element => {
                fetch('https://api.mysneaker.my-system.live/api/v1/game/teacher/summary/user/' + element.company_id + '/index/' + current_cycle_index, requestOptions)
                    .then(value => {
                        if (value.status === 200) {
                            value.json().then(element1 => {
                                setCompanyData([...companyData, element1])
                            });
                        }
                    })
            })
        })
    }, [])

    return (
        <PDFViewer className="h-full w-full">
            <Document title={gameId + " - Cycle: " + (Number(current_cycle_index) + 1)} author="MySneaker">
                <Page style={{backgroundColor: "#1a202c", color: "#ffff"}}>
                    <Text style={{textAlign: "center", fontSize: "35px", margin: "25px 0 0", fontWeight: "extrabold", color: "#4fd1c5"}}>MySneaker</Text>
                    <Text style={{textAlign: "center", fontSize: "21px", margin: "10px 0 25px", fontWeight: "extrabold"}}>Spiel {gameId} in Cycle {Number(current_cycle_index)+1}</Text>
                    <CompanyItemsTable companys={companyInfo}/>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default AnalyticPDF;

