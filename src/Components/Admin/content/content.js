import  { useState } from "react";

import Header from "../header";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addContentapi } from "../../../Services/Admin/contentApiCall";
import ContentHeader from "./contentHeader";

const Content = () => {
  const navigate = useNavigate();
  const Heigth = {
    height: "100vh",
  };
  const [addContent, setaddContent] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setaddContent({ ...addContent, [name]: value });
  };

  const saveChange = async () => {
    const newErrors = {};
    if (!addContent.title) {
      newErrors.title = "Title is required";
    }else if (addContent.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    } 
    if (!addContent.description) {
      newErrors.description = "Description is required";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
    try {
      const response = await addContentapi({ addContent });
      console.log("content added", response.addContent);
      toast.success("Content added successfully");
      setaddContent({
        title: "",
        description: "",
      });
      
     
    } catch (error) {
      console.error("Error", error);
    }}
  };

  return (
    <div>
      <Header />
      <main>
        <section class="profile-page" style={Heigth}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
              <ContentHeader />

                <div class="profile-card">
                  <h5>Input Content</h5>
                  <div class=" position-relative">
                    <input
                      type="text"
                      name="title"
                      value={addContent.title}
                      onChange={handleChange}
                      class="input-filed-profile"
                      onFocus={  (e) => setError({ ...error, title: "" })}
                    
                    />
                    <label for="" class="po-ab-label">
                      {" "}
                      Title
                    </label>
                  </div>
                  <div style={{height:"50px", paddingTop:"5px"}}>
                      <span style={{ color: "red", textAlign: "center"}}>
                        {error.title}
                      </span>
                      </div>

                  <div class="position-relative">
                    <textarea
                      name="description"
                      value={addContent.description}
                      onChange={handleChange}
                      class="input-filed-profile text-area-heightfix"
                      onFocus={  (e) => setError({ ...error, description: "" })}
                  
                    ></textarea>

                    <label for="" class="po-ab-label sptoptextarea">
                      {" "}
                      Description
                    </label>
                  </div>
                  <div style={{height:"50px", paddingTop:"5px"}}>
                      <span style={{ color: "red", textAlign: "center"}}>
                        {error.description}
                      </span>
                      </div>
                  <div class="text-right">
                    <a
                      class="save-changes"
                      style={{ cursor: "pointer" }}
                      onClick={() => saveChange()}
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Content;
