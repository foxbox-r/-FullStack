import { CloseOutlined } from "@ant-design/icons"
import React,{useState} from "react"
import Slick from "react-slick"
import styled,{createGlobalStyle} from "styled-components"
import {Overlay,Global,Header,CloseBtn,ImgWrapper,Indicator,SlickWrapper} from "./styled"

const ImagesZoom = ({images,onClose})=>{
    const [currentSlide,setCurrentSlide] = useState(0);
    return (
        <Overlay>
            <Global />
            <Header>
                <h1>detail</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick 
                    initialSlide={0}
                    afterChange={(slide)=>setCurrentSlide(slide)}
                    infinitea
                    arrows={false}
                    slidesToScroll={1}
                    >
                    {images.map(v=>(
                        <ImgWrapper key={v.src}>
                            <img src={v.src} alt={v.src} />
                        </ImgWrapper>    
                    ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {" "}
                            /
                            {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
}

export default ImagesZoom;

