import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import AddPost from "./AddPost";

const Blogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([{ id: 500, title: "prashin" }, { id: 502, title: "preeti" }]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const navigateToContact = () => {
    navigate("/contact");
  };

  const handlePostSuccess = (newPost) => {
    setPosts((prevPosts) => [newPost,...prevPosts]);
  };

  const deletePosts =(id) => {
    setPosts(posts.filter(obj => obj["id"] !== id))
  }

  return (
    <>
      <h2>Blogs Page</h2>
      <button onClick={navigateToContact}>Go to Contact</button>
      <button onClick={fetchPosts}>Show posts</button>

      <h3>Posts:</h3>
      <ul>
      {posts.map((post) => (
  <li key={post.id}>
    {post.title}
    <button onClick={() => deletePosts(post.id)}>delete</button>
  </li>
))}

      </ul>

      <AddPost onPostSuccess={handlePostSuccess} userID= {1} />

      <Outlet />
    </>
  );
};

export default Blogs;


// import React, { useState, useEffect } from "react";
// import { Outlet, Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Blogs = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([{id:1,"title":"prashin"}, {id:2,"title":"preeti"}]);

//   //useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
//         setPosts((prevPosts) => [...prevPosts, ...response.data]);
//         console.log(posts)
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//    // fetchPosts();
//   // }, []);

//   const navigateToContact = () => {
//     navigate("/contact");
//   };



//   return (
//     <>
//       <h2>Blogs Page</h2>
//       <button onClick={navigateToContact}>Go to Contact</button>
//       <button onClick={fetchPosts}>Show posts</button>

//       <h3>Posts:</h3>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>

//       <Outlet />
//     </>
//   );
// };

// export default Blogs;


// const Blogs = () => {
//     return <h1>Blogs</h1>;
//   };
  
//   export default Blogs;