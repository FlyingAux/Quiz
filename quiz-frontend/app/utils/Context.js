'use client'
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const NContext = createContext();

const Context = (props) => {
    const [questions, setQuestions] = useState(null);

    const getQuestions = async ()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/data')
            setQuestions(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

 useEffect(()=>{   
    getQuestions();
 },[])

  return (
    <NContext.Provider value={{questions , setQuestions}}>
        {props.children}
    </NContext.Provider>
  )
}

export default Context