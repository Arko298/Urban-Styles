import asyncHandler from "../middlewares/asyncHandler.js";
import Types from "../models/typeSchema.js";

const createTypes=asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body;

        if (!name) return res.status(400).json("Please provide a name");

        const existingTypes= await Types.findOne({name});
        if(existingTypes) return res.status(400).json("Type already exists");

        const Type=await new Types({name}).save();
        if(!Type) return res.status(500).json("Internal Server error");
        res.status(201).json("Type created successfully")
        
    } catch (error) {
        res.status(400).json(error)

        
    }
})

const updateType= asyncHandler(async(req,res)=>{
    try {
        const { name } = req.body;
        const { TypeId } = req.params;
    
        const Type = await Types.findOne({ _id: TypeId });
        if (!Type) return res.status(404).send("Type not found");
        if (name) Type.name = name;
        const updatedType = await Type.save();
        res.json(updatedType);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

const removeType = asyncHandler(async (req, res) => {
  try {
    const removed = await Types.findByIdAndRemove(req.params.TypeId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listType = asyncHandler(async (req, res) => {
  try {
    const all = await Types.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readType = asyncHandler(async (req, res) => {
  try {
    const Type = await Types.findOne({ _id: req.params.id });
    res.json(Type);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});


export {
    createTypes,
    updateType,
    readType,
    listType,
    removeType

}