import React from 'react';
import './PortraitCard.scss';
import {CardActionArea} from "@mui/material";
import {Link} from "react-router-dom";
interface IProps {
  name: string;
  image: string;
  url: string;
}

function PortraitCard({ name, image, url }: IProps) {
    return (
        <div className={'portrait-card'}>
            <CardActionArea>
                <Link to={url}>
                    <div>
                        <img src={image} alt={name}/>
                    </div>
                    <p>{name}</p>
                </Link>                
            </CardActionArea>
        </div>
    );
}

export default PortraitCard;