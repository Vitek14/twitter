import {Image} from "antd";

const Banner = () => {
  return (
    <Image
      src="https://i.pinimg.com/originals/70/31/2d/70312d533a72f2ae4e934fb93d2673c7.jpg"
      className="profileBanner"
      preview={false}
      style={{ width: "100%", height: "auto", objectFit: "cover" }}
    />
  )
}

export default Banner;
