import api from "./api";
/**
 * @param {String} endpoint relative endpoint
 * @param {object} body request body
 * @param {String} method can be {"GET","POST","PUT","DELETE"} | Default  GET
 * @param {boolean} transformBody whether to transform the request body from JSON to FormData | Default false
 */
export async function queryApi(
    endpoint,
    body=null,
    method="GET",
    transformBody=false
){
    let error=null;
    let result=null;
    try{
        let config={
            method,
            url:`${process.env.REACT_APP_API_URL}/${endpoint}`,
        };
        if(body){
            if(method.toUpperCase()==="GET")
            config={
                ...config,
                headers:{"Content-Type":"application/json"},
                data:body,
            };
            if(["POST","PUT","PATCH"].includes(method.toUpperCase())){
                if(transformBody){
                    let bodyFormData=new FormData();
                    for(let{key,value} of Object.entries(body)){
                        if(value){
                            if(Array.isArray(value))
                            value.forEach((v)=>bodyFormData.append(key,v));
                            else bodyFormData.append(key,value);
                        }
                    }
                    config={
                        ...config,
                        headers:{"Content-Type":"multipart/form-data"},
                        data:bodyFormData,
                    };
                }else{
                    config={
                        ...config,
                        headers:{"Content-Type":"application/json"},
                        data:body,
                    };
                }
            }
        }
        const res=await api(config);
        result=res.data;
    }catch (e){
        if(e.response){
            error=e.response.data;
        }else{
            error=e.message
        }
    }
    return[result,error];
}