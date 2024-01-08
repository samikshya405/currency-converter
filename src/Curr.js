import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { countryList } from "./Code";
function Curr() {

  
  const [fromCode, setfromCode] = useState("AUD");
  const [toCode, setToCode] = useState("NPR");
  const [fromFlag, setFromFlag] =useState("AU")
  const [toFlag, setToFlag] =useState("NP")
  const [result, setResult] =useState('0')
  const [enteredAmount, setAmount]= useState(0)

  const base_url=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCode.toLowerCase()}/${toCode.toLowerCase()}.json` 
  const fromFlagSrc =`https://flagsapi.com/${fromFlag}/flat/64.png`
  const toFlagSrc = `https://flagsapi.com/${toFlag}/flat/64.png`
  const updateflag=(event)=>{
    const currcode=event.target.value
    setToFlag(countryList[currcode])
    setToCode(currcode)

  }
  const hnadleChnage=(event)=>{
    const currcode=event.target.value
    setFromFlag(countryList[currcode])
    setfromCode(currcode)
  }

  const handleClick= async()=>{
    setToCode(fromCode)
    setToFlag(fromFlag)
    setFromFlag(toFlag)
    setfromCode(toCode)
    

  }
  const convertCurrency= async()=>{
    let response =await fetch(base_url)
    let data = await response.json()
    setResult((data[toCode.toLowerCase()])*enteredAmount)
    


  }
  useEffect(()=>{
    convertCurrency()

  },[handleClick])
  return (
    <div className="back">
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="custom-size rounded shadow-lg">
          <div className="m-3  ">
            <div className=" d-flex justify-content-between p-3 mb-2   bg-white rounded">
              <div className="from d-flex flex-column">
                <p>From</p>
                <input type="number" className=" border-0" placeholder="0" onChange={(e)=>{
                    setAmount(e.target.value)
                    
                }} />
              </div>
              <div className="  ">
                <p>Currency Type</p>
                <img
                  src={fromFlagSrc}
                  className="flag"
                />
                <select className="p-1 rounded border-0 " onChange={(event)=>hnadleChnage(event)} value={fromCode} >
                  {Object.keys(countryList).map((key) => {
                    return (
                      <option key={countryList[key]} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="text-center">
              <button className=" btn  text-primary fs-3 " onClick={handleClick}>
                <FontAwesomeIcon icon={faRetweet} />
              </button>
            </div>
            <div className=" d-flex justify-content-between p-3 mb-2   bg-white rounded">
              <div className="from d-flex flex-column">
                <p>To</p>
                <input type="number" className=" border-0"  value={result} readOnly />
              </div>
              <div className="  ">
                <p>Currency Type</p>
                <img
                  src={toFlagSrc}
                  className="flag"
                />
                <select className="p-1 rounded border-0 " onChange={(event)=>updateflag(event)} value={toCode} >
                  {Object.keys(countryList).map((key) => {
                    return (
                      
                        <option key={key} value={key} >
                          {key}
                        </option>
                       
                      
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="w-100 ">
              <button className=" w-100 mt-3 btn btn-primary  " onClick={convertCurrency}>
                 {fromCode} to {toCode}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Curr;
