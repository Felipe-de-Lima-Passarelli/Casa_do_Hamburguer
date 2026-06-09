const Footer = () => {
  return (
    <>
      <footer className="bg-[#252525] text-white py-[1%] mt-[1%]">
        <p className="text-center">
          © {new Date().getFullYear()} • Projeto desenvolvido por
          <a
            href="https://github.com/Felipe-de-Lima-Passarelli"
            target="_blank"
          >
            <span className="font-semibold ml-1">
              Felipe de Lima Passarelli
            </span>
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
