import bannerImage from '../banner.jpg';

const Home = () => {
    return (
      <>
            {/* Banner Image */}
            <div className="banner">
            <img src={bannerImage} alt="Banner" className="img-fluid" style={{width:"100%",maxHeight: "50vh",overflow: "hidden",objectFit: "cover"}} />
          </div>
    <h1 style={{ marginLeft: "2rem" }}>Welcome to SubsHub!!</h1>
    <h4 style={{ marginLeft: "2rem" }}>Streamline your subscriptions with our all-in-one management system.</h4>
      </>
    )
  };


  
  export default Home;