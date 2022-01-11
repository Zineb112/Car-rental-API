import React, {useState, useEffect} from 'react'
import Products from './Products'
import axios from 'axios'


// const ProductsList = () => {
    export default function ProductsList(){
        const [ProductsList, setProductsList] = useState([])
        const [recordForEdit, setrecordForEdit] = useState(null)

        useEffect(() => {
            refteshProductsList();
        }, [])
        
        const ProductsAPI = (url = 'https://localhost:44378/api/Products/') => {
                return{
                    fetchall: () => axios.get(url),
                    create: newRecord => axios.post(url, newRecord),
                    update: (id, updateRecord) => axios.put(url + id, updateRecord),
                    delete: id  => axios.delete(url + id)
                }
            }
            
        function refteshProductsList () {
            ProductsAPI().fetchall()
            .then(res => setProductsList (res.data))
            .catch(err => console.log(err))
        }

        const addOrEdit = (formData, onSuccess) => {
            if(formData.get('productID') == "0")
                ProductsAPI().create(formData)
                .then(res =>{
                    onSuccess();
                    refteshProductsList();
                })
                .catch(err => console.log(err))
            else 
                ProductsAPI().update(formData.get('productID'),formData)
                .then(res =>{
                    onSuccess();
                    refteshProductsList();
                })
                .catch(err => console.log(err))
        }

        const showRecordDetails = data => {
            setrecordForEdit(data)
        }

        const onDelete = (e,id)=>{
            e.stopPropagation();
            if(window.confirm('Are you sure, you would like to delete this product?'))
            ProductsAPI().delete(id)
            .then(res => refteshProductsList())
            .catch(err => console.log(err))
        }

        // const imageCard = data => (
        //     <div className="card" onClick={()=> {showRecordDetails(data)}}>
        //         <img src={data.imageSrc} className="card-img-top" />
        //         <div className="card-body">
        //             <h5 className="d-inline-block text-truncate" title={data.productName}>{data.productName}</h5 >
        //             <span className="d-inline-block text-truncate" title={data.description}>{data.description}</span> <br/>
        //             <button className="btn btn-light delete-button" onClick={e => onDelete(e,parseInt(data.productID))}>
        //                 <i className="far fa-trash-alt"></i>
        //             </button>
        //         </div>
        //     </div>
        // )

        const imageCard = data => (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="card" onClick={()=> {showRecordDetails(data)}}>
                            <div className="card-horizontal">
                                <div className="img-square-wrapper">
                                    <img src={data.imageSrc} alt="Card image cap"/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-truncate" title={data.productName}>{data.productName}</h5>
                                    <p className="card-text text-truncate" title={data.description}>{data.description}</p>
                                </div>
                                <div>
                                <button className="btn btn-light delete-button" onClick={e => onDelete(e,parseInt(data.productID))}>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        
    return (
        <div className="row">
            <div className="col-md-12">
                {/* <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">
                        <h1 className="display-4">Products register</h1>
                    </div>
                </div> */}
            </div>
            <div className="col-md-4">
                <Products
                    addOrEdit = {addOrEdit}
                    recordForEdit = {recordForEdit}
                />
            </div>               
            <div className="col-md-8 table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table table-bordered mb-0">
                    <tbody>
                        {
                            [...Array(Math.ceil(ProductsList.length/1))].map((e, i) => 
                            <tr key={i}>
                                <td>{imageCard(ProductsList[1 * i ])}</td>
                                {/* <td>{ProductsList[3 * i + 1]?imageCard(ProductsList[3 * i + 1]) : null}</td>
                                <td>{ProductsList[3 * i + 2]?imageCard(ProductsList[3 * i + 2 ]) : null}</td> */}
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>                            
        </div>
    )
}

// export default ProductsList
