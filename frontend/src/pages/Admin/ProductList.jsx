//I have a confusion between type and category in the product list.
//Admin menu to be shown in the avatar  where logout and profile is shown.
import  { useState } from 'react'
import { useNavigate } from 'react-router';
import { useCreateProductsMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice.js';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js';
import { toast } from "react-toastify"
import { useFetchTypesQuery } from '../../redux/api/typesApiSlice.js';

const ProductList = () => {
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductsMutation();
    const { data: categories } = useFetchCategoriesQuery();
    const { data: types} = useFetchTypesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("type", type);
            productData.append("quantity", quantity);
            productData.append("CountInStock", stock);

            const { data } = await createProduct(productData);
            if (data.error) {
                toast.error("Product created failed, try again");

            } else {
                toast.success(`Product ${data.name} created successfully`);
                navigate("/");
            }

        } catch (error) {
            console.error(error);
            toast.error("Product creation failed, try again");
        }

    }

    const uploadFileHandler = async (e) => {
        const file=e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(file);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }


    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                
                <div className="md:w-3/4 p-3">
                    <div className='h-12'>Create Product</div>
                    {imageUrl && (
                        <div className='text-center'>
                            <img src={imageUrl} alt="product"
                                className="block mx-auto mx-h-[200px]"
                            />
                        </div>
                    )}
                    <div className='mb-3'>
                        <label htmlFor="" className='border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 '>
                            {image ? image.name : "Upload Image"}
                            <input type="file"
                                name='image'
                                accept='image/*'
                                onChange={uploadFileHandler}
                                // className= "hidden"
                            />
                        </label>
                    </div>
                    <div className='p-3'>
                        <div className='flex justify-between'>
                            <div className="one">
                                <label htmlFor="name">Name</label><br />
                                <input type="text"
                                    className="p-4 mb-3 w-[20rem] border rounded-lg  text-black"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="two ml-10 ">
                                <label htmlFor="name block">Price</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[20rem] border rounded-lg  text-black"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>


                        </div>
                        <div className='flex justify-between'>
                            <div className="three">
                                <label htmlFor="name">Types</label><br />
                                <select 
                                    className="p-4 mb-3 w-[20rem] border rounded-lg  text-black"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    {types?.map((type)=>(
                                        <option key={type._id} value={type._id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="four ml-10 ">
                                <label htmlFor="name block">Quantity</label> <br />
                                <input
                                    type="number"
                                    className="p-4 mb-3 w-[20rem] border rounded-lg  text-black"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>
                        <label htmlFor="" className="my-5">
                            Description
                        </label>
                        <textarea
                            type="text"
                            className="p-2 mb-3  border rounded-lg w-[95%] text-black"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">Count In Stock</label> <br />
                                <input
                                    type="text"
                                    className="p-4 mb-3 w-[20rem] border rounded-lg  text-black"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className="ml-10">
                                <label htmlFor="name block">Category</label> <br />
                                <select
                                    className="p-4 mb-3 w-[20rem] border rounded-lg text-black"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button
                                className="text-black bg-slate-500 px-4 py-2 rounded-lg"
                                onClick={handleSubmit}
                            >
                                Create Product
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
