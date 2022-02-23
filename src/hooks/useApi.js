import { useState, useEffect } from "react";
import { queryApi } from "../utils/queryApi";


/**
 * @param {String} endpoint relative endpoint
 * @param {object} body request body
 * @param {String} method can be {"GET","POST","PUT","DELETE"} | Default  GET
 * @param {boolean} transformBody whether to transform the request body from JSON to FormData | Default false
 */

export function useApi(
    endpoint,
    body=null,
    method="GET",
    transformBody=false
){
    const [result,setResult]=useState(null);
    const [error,setError]=useState(null);
    const[bodyUsed,setBodyUsed]=useState(body);
    async function query(newBody){
        if(newBody) setBodyUsed(newBody);
        if(!endpoint) return;
        setError(false);
        setResult(null);
        const[res,err]=await queryApi(
            endpoint,
            bodyUsed,
            method,
            transformBody
        );
        setResult(res);
        setError(err);
    }
    useEffect(()=>{
        query();
    },[]);
    return [result,error,query];
}