import AddPost from "./AddPost";
import { Outlet, useNavigate } from "react-router-dom";


const Contact = () => {
  const navigate = useNavigate();
  const navigateToBlog = (newPost) => {
  navigate("/blogs");
};
    return (
      <>
    <h1>Contact Us</h1>
    {/* <AddPost onPostSuccess={navigateToBlog} userID= {1}/> */}
    </>
    )
  };
  


  export default Contact;