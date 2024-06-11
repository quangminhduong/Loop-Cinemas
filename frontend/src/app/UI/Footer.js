const Footer = () => {
  const links = ["Terms of Service", "Privacy Policy", "About", "Contact"];

  return (
    <footer className="bg-[#121212] py-4 border-t-2 border-purple-500 flex items-center justify-center">
      <div className="w-full max-w-[1920px] flex flex-row justify-between px-8">
        <div className="text-white">
          &copy; {new Date().getFullYear()} Loop Cinemas
        </div>
        <div className="flex flex-row">
          {links.map((link) => (
            <div
              className="text-white border-r-[1px] border-r-white px-2 last:border-r-0 cursor-pointer"
              key={link}
            >
              {link}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
