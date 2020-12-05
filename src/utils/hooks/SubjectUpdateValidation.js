import { useEffect, useState } from 'react'
import ValidateSubjectCreateForm from '../../components/ValidateCreateSubject';

export default function UpdateSubjectFunc(submitForm) {

    const [formValue, setformValue] = useState({subject_title:"",subject_shdes:"",sub_des:"",class_type:"",subject_type:""});
    const [formErrors, setformErrors] = useState({subject_title:"",subject_shdes:"",sub_des:"",class_type:"",subject_type:""});
    const [hide, sethide] = useState({subject_title:false,subject_shdes:false,sub_des:false,class_type:false,subject_type:false});
    const [isSubmitting, setisSubmitting] = useState(false);

    const hadelChabgeFormValues = (e) =>{
        const {name,value} = e.target;
        setformValue({
            ...formValue,[name] : value
        })
    }

    const handelSubmit = (e) =>{
        e.preventDefault();
        //handling Errors
        setformErrors(ValidateSubjectCreateForm(formValue));
        sethide({subject_title:false,subject_shdes:false,sub_des:false,class_type:false,subject_type:false,hr:false});
        setisSubmitting(true);
    }
    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmitting){
            submitForm();
        }
    }, [formErrors])

    const hideError = (e)=>{
        Object.entries(formErrors).map(([keys,val]) =>{
            if(keys === e.target.name && val !== ""){
                sethide({...hide,[e.target.name]:true});
            }
        })
    }

    return ({hadelChabgeFormValues,formValue,handelSubmit,hideError,hide,formErrors})
}
