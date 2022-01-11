import React, {useState, useEffect} from 'react'
import axios from 'axios'

    export default function ProductsList(){
        const [ProductsList, setProductsList] = useState([])

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

        const imageCard = data => (
            <div class="product-card">
            <div class="badge">New</div>
            <div class="product-tumb">
                <img src={data.imageSrc} alt=""/>
            </div>
            <div class="product-details">
                <span class="product-catagory" > Category</span>
                <h4><a href="" className="text-truncate" title={data.productName}>{data.productName}</a></h4>
                <p className="text-truncate" title={data.description}>{data.description}</p>
                <div class="product-bottom-details">
                    <div class="product-price">{data.price} MAD</div>
                    <div class="product-links">
                        <a href=""><i class="fa fa-heart"></i></a>
                        <a href=""><i class="fa fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>
            </div>
        )

    return (
        <div className="row">
            <div>
                <table className="table ">
                    <tbody>
                        {
                            [...Array(Math.ceil(ProductsList.length/3))].map((e, i) => 
                            <tr key={i}>
                                <td>{imageCard(ProductsList[3 * i ])}</td>
                                <td>{ProductsList[3 * i + 1]?imageCard(ProductsList[3 * i + 1]) : null}</td>
                                <td>{ProductsList[3 * i + 2]?imageCard(ProductsList[3 * i + 2 ]) : null}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>                            
        </div>
    )
}

