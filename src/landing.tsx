
import './GetStarted.css'; // Import the CSS file
// import App from './App';

  
  const GetStarted: React.FC = () => {
  
    return (
    <div className="container">
      {/* Main Section */}
      <div className="main-content">
        <h1 className="title">Welcome to Your Content Management System</h1>
      </div>
      {/* Hero Section */}
      {/* <div className="hero">
        <img
          src="https://images.pexels.com/photos/5642754/pexels-photo-5642754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="CMS Hero"
          className="hero-image"
        />
      </div> */}
      <div className="main-content">
        <p className="description">
          Manage your content with ease. Upload, organize, and control your assets effortlessly. Whether you're a creator, publisher, or business owner, our CMS provides you with the tools to stay ahead in the content game.
        </p>

        <button className="get-started-button">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <h3 className="feature-title">Upload Your Content</h3>
          <p className="feature-description">
            Quickly and easily upload your content files. Support for all file types including images, videos, documents, and more.
          </p>
        </div>

        <div className="feature">
          <h3 className="feature-title">Organize Your Files</h3>
          <p className="feature-description">
            Manage your content in a structured and organized way, allowing you to find, edit, or remove files with just a few clicks.
          </p>
        </div>

        <div className="feature">
          <h3 className="feature-title">Stay in Control</h3>
          <p className="feature-description">
            Stay in complete control of your digital assets. Monitor access, track changes, and maintain ownership of your content.
          </p>
        </div>

        <div className="feature">
          <h3 className="feature-title">Collaborate Seamlessly</h3>
          <p className="feature-description">
            Work with your team in real-time. Share access, assign roles, and collaborate with your entire organization efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}; 
export default GetStarted;