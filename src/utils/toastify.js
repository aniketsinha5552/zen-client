import { toast } from "react-toastify"

export const toastify=(type=null,message)=>{
    if(!type){
        toast(message)
    }else{
        toast[type](message)
    }
}