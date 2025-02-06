import AboutText from "./components/AboutText.jsx";
import AuthBlock from "./components/AuthBlock.jsx";
import {XOutlined} from "@ant-design/icons";
import "./auth.scss"
import {useState} from "react";

const Auth = () => {
  return (
    <div className="content-containter">
      <div className="content-container__box">
        <AboutText/>
        {/* TODO: Надо сделать так, чтобы это всё делалось через ConfigProvider.
              Но тут проблема, что у нас же динамическая тема и надо как-то это менять
              */}
        <AuthBlock/>
        {/*<div className="x-image-box">*/}
        {/*  <div className="x-image-box__image">*/}
        {/*    <XOutlined/>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default Auth;
