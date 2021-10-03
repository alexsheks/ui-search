import { Link as LinkR } from "react-router-dom";
// import { CgArrowUpR } from "react-icons/cg";
// import { MdClose } from "react-icons/md";
// import { CgSearch } from "react-icons/cg";
// import { IconContext } from "react-icons";
import React, { useState } from "react";
import Loading from "./Loading";
import {
  Nav,
  NavContainer,
  NavbarMenu,
  OpenedImg,
  Logo,
  SearchImg,
  OpenedSearchImage,
} from "./NavbarElements";
import {
  Container,
  PopUp,
  Content,
  Searchbar,
  LoadingCircle,
  ContainerForPopup,
} from "./SearchElements";
import CardSlider from "./Slider";
import {
  Circle,
  CircleContent,
  WrapperCircle,
  ArrowToAction,
} from "./OtherElements";
const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseValue, setResponseValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const HandleRequest = async () => {
    await fetch("https://my-json-server.typicode.com/alexsheks/TextData/posts")
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setResponseValue(data);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  // const HandleKeyPress = (event) => {
  //   if (event.key === "Enter") {

  //     HandleRequest();
  //     setInputValue("");
  //   }
  // };

  const HandleSubmit = () => {
    if (inputValue !== "") {
      setInputValue("");
      setIsLoading(true);
      setTimeout(HandleRequest, 7000);
    } else {
      alert("Введите значение");
    }
  };

  // function truncate(str, n) {
  //   return str?.length > n ? str.substr(0, n - 1) : str;
  // }

  // function truncate2(str, n) {
  //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  // }
  return (
    <>
      <Nav open={isOpen} sticky={isOpen}>
        <Logo src="/images/Logo.png"></Logo>
        <NavContainer>
          {!isOpen && (
            <NavbarMenu>
              <LinkR
                style={{ textDecoration: "none" }}
                to="#"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </LinkR>
            </NavbarMenu>
          )}
          {isOpen && (
            <SearchImg
              src="/images/search-icon.svg"
              alt="SEARCH"
              onClick={HandleSubmit}
            />
          )}
          {isOpen && (
            <Searchbar
              type="search"
              autoFocus={true}
              onKeyPress={(event) => event.key === "Enter" && HandleSubmit()}
              onChange={(event) => setInputValue(event.target.value)}
              value={inputValue}
              placeholder="Что произошло во время войны с Пьером Безуховым в произведении Толстого?"
              autoComplete={false}
              // pattern="[A-z]"
              // minLength="20"
              // maxLength="100"
            />
          )}
          {isOpen && (
            <OpenedImg
              onClick={() => {
                setIsOpen(false);
                setResponseValue([]);
                setInputValue("");
              }}
            >
              {/* <IconContext.Provider value={{ color: "white", size: "30px" }}>
                <MdClose />
              </IconContext.Provider> */}
              х
            </OpenedImg>
          )}
        </NavContainer>
      </Nav>

      <Container hidden={isOpen}>
        <WrapperCircle>
          {/* <CgArrowUpR
            size={100}
            style={{
              marginTop: "70px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></CgArrowUpR> */}

          <Circle>
            <CircleContent>START </CircleContent>
            <CircleContent>TO SEARCH VIA </CircleContent>
            <CircleContent>SEARCH BUTTON</CircleContent>
          </Circle>
        </WrapperCircle>
      </Container>

      <PopUp hidden={!isOpen}>
        {isLoading && <Loading />}

        {!isLoading && <CardSlider responseValue={responseValue} />}
      </PopUp>
    </>
  );
};

export default Page;
