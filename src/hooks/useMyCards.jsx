import { useEffect, useState } from "react"
import cardServices from "../services/cardservice";

export const useMyCards = ()=>{
    const [cards,setCards]= useState([]);
    useState();
    useEffect(()=>{
        const getcards= async ()=>{
            const{data}=await cardServices.getAll();
            setCards(data);
        }
        getcards();
    },[]);
    return cards;
}