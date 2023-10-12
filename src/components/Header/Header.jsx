import Logo from "../Logo/Logo";
import SelectUser from "../SelectUser/SelectUser";

const logos = ["./logo.svg", "./mini-logo.png"];

const Header = () => {
  return (
    <>
      <Logo image={logos[0]} />
      <SelectUser />
    </>
  );
};

export default Header;
