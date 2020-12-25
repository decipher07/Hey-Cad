import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './FinalData.css'
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function utils(c, check) {
    var countcheck = 0 ;
            if (c.recurringEventId){
                check.forEach((alpha) => {
                    if (alpha.recurringEventId == c.recurringEventId){
                        countcheck += 1;
                    }
                })
                const filteredPeople = check.filter((item) => item.recurringEventId !== c.recurringEventId);
                console.log(filteredPeople)
            }
}

function FinalData() {
    let query = useQuery();
    console.log(query.get("id"))

    const [check, setCheck] = useState([])
    
    useEffect(() => {
        const checks = async() => {
            await axios.post('http://localhost:5000/check1', {
                id : query.get("id")
            })
            .then((res) =>{
                const {data} = res;
                setCheck(data[0].data)
                const answers = data[0].data
                var counter = 0 ;
                let filteredPeople = null;

                answers.forEach((answer) => {
                    if (answer.recurringEventId){
                        filteredPeople = answers.filter((item) => item.recurringEventId !== answer.recurringEventId);
                    }
                })

                const something = answers.filter((v,i,a)=>a.findIndex(t=>(t.recurringEventId === v.recurringEventId))===i)
                console.log("Something si ", something)
                setCheck(something)
                console.log("The Counter value is counter", counter)
                console.log(filteredPeople)

            })
        }
        checks()
    }, [])

    return (
        <div className="finaldata">
            <h1 className="header1"> Hey {query.get("name")}, Here are your upcoming events !!</h1>
            {
                check.map((c) => (
                    <h1>{c.summary}, {c.count}</h1>
                ))
            }
        </div> 
    )
}

export default FinalData
