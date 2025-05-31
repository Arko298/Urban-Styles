import { useState } from "react";
import {
    useCreateTypesMutation,
    useRemoveTypesMutation,
    useUpdateTypesMutation,
    useFetchTypesQuery,
} from "../../redux/api/typesApiSlice";

import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import TypeForm from "../../components/TypeForm";


const TypesList = () => {
  const { data: types } = useFetchTypesQuery();
  const [name, setName] = useState("");
  const [selectedTypes, setSelectedTypes] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createTypes] = useCreateTypesMutation();
  const [updateTypes] = useUpdateTypesMutation();
  const [deleteTypes] = useRemoveTypesMutation();

  const handleCreateTypes = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Types name is required");
      return;
    }

    try {
      const result = await createTypes({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating Types failed, try again.");
    }
  };

  const handleUpdateTypes = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Types name is required");
      return;
    }

    try {
      const result = await updateTypes({
        typesId: selectedTypes._id,
        updatedTypes: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedTypes(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTypes = async () => {
    try {
      const result = await deleteTypes(selectedTypes._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedTypes(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Types deletion failed. Tray again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
     
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Types</div>
        <TypeForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateTypes}
          
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {types?.map((types) => (
            <div key={types._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedTypes(types);
                    setUpdatingName(types.name);
                  }
                }}
              >
                {types.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <TypeForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateTypes}
            buttonText="Update"
            handleDelete={handleDeleteTypes}
          />
        </Modal>
      </div>
    </div>
  );
};

export default TypesList;