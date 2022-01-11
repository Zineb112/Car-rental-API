import React,{useState,useEffect} from 'react'
import Category from './Category'
import axios from "axios";

export default function CategoryList(){
    const [categoryList, setCategoryList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(()=>{
        refreshCategoryList();
    },[])

    const CategoryAPI = (URL = 'https://localhost:44378/api/Categories/') => {
        return{
            fetchAll: () => axios.get(URL),
            create: newRecord => axios.post(URL, newRecord),
            update: (id, updatedRecord) => axios.put(URL + id, updatedRecord),
            delete: id => axios.delete(URL + id)
        }
    }

function refreshCategoryList() {
    CategoryAPI().fetchAll()
        .then(res=> setCategoryList(res.data))
        .catch(err => console.log(err))
}


const addOrEdit = (formData, onSuccess) => {
        if (formData.get('categoryID') == "0")
            CategoryAPI().create(formData)
                .then(res =>{
                    onSuccess();
                    refreshCategoryList();
                })
            .catch(err => console.log(err))
    else
        CategoryAPI().update(formData.get('categoryID'),formData)
            .then(res => {
                onSuccess();
                refreshCategoryList();
            })
            .catch(err => console.log(err))
}

const showRecordDetails = data => {
    setRecordForEdit(data)
}

const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure to delete this record?'))
    CategoryAPI().delete(id)
        .then(res => refreshCategoryList())
        .catch(err => console.log(err))
}


const imageCard = data =>(
    <div className="card" onClick={()=>{showRecordDetails(data)}}>
    <img src={data.imageSrc} className="card-img-top" />
        <div className="card-body">
            <h5>{data.categoryName}</h5> <br/>
            <button className="btn btn-light delete-button" onClick={e =>onDelete(e,parseInt(data.categoryID))}>
            <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
)

    return(
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Category Register</h1>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
              <Category
                addOrEdit={addOrEdit}
                recordForEdit={recordForEdit}
              />
            </div>
            <div className="col-md-8">
            <table>
                <tbody>
                    {
                        [...Array(Math.ceil(categoryList.length /3 ))].map((e,i)=>
                        <tr key={i}>
                            <td style={{padding: 15}}>{imageCard(categoryList[3 * i])}</td>
                            <td style={{padding: 15}}>{categoryList[3 * i + 1]?imageCard(categoryList[3 * i + 1]) : null}</td>
                            <td style={{padding: 15}}>{categoryList[3 * i + 2]?imageCard(categoryList[3 * i + 2]) : null}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}