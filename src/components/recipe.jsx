import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { Modal, Input, Button } from "antd";
import AddIcon from '@mui/icons-material/Add';
import "antd/dist/reset.css"; // For Ant Design v5

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { db, storage } from "./firebase"; 
import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Style as StyleIcon,
  LocalDining as IngredientsIcon,
  FitnessCenter as NutritionIcon,
  List as StepsIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import Colors from "../color.js";

const AdminRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [nutritionFacts, setNutritionFacts] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [trendingNow, setTrendingNow] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [modalType, setModalType] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "" });
  const [tempList, setTempList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch recipe data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setInitialLoading(true);
      const recipeDoc = await getDoc(doc(db, "Recipes", id));
      
      if (recipeDoc.exists()) {
        const recipeData = recipeDoc.data();
        
        // Set basic fields
        setRecipeName(recipeData.recipeName || "");
        setDescription(recipeData.description || "");
        setImageUrl(recipeData.imageUrl || "");
        setTrendingNow(recipeData.trendingNow || false);
        
        // Set arrays
        setTags(recipeData.recipeTags?.map(tag => ({ name: tag })) || []);
        
        // Format ingredients from DB format to component format
        const formattedIngredients = recipeData.ingredients?.map(ing => ({
          name: ing.name || "",
          quantity: ing.quantity || "",
          unit: ing.unit || ""
        })) || [];
        setIngredients(formattedIngredients);
        
        // Format nutrition facts
        const formattedNutrition = recipeData.nutritionFacts?.map(fact => ({
          name: fact.name || "",
          value: fact.value?.toString() || ""
        })) || [];
        setNutritionFacts(formattedNutrition);
        
        // Format instructions
        const formattedInstructions = recipeData.steps?.map(step => ({
          name: step
        })) || [];
        setInstructions(formattedInstructions);
      } else {
        message.error("Recipe not found!");
        navigate("/recipe-table");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      message.error("Failed to load recipe data");
    } finally {
      setInitialLoading(false);
    }
  };

  const openModal = (type, existingData = []) => {
    setModalType(type);
    setTempList(existingData);
    setNewItem({ name: "", quantity: "", unit: "", value: "" });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
    setNewItem({ name: "", quantity: "", unit: "", value: "" });
    setEditingIndex(null);
  };
  
  const renderCard = (type, items, IconComponent) => (
    <div
      className="p-2 rounded-lg relative h-64 overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: Colors.secondaryBg }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <IconComponent className="mr-2" />
          <label className="block font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
        </div>
  
        {items.length > 0 && (
          <div style={{ color: Colors.buttonBg }}>
            <button onClick={() => openModal(type, items)} className="px-1 py-2 text-[#26211b] cursor-pointer">
              Manage
            </button>
          </div>
        )}
      </div>
      {items.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center h-[calc(100%-3rem)] cursor-pointer"
          onClick={() => openModal(type, items)}
        >
          <AddIcon style={{ fontSize: "48px", color: Colors.textColor }} />
          <p className="mt-2 text-sm text-gray-600">Click to add {type}</p>
        </div>
      ) : type === "instructions" ? (
        <div className="p-4 flex flex-col gap-2 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="text-gray-800 bg-gray-100 p-2 rounded-md">
              {item.name}
            </div>
          ))}
        </div>
      ) : type === "ingredients" || type === "nutrition" ? (
        <div className="p-4 flex flex-col gap-2 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span>
                {item.name} {item.quantity ? `(${item.quantity} ${item.unit})` : ""} {item.value ? `: ${item.value}` : ""}
              </span>
              <button onClick={() => handleRemoveItem(index, type)} className="text-red-500 cursor-pointer">
                <DeleteOutlineOutlinedIcon style={{ color: "grey" }} fontSize="small" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ul className="p-4 flex flex-wrap gap-3 overflow-y-auto">
          {items.map((item, index) => (
            <li key={index} className="px-2 py-2 bg-gray-200 text-gray-800 rounded-md font-medium">
              <span>
                {item.name} {item.quantity ? `(${item.quantity} ${item.unit})` : ""} {item.value ? `: ${item.value}` : ""}
              </span>
              <button onClick={() => handleRemoveItem(index, type)} className="text-red-500 cursor-pointer">
                <DeleteOutlineOutlinedIcon style={{ color: "grey" }} fontSize="small" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const handleAddItem = () => {
    if (newItem.name.trim() === "") return;
    if (editingIndex !== null) {
      const updatedList = [...tempList];
      updatedList[editingIndex] = newItem;
      setTempList(updatedList);
    } else {
      setTempList([...tempList, newItem]);
    }
    setNewItem({ name: "", quantity: "", unit: "", value: "" });
    setEditingIndex(null);
  };

  const handleEditItem = (index) => {
    setNewItem(tempList[index]);
    setEditingIndex(index);
  };

  const handleUpdateItem = () => {
    if (editingIndex !== null) {
      const updatedList = [...tempList];
      updatedList[editingIndex] = newItem;
      setTempList(updatedList);
      setEditingIndex(null);
      setNewItem({ name: "", quantity: "", unit: "", value: "" });
    }
  };

  const handleRemoveItem1 = (index) => {
    setTempList(tempList.filter((_, i) => i !== index));
  };

  const handleRemoveItem = (index, type) => {
    switch (type) {
      case "tags":
        setTags(tags.filter((_, i) => i !== index));
        break;
      case "ingredients":
        setIngredients(ingredients.filter((_, i) => i !== index));
        break;
      case "nutrition":
        setNutritionFacts(nutritionFacts.filter((_, i) => i !== index));
        break;
      case "instructions":
        setInstructions(instructions.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const handleSaveModal = () => {
    switch (modalType) {
      case "tags":
        setTags(tempList);
        break;
      case "ingredients":
        setIngredients(tempList);
        break;
      case "nutrition":
        setNutritionFacts(tempList);
        break;
      case "instructions":
        setInstructions(tempList);
        break;
      default:
        break;
    }
    closeModal();
  };

  const handleGoBack = () => {
    navigate("/recipe");
  };

  const handleSaveChanges = async () => {
    if (!recipeName || !description || ingredients.length === 0 || instructions.length === 0) {
      message.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      
      let updatedImageUrl = imageUrl;
      
      // Only upload a new image if one is selected
      if (imageFile) {
        const imageRef = ref(storage, `recipe-images/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        updatedImageUrl = await getDownloadURL(imageRef);
      }
      
      const recipeData = {
        recipeName,
        description,
        imageUrl: updatedImageUrl,
        ingredients: ingredients.map((ing, index) => ({
          id: `ingredient-${index}`,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit
        })),
        nutritionFacts: nutritionFacts.map((fact, index) => ({
          id: `nutrition-${index}`,
          name: fact.name,
          value: parseFloat(fact.value) || 0,
        })),
        recipeTags: tags.map((tag) => tag.name),
        steps: instructions.map((step) => step.name),
        updatedAt: serverTimestamp(),
        trendingNow
      };
      
      await updateDoc(doc(db, "Recipes", id), recipeData);
      message.success("Recipe updated successfully!");
      navigate("/recipe");
      
    } catch (error) {
      console.error("Error updating recipe:", error);
      message.error("Failed to update recipe");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!recipeName || !description || !imageFile || ingredients.length === 0 || instructions.length === 0) {
      message.error("Please fill all required fields and upload an image.");
      return;
    }
    
    try {
      setLoading(true);
      
      const imageRef = ref(storage, `recipe-images/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const downloadUrl = await getDownloadURL(imageRef);
      setImageUrl(downloadUrl);
      
      const recipeData = {
        recipeName,
        description,
        imageUrl: downloadUrl,
        ingredients: ingredients.map((ing, index) => ({
          id: `ingredient-${index}`,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit
        })),
        nutritionFacts: nutritionFacts.map((fact, index) => ({
          id: `nutrition-${index}`,
          name: fact.name,
          value: parseFloat(fact.value) || 0,
        })),
        recipeTags: tags.map((tag) => tag.name),
        steps: instructions.map((step) => step.name),
        createdAt: serverTimestamp(),
        trendingNow: false,
      };
      
      const docRef = await addDoc(collection(db, "Recipes"), recipeData);
      message.success("Recipe published successfully!");
      
      // Reset form
      setRecipeName("");
      setDescription("");
      setImageFile(null);
      setImageUrl("");
      setTags([]);
      setIngredients([]);
      setNutritionFacts([]);
      setInstructions([]);
      
      navigate("/recipe");
      
    } catch (error) {
      console.error("Error adding document:", error);
      message.error("Failed to publish recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen mx-auto p-2 shadow-lg overflow-hidden rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button 
            onClick={handleGoBack}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <ArrowBackIcon />
          </button>
          <h1 className="text-xl font-bold">
            {isEditMode ? "Edit Recipe" : "Add New Recipe"}
          </h1>
        </div>
        
        <div className="flex space-x-4">
          {isEditMode ? (
            <button 
              className="px-6 py-2 text-white rounded-lg cursor-pointer" 
              style={{ backgroundColor: Colors.buttonBg }}
              onClick={handleSaveChanges}
            >
              {loading ? <Spin /> : "Save Changes"}
            </button>
          ) : (
            <button 
              onClick={handlePublish} 
              className="px-6 py-2 text-white rounded-lg cursor-pointer" 
              style={{ backgroundColor: Colors.buttonBg }}
            >
              {loading ? <Spin /> : "Publish"}
            </button>
          )}
        </div>
      </div>
      
      <div className="flex gap-8 h-full">
        <div 
          className="w-1/3 h-[80vh] overflow-y-auto p-4 flex flex-col space-y-8"
          style={{ backgroundColor: Colors.primaryBg }}
        >
          <div>
            <label className="block font-medium mb-2">Recipe Name</label>
            <input 
              type="text" 
              value={recipeName} 
              onChange={(e) => setRecipeName(e.target.value)} 
              className="w-full border rounded-lg p-2" 
            />
          </div>
          
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full border rounded-lg p-2 h-24"
            ></textarea>
          </div>
          
          <div>
            <label className="block font-medium mb-2">Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full border rounded-lg p-2" 
            />
            {imageUrl && (
              <div className="mt-2">
                <img 
                  src={imageUrl} 
                  alt="Recipe Preview" 
                  className="h-40 w-auto rounded-lg shadow object-cover" 
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isEditMode && !imageFile ? "Current image (upload new to replace)" : "Image preview"}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={trendingNow}
                onChange={(e) => setTrendingNow(e.target.checked)}
                className="h-4 w-4"
              />
              <span>Mark as Trending</span>
            </label>
          </div>
        </div>
        
        <div className="w-2/3 h-[80vh] overflow-y-auto p-2 grid grid-cols-2 gap-4">
          {renderCard("tags", tags, StyleIcon)}
          {renderCard("ingredients", ingredients, IngredientsIcon)}
          {renderCard("nutrition", nutritionFacts, NutritionIcon)}
          {renderCard("instructions", instructions, StepsIcon)}
        </div>
      </div>
      
      <Modal
        title={`Manage ${modalType}`}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>Cancel</Button>,
          <Button key="save" type="primary" onClick={handleSaveModal}>Save</Button>,
        ]}
        centered
      >
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              editingIndex !== null ? handleUpdateItem() : handleAddItem();
            }
          }}
          className="max-h-64 overflow-y-auto pr-2">
          <div className="flex items-center gap-2 mb-2">
            <Input
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="flex-1"
            />
            {editingIndex !== null ? (
              <Button style={{ backgroundColor: '#413c36', color: 'white' }} type="primary" onClick={handleUpdateItem}>
                Update
              </Button>
            ) : (
              <Button style={{ color: 'black' }} onClick={handleAddItem}>
                <AddIcon />
              </Button>
            )}
          </div>
          
          {modalType === "ingredients" && (
            <div className="flex items-center gap-2 mb-2">
              <Input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                className="flex-1"
              />
              <Input
                type="text"
                placeholder="Unit (e.g., grams, ml)"
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="flex-1"
              />
            </div>
          )}

          {modalType === "nutrition" && (
            <Input
              type="number"
              placeholder="Value"
              value={newItem.value}
              onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
              className="w-full mb-2"
            />
          )}
          
          <ul className="mb-2">
            {tempList.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg mb-2">
                <span>
                  {item.name} {item.quantity ? `(${item.quantity} ${item.unit})` : ""} {item.value ? `: ${item.value}` : ""}
                </span>
                <div className="flex gap-2">
                  <Button style={{ color: 'black' }} type="link" onClick={() => handleEditItem(index)}>
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                  <Button style={{ color: 'black' }} type="link" danger onClick={() => handleRemoveItem1(index)}>
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default AdminRecipeForm;