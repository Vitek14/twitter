import "./ProfileContent.css"
import {Avatar, Image} from "antd";
import {UserOutlined} from "@ant-design/icons";

const ProfileContent = () => {
    return (
        <div className="ProfileContent">
            {/*<img src="https://st4.depositphotos.com/7269304/24917/i/450/depositphotos_249175016-stock-photo-background-white-marble-pattern-wavy.jpg"/>*/}
            <Image
                src="https://st4.depositphotos.com/7269304/24917/i/450/depositphotos_249175016-stock-photo-background-white-marble-pattern-wavy.jpg"
                className="profileBanner"
            />
            <Avatar size={132} src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            style={{
                marginTop: "-60px",
                marginLeft: "10px"
            }}/>
        </div>
    )
}

export default ProfileContent