import React, { useState } from "react";
import { Typography, Input, Button, Form } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [TextareaValue, setTextareaValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (e) => {
    e.preventDefault();
    setTitleValue(e.currentTarget.value);
  };

  const textareaChangeHandler = (e) => {
    setTextareaValue(e.currentTarget.value);
  };

  const priceChangeHandler = (e) => {
    setPriceValue(e.currentTarget.value);
  };

  const continentChangeHandler = (e) => {
    setContinent(e.currentTarget.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!TitleValue || !TextareaValue || !PriceValue || !Continent || !Images) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }

    const body = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: TextareaValue,
      price: PriceValue,
      images: Images,
      continents: Continent,
    };

    Axios.post("/api/product", body).then((res) => {
      if (res.data.success) {
        alert("상품 업로드에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> 여행 상품 업로드</Title>
      </div>

      <Form onSubmit={submitHandler}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={TitleValue} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={textareaChangeHandler} value={TextareaValue} />
        <br />
        <br />
        <label>가격($)</label>
        <Input onChange={priceChangeHandler} value={PriceValue} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler} type="submit">
          확인
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
