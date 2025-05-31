
const CategoryForm = ({
    value,
    setValue,handleSubmit,buttonText="Submit",handleDelete
}) => {
  return (
    <div className="p-3 ">
        <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text"
            placeholder="Enter Category Name"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className="py-3 px-4 border rounded-lg w-full" />
            <div className="flex justify-between">
                <button className="bg-blue-50 text-black py-2 px-4 rounded-lg">{buttonText}</button>
                {handleDelete && (
                    <button type="button" onClick={handleDelete} className="bg-red-50 text-black py-2 px-4 rounded-lg">Delete</button>
                )}
            </div>
        </form>
      
    </div>
  )
}




export default CategoryForm;
