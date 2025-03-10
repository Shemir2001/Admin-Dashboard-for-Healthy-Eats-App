// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const BlogEditor = () => {
//   const [content, setContent] = useState("");

//   // Quill modules for toolbar configuration
//   const modules = {
//     toolbar: [
//       [{ font: [] }, { size: [] }], // Font & size
//       ["bold", "italic", "underline", "strike"], // Text styles
//       [{ color: [] }, { background: [] }], // Color & background
//       [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
//       [{ header: 1 }, { header: 2 }, "blockquote", "code-block"], // Headers & Code block
//       [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // Lists & Indent
//       ["link", "image", "video"], // Media
//       ["align", { direction: "rtl" }], // Text align
//       ["clean"], // Remove formatting
//     ],
//   };

//   return (
//     <div className="p-4 bg-[#E8D7CF] h-screen w-full flex justify-center">
//       <div className="w-full  bg-[#F5ECE6] p-4 rounded-md h-full shadow-md">
//         {/* Header with Title and Buttons */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add new blog</h2>
//           <div className="flex gap-3">
//             <button className="px-4 py-2 bg-gray-300 rounded-md shadow hover:bg-gray-400">
//               Save
//             </button>
//             <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
//               Publish
//             </button>
//           </div>
//         </div>
//         <div className="bg-white p-2 rounded-md shadow">
//           <ReactQuill
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             className="h-full mb-4"
//             style={{ height: "530px", overflow: "auto" }} 
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogEditor;
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from 'firebase/firestore';
// import { storage, db } from './firebase';

// const Editor = () => {
//   const [htmlContent, setHtmlContent] = useState('');

//   const handleQuillChange = (content, delta, source, editor) => {
//     setHtmlContent(editor.getHTML());
//   };

//   const handleMediaUpload = async (e, type) => {
//     const file = e.target.files[0];
//     const fileRef = ref(storage, `uploads/${file.name}`);
//     await uploadBytes(fileRef, file);
//     const url = await getDownloadURL(fileRef);

//     if (type === 'image') {
//       insertToEditor(`<img class="rounded-lg shadow-md my-3" src="${url}" alt="Uploaded Image"/>`);
//     } else if (type === 'video') {
//       insertToEditor(`
//         <video class="w-full rounded-lg shadow-md my-3" controls>
//           <source src="${url}" type="video/mp4">
//           Your browser does not support the video tag.
//         </video>
//       `);
//     }
//   };

//   const insertToEditor = (html) => {
//     const quill = document.querySelector('.ql-editor');
//     if (quill) {
//       quill.focus();
//       document.execCommand('insertHTML', false, html);
//       setHtmlContent(quill.innerHTML); // Sync back to state
//     }
//   };

//   const saveToFirestore = async () => {
//     const doc = {
//       intro: htmlContent,
//       sections: [
//         {
//           title: "Getting Started with Urban Gardening",
//           content: htmlContent,
//           subSections: []
//         }
//       ]
//     };

//     await addDoc(collection(db, 'urbanGardening'), doc);
//     alert('Content Saved as HTML in Firestore ✅');
//   };

//   return (
//     <div className="w-full mx-auto bg-white shadow-lg h-full rounded-lg p-6 space-y-6 border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800">🌱 Urban Gardening Editor</h2>

//       {/* Rich Text Editor */}
//       <div className="border border-gray-300 rounded-lg overflow-hidden">
//         <ReactQuill
//           value={htmlContent}
//           onChange={handleQuillChange}
//           className="h-full"
//         />
//       </div>

//       {/* Upload Controls */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex items-center space-x-3">
//           <label className="text-sm font-medium text-gray-700">Upload Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
//             onChange={(e) => handleMediaUpload(e, 'image')}
//           />
//         </div>

//         <div className="flex items-center space-x-3">
//           <label className="text-sm font-medium text-gray-700">Upload Video:</label>
//           <input
//             type="file"
//             accept="video/mp4"
//             className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
//             onChange={(e) => handleMediaUpload(e, 'video')}
//           />
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={saveToFirestore}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md"
//         >
//           💾 Save to Firestore
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Editor;
// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';

// const QuillEditor = () => {
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);
//   const quillRef = useRef(null);

//   useEffect(() => {
//     if (quillRef.current) {
//       const quill = quillRef.current.getEditor();
//       const toolbar = quill.getModule('toolbar');
//       toolbar.addHandler('image', handleImageUpload);
//       toolbar.addHandler('video', handleVideoUpload);
//     }
//   }, []);

//   const handleImageUpload = () => {
//     handleMediaUpload('image/*', 'images');
//   };

//   const handleVideoUpload = () => {
//     handleMediaUpload('video/*', 'videos');
//   };

//   const handleMediaUpload = (accept, folderName) => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', accept);

//     input.onchange = async () => {
//       if (input.files && input.files[0]) {
//         const file = input.files[0];
//         setLoading(true);

//         try {
//           const downloadURL = await uploadFileToFirebase(file, folderName);
//           const quill = quillRef.current.getEditor();
//           const range = quill.getSelection();

//           if (folderName === 'images') {
//             quill.insertEmbed(range.index, 'image', downloadURL);
//           } else if (folderName === 'videos') {
//             quill.clipboard.dangerouslyPasteHTML(
//               range.index,
//               `<div class="my-3"><video controls class="w-full rounded-md shadow-md"><source src="${downloadURL}" type="video/mp4">Your browser does not support video.</video></div>`
//             );
//           }
//         } catch (error) {
//           console.error(`Error uploading ${folderName.slice(0, -1)}:`, error);
//           alert(`Failed to upload ${folderName.slice(0, -1)}.`);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     input.click();
//   };

//   const uploadFileToFirebase = async (file, folderName) => {
//     const storage = getStorage();
//     const timestamp = new Date().getTime();
//     const fileName = `${timestamp}_${file.name}`;
//     const storageRef = ref(storage, `urbanGardening/${folderName}/${fileName}`);

//     const uploadTask = uploadBytesResumable(storageRef, file);

//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress.toFixed(2)}% done`);
//         },
//         (error) => reject(error),
//         async () => resolve(await getDownloadURL(uploadTask.snapshot.ref))
//       );
//     });
//   };

//   const saveContentToFirebase = async () => {
//     if (!content.trim()) {
//       alert('Please add some content before saving.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const db = getFirestore();
//       const docRef = await addDoc(collection(db, 'urbanGardening'), {
//         content,
//         createdAt: new Date(),
//       });

//       alert(`Document saved with ID: ${docRef.id}`);
//       setContent('');
//     } catch (error) {
//       console.error('Error saving content:', error);
//       alert('Failed to save content to Firestore.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       [{ font: [] }],
//       [{ size: ['small', false, 'large', 'huge'] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
//       [{ color: [] }, { background: [] }],
//       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//       [{ align: [] }],
//       [{ script: 'sub' }, { script: 'super' }],
//       ['link', 'image', 'video'],
//       ['clean'],
//     ],
//   };

//   return (
//     <div className="relative m-5 p-5 bg-white shadow-lg rounded-lg border border-gray-300">
//       <h2 className="text-xl font-semibold text-gray-800">🌱 Urban Gardening Content Editor</h2>

//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
//           <div className="flex flex-col items-center space-y-2">
//             <p className="text-lg font-medium text-gray-700">Processing... Please wait.</p>
//             <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
//               <div className="h-full bg-green-500 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-4 h-full border border-gray-300 rounded-md  overflow-y-auto">
//         <ReactQuill
//           ref={quillRef}
//           theme="snow"
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           placeholder="Start writing about urban gardening..."
//           className="h-96"
//         />
//       </div>

//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={saveContentToFirebase}
//           disabled={loading || !content.trim()}
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             loading || !content.trim()
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               : 'bg-green-600 text-white hover:bg-green-700'
//           }`}
//         >
//            Save to Firebase
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuillEditor;


// import React, { useState } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
// import { db } from "./firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// export default function AdminBlogForm() {
//   const [newCategory, setNewCategory] = useState("");

//   const { control, handleSubmit, setValue, getValues, register } = useForm({
//     defaultValues: {
//       author: "",
//       name: "",
//       slug: "",
//       categories: [],
//       tags: "",
//       thumbnailImage: "",
//       excerpt: "",
//       isFeatured: false,
//       content: {
//         intro: "",
//         sections: []
//       }
//     }
//   });

//   const { fields: sections, append: addSection } = useFieldArray({
//     control,
//     name: "content.sections"
//   });

//   // Firestore Save
//   const saveToFirestore = async (data) => {
//     const payload = {
//       ...data,
//       categories: data.categories.map(cat => cat.trim()),
//       tags: data.tags.split(",").map(tag => tag.trim()),
//       publishedDate: serverTimestamp()
//     };

//     try {
//       console.log("Uploading payload:", payload);
//       await addDoc(collection(db, "Blogs"), payload);
//       alert("✅ Blog saved to Firestore!");
//     } catch (error) {
//       console.error("🔥 Error saving blog:", error.message);
//       alert("❌ Failed to save to Firestore.");
//     }
//   };

//   // Add new category to the list
//   const addCategory = () => {
//     const currentCategories = getValues("categories");
//     if (newCategory.trim() && !currentCategories.includes(newCategory.trim())) {
//       setValue("categories", [...currentCategories, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   // Remove category from the list
//   const removeCategory = (catToRemove) => {
//     const updatedCategories = getValues("categories").filter(cat => cat !== catToRemove);
//     setValue("categories", updatedCategories);
//   };

//   return (
//     <form onSubmit={handleSubmit(saveToFirestore)} className="p-5 space-y-4">
//       <TextField label="Author" fullWidth {...register("author", { required: "Author is required" })} />
//       <TextField 
//         label="Blog Title" 
//         fullWidth 
//         {...register("name", { required: "Title is required" })}
//         onBlur={(e) => setValue("slug", e.target.value.toLowerCase().replace(/ /g, "-"))}
//       />
//       <TextField label="Slug" fullWidth {...register("slug", { required: "Slug is required" })} />

//       {/* Categories List */}
//       <div className="space-y-2">
//   <h3 className="font-semibold">Categories</h3>
  
//   {/* Input + Add Button Row */}
//   <div className="flex gap-2">
//     <TextField 
//       label="Add Category" 
//       value={newCategory} 
//       onChange={(e) => setNewCategory(e.target.value)} 
//     />
//     <Button onClick={addCategory}>Add</Button>
//   </div>

//   {/* Scrollable Categories List */}
//   <ul className="list-disc ml-5 max-h-16 overflow-y-auto border p-2">
//     {getValues("categories").map((cat, index) => (
//       <li key={index} className="flex justify-between items-center">
//         {cat}
//         <Button size="small" color="error" onClick={() => removeCategory(cat)}>Remove</Button>
//       </li>
//     ))}
//   </ul>
// </div>


//       <TextField 
//         label="Tags (comma separated)" 
//         fullWidth 
//         {...register("tags")}
//       />
//       <TextField 
//         label="Thumbnail Image URL" 
//         fullWidth 
//         {...register("thumbnailImage", { required: "Image URL is required" })}
//       />
//       <TextField 
//         label="Excerpt" 
//         multiline rows={3} 
//         fullWidth 
//         {...register("excerpt", { required: "Excerpt is required" })}
//       />
//       <FormControlLabel 
//         control={<Controller name="isFeatured" control={control} render={({ field }) => (
//           <Checkbox checked={field.value} onChange={field.onChange} />
//         )} />} 
//         label="Feature this post" 
//       />

//       <TextField 
//         label="Introduction" 
//         multiline rows={3} 
//         fullWidth 
//         {...register("content.intro", { required: "Introduction is required" })}
//       />

//       {/* Sections + SubSections */}
//       <h3 className="text-lg font-bold">Sections</h3>
//       {sections.map((section, sectionIndex) => (
//         <div key={section.id} className="p-3 border">
//           <TextField 
//             label="Section Title" 
//             fullWidth 
//             {...register(`content.sections.${sectionIndex}.title`, { required: "Section title is required" })}
//           />
//           <TextField 
//             label="Section Content" 
//             multiline rows={3} 
//             fullWidth 
//             {...register(`content.sections.${sectionIndex}.content`, { required: "Section content is required" })}
//           />
//           <SubSectionArray control={control} sectionIndex={sectionIndex} />
//         </div>
//       ))}
//       <Button variant="outlined" onClick={() => addSection({ title: "", content: "", subSections: [] })}>Add Section</Button>

//       <div className="flex gap-3">
//         <Button type="submit" variant="contained" color="primary">Publish</Button>
//       </div>
//     </form>
//   );
// }

// // SubSection Handler
// function SubSectionArray({ control, sectionIndex }) {
//   const { fields, append } = useFieldArray({
//     control,
//     name: `content.sections.${sectionIndex}.subSections`
//   });

//   return (
//     <>
//       <h4 className="text-md font-semibold">SubSections</h4>
//       {fields.map((sub, subIndex) => (
//         <div key={sub.id} className="ml-4 border p-2">
//           <Controller name={`content.sections.${sectionIndex}.subSections.${subIndex}.title`} control={control} render={({ field }) => (
//             <TextField {...field} label="SubSection Title" fullWidth />
//           )} />
//           <Controller name={`content.sections.${sectionIndex}.subSections.${subIndex}.content`} control={control} render={({ field }) => (
//             <TextField {...field} label="SubSection Content" multiline rows={2} fullWidth />
//           )} />
//         </div>
//       ))}
//       <Button size="small" onClick={() => append({ title: "", content: "" })}>Add SubSection</Button>
//     </>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { db } from "./firebase";
// import { collection, addDoc, setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";

// export default function AdminBlogForm() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();

//   const editingBlog = location.state?.blog;

//   const [newCategory, setNewCategory] = useState("");

//   const { control, handleSubmit, setValue, getValues, register, reset } = useForm({
//     defaultValues: {
//       author: "",
//       name: "",
//       slug: "",
//       categories: [],
//       tags: "",
//       thumbnailImage: "",
//       excerpt: "",
//       isFeatured: false,
//       content: {
//         intro: "",
//         sections: []
//       }
//     }
//   });

//   // Prefill logic for edit
//   useEffect(() => {
//     if (editingBlog) {
//       reset(editingBlog);
//     } else if (id) {
//       loadBlogFromFirestore(id);
//     }
//   }, [editingBlog, id, reset]);

//   const loadBlogFromFirestore = async (blogId) => {
//     const docRef = doc(db, "Blogs", blogId);
//     const snapshot = await getDoc(docRef);
//     if (snapshot.exists()) {
//       const blogData = snapshot.data();
//       reset(blogData);
//     } else {
//       alert("Blog not found!");
//       navigate("/");
//     }
//   };

//   const { fields: sections, append: addSection } = useFieldArray({
//     control,
//     name: "content.sections"
//   });

//   const saveToFirestore = async (data) => {
//     const payload = {
//       ...data,
//       categories: data.categories.map((cat) => cat.trim()),
//       tags: data.tags.split(",").map((tag) => tag.trim()),
//       publishedDate: serverTimestamp(),
//     };

//     try {
//       if (editingBlog || id) {
//         const blogId = editingBlog?.id || id;
//         await setDoc(doc(db, "Blogs", blogId), payload, { merge: true });
//         message.success("Blog updated successfully!");
//       } else {
//         await addDoc(collection(db, "Blogs"), payload);
//         message.success("Blog created successfully!");
//       }
//       navigate("/");
//     } catch (error) {
//       console.error("Error saving blog:", error.message);
//       alert("❌ Failed to save blog.");
//     }
//   };

//   const addCategory = () => {
//     const currentCategories = getValues("categories");
//     if (newCategory.trim() && !currentCategories.includes(newCategory.trim())) {
//       setValue("categories", [...currentCategories, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   const removeCategory = (catToRemove) => {
//     const updatedCategories = getValues("categories").filter((cat) => cat !== catToRemove);
//     setValue("categories", updatedCategories);
//   };

//   return (
//     <form onSubmit={handleSubmit(saveToFirestore)} className="p-5 space-y-4">
//       <TextField label="Author" fullWidth {...register("author", { required: "Author is required" })} />
//       <TextField
//         label="Blog Title"
//         fullWidth
//         {...register("name", { required: "Title is required" })}
//         onBlur={(e) => setValue("slug", e.target.value.toLowerCase().replace(/ /g, "-"))}
//       />
//       <TextField label="Slug" fullWidth {...register("slug", { required: "Slug is required" })} />

//       <div className="space-y-2">
//         <h3 className="font-semibold">Categories</h3>
//         <div className="flex gap-2">
//           <TextField
//             label="Add Category"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//           />
//           <Button onClick={addCategory}>Add</Button>
//         </div>
//         <ul className="list-disc ml-5 max-h-16 overflow-y-auto border p-2">
//           {getValues("categories").map((cat, index) => (
//             <li key={index} className="flex justify-between items-center">
//               {cat}
//               <Button size="small" color="error" onClick={() => removeCategory(cat)}>Remove</Button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <TextField label="Tags (comma separated)" fullWidth {...register("tags")} />
//       <TextField label="Thumbnail Image URL" fullWidth {...register("thumbnailImage", { required: "Image URL is required" })} />
//       <TextField label="Excerpt" multiline rows={3} fullWidth {...register("excerpt", { required: "Excerpt is required" })} />
//       <FormControlLabel
//         control={
//           <Controller name="isFeatured" control={control} render={({ field }) => (
//             <Checkbox checked={field.value} onChange={field.onChange} />
//           )} />
//         }
//         label="Feature this post"
//       />

//       <TextField label="Introduction" multiline rows={3} fullWidth {...register("content.intro", { required: "Introduction is required" })} />

//       <h3 className="text-lg font-bold">Sections</h3>
//       {sections.map((section, sectionIndex) => (
//         <div key={section.id} className="p-3 border">
//           <TextField label="Section Title" fullWidth {...register(`content.sections.${sectionIndex}.title`, { required: "Section title is required" })} />
//           <TextField label="Section Content" multiline rows={3} fullWidth {...register(`content.sections.${sectionIndex}.content`, { required: "Section content is required" })} />
//           <SubSectionArray control={control} sectionIndex={sectionIndex} />
//         </div>
//       ))}
//       <Button variant="outlined" onClick={() => addSection({ title: "", content: "", subSections: [] })}>Add Section</Button>

//       <div className="flex gap-3">
//         <Button type="submit" variant="contained" color="primary">
//           {editingBlog ? "Update Blog" : "Publish"}
//         </Button>
//         <Button onClick={() => navigate("/")} variant="outlined">Cancel</Button>
//       </div>
//     </form>
//   );
// }

// function SubSectionArray({ control, sectionIndex }) {
//   const { fields, append } = useFieldArray({
//     control,
//     name: `content.sections.${sectionIndex}.subSections`
//   });

//   return (
//     <>
//       <h4 className="text-md font-semibold">SubSections</h4>
//       {fields.map((sub, subIndex) => (
//         <div key={sub.id} className="ml-4 border p-2">
//           <Controller name={`content.sections.${sectionIndex}.subSections.${subIndex}.title`} control={control} render={({ field }) => (
//             <TextField {...field} label="SubSection Title" fullWidth />
//           )} />
//           <Controller name={`content.sections.${sectionIndex}.subSections.${subIndex}.content`} control={control} render={({ field }) => (
//             <TextField {...field} label="SubSection Content" multiline rows={2} fullWidth />
//           )} />
//         </div>
//       ))}
//       <Button size="small" onClick={() => append({ title: "", content: "" })}>Add SubSection</Button>
//     </>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { db, storage } from "./firebase";
import { getDocs, setDoc } from "firebase/firestore";
import {addDoc, collection,updateDoc,doc} from "firebase/firestore";
import { Spin, message, Modal, Progress, Select, Button } from "antd";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { TextField } from "@mui/material";  // MUI input for floating label
import JoditEditor from "jodit-react";
import "jodit/es2021/jodit.min.css";
import colors from '../color.js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { serverTimestamp } from "firebase/firestore";
import {InputLabel} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

export default function TextEditor() {
  const { id } = useParams();
const location = useLocation();
const existingBlog = location.state?.blog || null;

const [isEditMode, setIsEditMode] = useState(!!id);
  const editor = useRef(null);
  const [editorHtml, setEditorHtml] = useState("");

  const [categories, setCategories] = useState(["Gardening", "DIY"]);
  const [tags, setTags] = useState(["Urban", "Plants"]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploadTask, setUploadTask] = useState(null); // Track the upload task
  const [progress, setProgress] = useState(0); // Track upload progress
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [alignment, setAlignment] = React.useState('form');
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  // const [contentData, setContentData] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

  const toggleView = () => setShowForm(!showForm);
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Categories"));
      const categoriesArray = [];
      querySnapshot.forEach((doc) => {
        categoriesArray.push(...doc.data().categories);
      });
      setCategories(categoriesArray);
    };
  
    fetchCategories();
  }, []);
  useEffect(() => {
    if (isEditMode && existingBlog) {
        setTitle(existingBlog.name);
        setExcerpt(existingBlog.excerpt);
        setEditorHtml(existingBlog.content);
        setSelectedCategories(existingBlog.categories || []);
        setSelectedTags(existingBlog.tags || []);
        setIsFeatured(existingBlog.isFeatured || false);
        setThumbnailImageUrl(existingBlog.thumbnailImage || "");
    }
}, [isEditMode, existingBlog]);

  const handleCategoryChange = (value) => setSelectedCategories(value);
  const handleTagChange = (value) => setSelectedTags(value);
  const handleToggleChange = (event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment);
    }
  };
  const addCategory = async () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory("");
  
      // Update the categories collection in Firestore
      const categoriesRef = doc(db, "categories", "categoriesDoc"); // Assuming you have a document ID
      await setDoc(categoriesRef, { categories: newCategories }, { merge: true });
  
      // Update the blogTest2 collection if in edit mode
      if (isEditMode && existingBlog.id) {
        const blogRef = doc(db, "blogsTest2", existingBlog.id);
        await updateDoc(blogRef, { categories: newCategories });
      }
    } else {
      message.warning("Category already exists or is empty!");
    }
  };
  const titleHandle=(e)=>{
    setTitle(e.target.value);
  }
  const excerptHandle=(e)=>{
    setExcerpt(e.target.value);
  }
 const imageUpload = async () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.click();
    inputElement.onchange = async () => {
      const file = inputElement.files[0];
      const storageReference = ref(storage, "images/" + file.name);
      await uploadBytes(storageReference, file);
      const image = await getDownloadURL(storageReference);
      console.log(image);
      setImageUrl(image);
      setEditorHtml(
        (prev) =>
          prev +
          `<div className="w-full"><img src="${image}" alt="${file.name}" class=" rounded-md object-contain  " /></div><br/>`
      );
    };
  };
  
  
  
  
  const uploadImageToStorage = async (file, postId) => {
    const imageRef = ref(storage, `blogs/${postId}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);  // <- Await here to get the actual URL
    setThumbnailImageUrl(url);                        // <- Set actual URL, not Promise
};
  const videoUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const storageReference = ref(storage, "videos/" + file.name);
        const uploadTaskInstance = uploadBytesResumable(storageReference, file);
        setUploadTask(uploadTaskInstance); // Store the task for canceling
        setIsUploading(true); // Show dialog

        uploadTaskInstance.on(
          "state_changed",
          (snapshot) => {
            // Update progress
            const progressValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progressValue));
          },
          (error) => {
            // Handle errors
            console.error("Error uploading video:", error);
            message.error("Failed to upload video.");
            setIsUploading(false);
          },
          async () => {
            // Handle successful upload
            const video = await getDownloadURL(uploadTaskInstance.snapshot.ref);
            setVideoUrl((prevVideoUrls) => [...prevVideoUrls, video]);
            setEditorHtml(
              (prev) =>
                prev +
                `<div className="video-container h-full">
                  <video src="${video}" controls alt="${file.name}" class="rounded-md h-full w-full"> </video>
                 </div><br />`
            );
            message.success("Video uploaded successfully!");
            setIsUploading(false); // Hide dialog
          }
        );
      }
    };
  };
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };
  const slug=generateSlug(title);
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    } else {
      message.warning("Tag already exists or is empty!");
    }
  };
  const handleSave = async () => {
    if (!title || !excerpt || !editorHtml || !thumbnailImageUrl) {
        message.error("Please fill all required fields and upload an image.");
        return;
    }

    const blogData = {
        name: title,
        slug: generateSlug(title),
        author: "Mark Chen", // Ideally dynamic in real-world cases
        publishedDate: serverTimestamp(),
        categories: selectedCategories,
        tags: selectedTags,
        isFeatured,
        excerpt,
        content: editorHtml,
        thumbnailImage: thumbnailImageUrl,
    };

    try {
        if (isEditMode && existingBlog.id) {
            const docRef = doc(db, "blogsTest2", existingBlog.id);
            await updateDoc(docRef, blogData);
            message.success('Blog updated successfully!');
        } else {
            const docRef = await addDoc(collection(db, "blogsTest2"), blogData);
            await updateDoc(docRef, { id: docRef.id });
            message.success('Successfully Added');
        }
    } catch (e) {
        console.error("Error saving document: ", e);
        message.error(`Failed to ${isEditMode ? "update" : "save"} the blog.`);
    }
};
const handleSaveDraft = async () => {
  if (!title) {
    message.error("Title is required to save as draft.");
    return;
  }

  const draftData = {
    name: title,
    slug: generateSlug(title),
    author: "Mark Chen", // Ideally dynamic in real-world cases
    publishedDate: serverTimestamp(),
    categories: selectedCategories,
    tags: selectedTags,
    isFeatured,
    excerpt,
    content: editorHtml,
    thumbnailImage: thumbnailImageUrl,
    status: "draft", // Add a status field to distinguish drafts
  };

  try {
    if (isEditMode && existingBlog.id) {
      const docRef = doc(db, "drafts", existingBlog.id);
      await updateDoc(docRef, draftData);
      message.success('Draft updated successfully!');
    } else {
      const docRef = await addDoc(collection(db, "drafts"), draftData);
      await updateDoc(docRef, { id: docRef.id });
      message.success('Draft saved successfully!');
    }
  } catch (e) {
    console.error("Error saving draft: ", e);
    message.error("Failed to save draft.");
  }
};
const handlePublish = async () => {
  if (!title || !excerpt || !editorHtml || !thumbnailImageUrl) {
    message.error("Please fill all required fields and upload an image.");
    return;
  }

  const blogData = {
    name: title,
    slug: generateSlug(title),
    author: "Mark Chen", // Ideally dynamic in real-world cases
    publishedDate: serverTimestamp(),
    categories: selectedCategories,
    tags: selectedTags,
    isFeatured,
    excerpt,
    content: editorHtml,
    thumbnailImage: thumbnailImageUrl,
    status: "published", // Add a status field to distinguish published posts
  };

  try {
    if (isEditMode && existingBlog.id) {
      const docRef = doc(db, "blogsTest2", existingBlog.id);
      await updateDoc(docRef, blogData);
      message.success('Blog published successfully!');
    } else {
      const docRef = await addDoc(collection(db, "blogsTest2"), blogData);
      await updateDoc(docRef, { id: docRef.id });
      message.success('Blog published successfully!');
    }
  } catch (e) {
    console.error("Error publishing blog: ", e);
    message.error("Failed to publish the blog.");
  }
};
const editorConfig={
  readonly: false,
  toolbar: true,
  height: 500,
  toolbarAdaptive: false,
  controls: {
    paragraph: {
      list: [
        { value: "p", text: "Normal" },
        { value: "h1", text: "Heading 1" },
        { value: "h2", text: "Heading 2" },
        { value: "h3", text: "Heading 3" },
        { value: "h4", text: "Heading 4" },
        { value: "h5", text: "Heading 5" },
        { value: "h6", text: "Heading 6" },
      ],
    },
    fontsize: {
      list: ["8", "10", "12", "14", "16", "18", "24", "30", "36", "48", "60"],
    },
  },
  buttons:[
    "source",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "ul",
      "ol",
      "outdent",
      "indent",
      "font",
      "fontsize",
      "paragraph",
      "link",
      "align",
      "undo",
      "redo",
      "copyformat",
      "hr",
      "eraser",
      "table",
      "print",
      "preview",
      "brush",
    {
      name: "customImage",
      iconURL: "https://img.icons8.com/material-outlined/24/000000/image.png",
      exec: () => imageUpload(),
    },
    {
      name: "customVideo",
      iconURL: "https://img.icons8.com/material-outlined/24/000000/video.png",
      exec: () => videoUpload(),
    },
  ]
  
}
  const modalFooter = (addFn, onClose) => [
    <Button key="cancel" onClick={onClose}>Cancel</Button>,
    <Button key="save" type="primary" onClick={onClose}>Save</Button>,
  ];
  const cancelUpload = () => {
    if (uploadTask) {
      uploadTask.cancel(); // Cancel the upload
      setIsUploading(false); // Hide dialog
      message.info("Video upload canceled.");
    }
  };
  return (
    <div className="flex flex-col p-2 rounded-lg h-full overflow-hidden">
  {/* Header with Toggle & Save Buttons */}
  <div
    className="flex justify-between items-center px-4 py-3 text-white rounded-t-lg shadow-lg"
    style={{ backgroundColor: colors.bodyBg }}
  >
    <h2 className="text-xl font-semibold">
      {isEditMode ? `Edit Blog/${id}` : "Add New Blog"}
    </h2>
    <div className="flex gap-3">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleToggleChange}
        aria-label="Editor or Form"
        sx={{
          height: 32,
          '& .MuiToggleButton-root': {
            padding: '4px 12px',
            fontSize: '0.875rem',
            minWidth: '60px',
            backgroundColor: colors.bodyBg,
            color: '#ccc',
            borderColor: '#666',
            '&.Mui-selected': { backgroundColor: colors.primaryBg, color: 'white' },
            '&:hover': { backgroundColor: '#444' },
          },
        }}
      >
        <ToggleButton value="editor">Editor</ToggleButton>
        <ToggleButton value="form">Form</ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={handleSaveDraft} style={{ backgroundColor: colors.primaryBg, color: 'white' }}>
        {isEditMode ? "Update" : "Save"}
      </Button>
      <Button onClick={handlePublish} style={{ backgroundColor: colors.primaryBg, color: 'white' }}>
    Publish
  </Button>
    </div>
  </div>

  {/* Content Wrapper - flex-1 ensures it takes all space below header */}
  <div className="flex-1 h-screen overflow-hidden ">
    {alignment === 'form' ? (
      <div className=" px-1 py-4 rounded-b-lg shadow-lg overflow-scroll h-full">
        {/* Full Form Section */}
        <TextField
          fullWidth
          label="Blog Title"
          value={title}
          onChange={titleHandle}
          variant="outlined"
          size="small"
        />

        {/* Categories */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <Select
  mode="multiple"
  style={{ width: '100%' }}
  value={selectedCategories}
  placeholder="Select categories"
  onChange={handleCategoryChange}
  dropdownRender={(menu) => (
    <>
      {menu}
      <div
        style={{ padding: 8, cursor: 'pointer' }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsCategoryModalOpen(true)}
      >
        + Add New Category
      </div>
    </>
  )}
>
  {categories.map((cat) => (
    <Select.Option key={cat} value={cat}>
      {cat}
    </Select.Option>
  ))}
</Select>
        </div>

        {/* Is Featured */}
        <div className="mt-4">
          <InputLabel className="block text-sm font-medium text-gray-700">Is Featured</InputLabel>
          <ToggleButtonGroup
            color="primary"
            value={isFeatured ? 'yes' : 'no'}
            exclusive
            onChange={(e, value) => setIsFeatured(value === 'yes')}
          >
            <ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
        </div>
<div className="mt-4">
        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          value={excerpt}
          onChange={excerptHandle}
          multiline
          rows={4}
          variant="outlined"
          size="small"
          className="mt-4"
        /></div>

        {/* Image Upload */}
        <div className="mt-4">
          <InputLabel className="block text-sm font-medium text-gray-700">Choose Image</InputLabel>
          <input
            type="file"
            onChange={(e) => uploadImageToStorage(e.target.files[0], slug)}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          {thumbnailImageUrl && (
            <div className="mt-2">
              <img src={thumbnailImageUrl} alt="Thumbnail Preview" className="h-24 object-cover rounded" />
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={selectedTags}
            placeholder="Select tags"
            onChange={handleTagChange}
            dropdownRender={(menu) => (
              <>
                {menu}
                <div
                  style={{ padding: 8, cursor: 'pointer' }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setIsTagModalOpen(true)}
                >
                  + Add New Tag
                </div>
              </>
            )}
          >
            {tags.map((tag) => (
              <Select.Option key={tag} value={tag}>
                {tag}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    ) : (
      <div className="h-full  px-1 py-2 rounded-b-lg shadow-lg">
        {/* Editor Section */}
        <JoditEditor
          ref={editor}
          value={editorHtml}
          onBlur={setEditorHtml}
          config={editorConfig}
        />

        {/* Upload Modal */}
        <Modal title="Uploading Video" open={isUploading} footer={null} closable={false}>
          <div>
            <Progress percent={progress} status="active" />
            <div className="mt-4 flex justify-end gap-2">
              <Button danger onClick={cancelUpload}>Cancel</Button>
              <Button onClick={() => setIsUploading(false)} disabled={progress !== 100}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )}
  </div>

  {/* Add Category Modal */}
  <Modal
    title="Add New Category"
    open={isCategoryModalOpen}
    onCancel={() => setIsCategoryModalOpen(false)}
    footer={modalFooter(addCategory, () => setIsCategoryModalOpen(false))}
  >
    <TextField
      fullWidth
      label="Category Name"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          addTag(); // Trigger addTag on Enter key press
        }
      }}
    />
    <Button type="dashed" onClick={addCategory} className="mt-2">+ Add Category</Button>
    <div className="mt-2">
      {categories.map((cat) => (
        <div key={cat}>{cat}</div>
      ))}
    </div>
  </Modal>

  {/* Add Tag Modal */}
  <Modal
    title="Add New Tag"
    open={isTagModalOpen}
    onCancel={() => setIsTagModalOpen(false)}
    footer={modalFooter(addTag, () => setIsTagModalOpen(false))}
  >
    <TextField
      fullWidth
      label="Tag Name"
      value={newTag}
      onChange={(e) => setNewTag(e.target.value)}
     
    />
    <Button 
     onKeyDown={(e) => {
      if (e.key === 'Enter') {
        addTag(); // Trigger addTag on Enter key press
      }
    }}type="dashed" onClick={addTag} className="mt-2">+ Add Tag</Button>
    <div className="mt-2">
      {tags.map((tag) => (
        <div key={tag}>{tag}</div>
      ))}
    </div>
  </Modal>
</div>
  );
}
