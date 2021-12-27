import axios from "axios";

export default function *getProducts(url){
    const data= yield axios.get(url);
    return data;
}

export  function *post(...req){
    const [url,payload] = req;
    console.log("url",url);
    console.log("payload",payload);
    const data=yield axios.post (url,payload);
    return data;
}