import React, { Component } from "react";
import { Btn_1 as Btn } from "@src";
import Icon from '@src/components/icon'
class Home extends Component {
  render() {
    return (
      <div>
        <Icon type={"wowjoyplatform-big-fill"} theme={"filled"}/>
        <Btn to={'/list'}>点击进入</Btn>
      </div>
    );
  }
}

export default Home;
