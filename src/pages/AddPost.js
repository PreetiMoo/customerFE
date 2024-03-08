import React, { useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';

const AddPost = ({ onPostSuccess, userID}) => {
  const [formData, setFormData] = useState({
    title: "preeti",
    body: ""
  });

  const handleChange = (event) => {
    console.log("in handlechange")
    const name = event.target.name;
    const value  = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the following data with the actual data you want to post
      const postData = {
        title: formData.title,
        body: formData.body,
        userId: userID
      };

      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
      onPostSuccess(response.data);
      console.log("Post successful:", response.data);
    } catch (error) {
      console.error("Error posting new post:", error);
    }
  };

  return (
    <div>
      <h3>{userID}, Add New Post</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Body:
          <textarea name="body" value={formData.body} onChange={handleChange} />
        </label>
        <br />
        {/* <button type="submit">Submit</button> */}
        <Button variant="warning" type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddPost;
