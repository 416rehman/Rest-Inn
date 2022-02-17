import React from 'react';
import Select from "../../components/Select/Select";
import Option from "../../components/Select/Option";
import {Button} from "@mui/material";

function Home() {
    return (
        <div>
            <h1>This is the homepage!</h1>
            <Select options={[
                <Option value={'yes'}>
                    <div style={{
                        width: '550px',
                        background: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBkb_mv6HNwoRgRxhFaKeQQwiVeibLWDB2Kv9H5wokkLB3DpjJJa0dkZxnWbsf2QkpY5o&usqp=CAU) no-repeat",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#fff',
                        display: 'flex',
                    }}>
                        <h3>Toronto</h3>
                        <p>1352 Properties</p>
                    </div>
                </Option>,
                <Option selected={true} value={'no'} showValue={true}>i choose this?</Option>,
                <Option value={'yes'}>This is a test??</Option>,
                <Option value={'no'}>This is a test??</Option>
            ]}/>
            <Button>Click me</Button>
        </div>
    );
}

export default Home;