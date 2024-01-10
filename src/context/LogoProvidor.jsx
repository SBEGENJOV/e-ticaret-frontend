import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const LogoContext = createContext();

const LogoProvider = ({ children }) => {
  const [logoVeri, setLogoVeri] = useState({});
  const [logoRes, setLogoRes] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const setLogo = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/logo`);

        if (response.ok) {
          const data = await response.json();
          setLogoVeri(data);
          setLogoRes(true);
        }
      } catch (error) {
        console.log("Silme hatası:", error);
      }
    };
    setLogo();
  }, [apiUrl]);

  return (
    <LogoContext.Provider
      value={{
        setLogoVeri,
        logoVeri,
        logoRes,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export default LogoProvider;

LogoProvider.propTypes = {
  children: PropTypes.node,
};
