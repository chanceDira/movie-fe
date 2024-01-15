import { toast } from 'react-hot-toast';
const Notify = (messsage: any , type: any) => {
    switch (type){
        case 'success':
            toast.success(`${messsage}`, {
                position: "top-right",
                duration: 4000,
                });
            break;        
        case 'error':
            toast.error(`${messsage}`, {
                position: "top-right",
                duration: 4000,
                });     
            break;
        case "":
            toast.dismiss();
            break;
        default:
            break           
    } 
    
}

export default Notify;