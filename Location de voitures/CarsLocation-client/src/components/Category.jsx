import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/img/categoryicon.png'

const initialFieldValues = {
    categoryID: 0,
    categoryName:'',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Category(props){

    const { addOrEdit, recordForEdit } = props

const [values, setValues] = useState(initialFieldValues)
const [errors, setErrors]= useState({})


useEffect(() => {
    if (recordForEdit != null)
        setValues(recordForEdit);

}, [recordForEdit])

const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
        ...values,
        [name]:value
    })
}

const showPreview = e =>{
    if(e.target.files && e.target.files[0]){
        let imageFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = x=>{
            setValues({
                ...values,
                imageFile,
                imageSrc: x.target.result
            })
        }
        reader.readAsDataURL(imageFile)
    }
    else{
        setValues({
            ...values,
            imageFile:null,
            imageSrc: defaultImageSrc
        })
    }
}


const Validate =()=>{
    let temp= {}
    temp.categoryName = values.categoryName==""?false:true;
    temp.imageSrc = values.imageSrc==defaultImageSrc?false:true;
    setErrors(temp)
    return Object.values(temp).every(x => x==true)
}

const resetForm = ()=>{
    setValues(initialFieldValues)
    document.getElementById('image-uploader').value = null;
    setErrors({})
}


const handleFormSubmit = e =>{
    e.preventDefault()
    if(Validate()) {
        const formData = new FormData()
        formData.append('categoryID', values.categoryID)
        formData.append('categoryName', values.categoryName)
        formData.append('imageName', values.imageName)
        formData.append('imageFile', values.imageFile)
        addOrEdit(formData, resetForm)
       
    }
}


const applyErrorClass = field => ((field in errors && errors[field]==false)?' invalid-field':'')

    return(
        <>
        <div className="container text-center">
            <p className="lead">Register Category</p>
        </div>
        <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <div className="card">
                <img src={values.imageSrc} className="card-img-top" />
                <div className="card-body">
                    <div className="form-group p-2">
                        <input type="file" accept="image/*" className={"form-control-file"+applyErrorClass('imageSrc')}
                        onChange={showPreview} id="image-uploader" />
                    </div>
                    <div className="form-group p-2">
                        <input className={"form-control"+applyErrorClass('categoryName')} placeholder="Category Name" name="categoryName"
                        value={values.categoryName} 
                        onChange = {handleInputChange}/>
                    </div>
                    <div className="form-group text-center p-2">
                        <button type="submit" className="btn btn-outline-primary">Add Category</button> 
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}