import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Select from "../../components/formElements/Select/Select";
import Option from "../../components/formElements/Select/Option";
function Home() {
    return (
        <div>
            <Navbar/>
            <h1>This is the homepage!</h1>
            <Select options={[
                <Option value={'no'} showValue={true}>
                    <h1>ANYTHING IS POSSIBLE!</h1>
                </Option>,
                <Option selected={true} value={'yes'} showValue={true}>i choose this?</Option>,
                <Option value={'no'}>This is a test??</Option>,
                <Option value={'no'}>This is a test??</Option>
            ]}/>
        </div>
    );
}

export default Home;