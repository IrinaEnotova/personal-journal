import Logo from "../Logo/Logo";
import SelectUser from "../SelectUser/SelectUser";
import Button from "../Button/Button";
import { useCallback, useState } from "react";

const logos = ["/logo.svg", "/mini-logo.png"];

const Header = () => {
  const [logoIndex, setLogoIndex] = useState(0);
  console.log("Header!");

  const toggleLogo = useCallback(() => {
    setLogoIndex((state) => Number(!state));
  }, []);

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Change logo</Button>
    </>
  );
};

export default Header;
