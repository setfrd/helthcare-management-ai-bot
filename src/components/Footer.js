// components/Footer.js

const Footer = () => {
    return (
      <footer className="text-white body-font bg-blue-500 h-16">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-white sm:ml-6 sm:mt-0 mt-4">
            © {new Date().getFullYear()} Healthcare Management AI-Bot — Made by PWR Students. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  