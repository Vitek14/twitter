import AboutText from "./components/AboutText.jsx";
import AuthBlock from "./components/AuthBlock.jsx";
import "./auth.scss"

const Auth = () => {

  return (
    <div className="content-containter">
      <div className="content-container__box">
        <AboutText/>
        {/* TODO: Надо сделать так, чтобы это всё делалось через ConfigProvider.
              Но тут проблема, что у нас же динамическая тема и надо как-то это менять
              */}
        <AuthBlock/>
      </div>
    </div>
  )
}

export default Auth;
