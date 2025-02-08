import {Row, Col, Input, theme} from "antd";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";


const SearchBar = () => {
  const { token } = theme.useToken();
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('Search');

  const handleFocus = () => {
    setIsFocused(true);

    // Removes 'Search' text when user pressed on search box
    if (searchText === 'Search') {
      setSearchText('');
    }
  };

  const handleBlur = () => {
    if (searchText === '') {
      setSearchText('Search');
    }
    setIsFocused(false);
  };

  const handleChange = (e) => {
    // Sets text on search box
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Row
        style={{
          backgroundColor: token.recMenuBg,
          borderRadius: "384px",
          width: "475px",
          height: "44px",
          marginLeft: "33px",
          marginTop: "5px",
          border: isFocused ? '1px solid #00008B' : 'none',
        }}
      >
        <Col
          style={{
            position: "relative",
            alignContent: "center",
            marginLeft: "16px",
            marginRight: "26px",
          }}
        >
          <SearchIcon
            style={{
              color: isFocused ? '#00008B' : '#536471',
              fontSize: "27px",
            }}
          />
        </Col>
        <Col
          style={{
            position: "relative",
            alignContent: "center",
            textAlign: "center",
            flex: 1,
          }}
        >
          <Input
            value={searchText}
            onFocus={handleFocus}
            onBlur={handleBlur}  // Needs to put 'Search' text when no text is typed
            onChange={handleChange}
            style={{
              border: 'none',
              outline: 'none',
              textAlign: "start",
              background: 'transparent',
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
