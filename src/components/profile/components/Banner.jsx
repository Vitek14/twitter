import {Image} from "antd";

const Banner = ({profile_image}) => {
  return (
    <Image
      src={profile_image}
      className="profileBanner"
      preview={false}
      style={{ width: "100%", height: "auto", objectFit: "cover" }}
    />
  )
}

export default Banner;
