/**
 * Copyright © 2019 Elastic Path Software Inc. All rights reserved.
 *
 * This is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this license. If not, see
 *
 *     https://www.gnu.org/licenses/
 *
 *
 */
import 'aframe';
// import 'aframe-animation-component';
// import 'aframe-particle-system-component';
import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';
import './VRProductDisplayItem.less';
import { ReactComponent as CloseIcon } from '../../../images/icons/close-icon.svg';
import { ReactComponent as Fullscreen } from '../../../images/icons/fullscreen.svg';
import { ReactComponent as InfoIcon } from '../../../images/icons/info.svg';

interface IVRComponentState {
  showInfo: boolean,
}

interface IVRComponentProps {
  backgroundUri?: any,
  handleCloseVR: any,
}

// eslint-disable-next-line react/prefer-stateless-function
class VRProductDisplayItem extends Component<IVRComponentProps, IVRComponentState> {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
    this.showInfoPlane = this.showInfoPlane.bind(this);
    this.closeInfoPlane = this.showInfoPlane.bind(this);
  }

  showInfoPlane() {
    this.setState({ showInfo: true });
  }

  closeInfoPlane() {
    this.setState({ showInfo: false });
  }

  public render() {
    const { backgroundUri, handleCloseVR } = this.props;
    const { showInfo } = this.state;

    return (
      <div>
        <button type="button" className="exit-btn" onClick={() => handleCloseVR()}>
          <CloseIcon />
        </button>

        <button type="button" className="info-btn" onClick={() => this.showInfoPlane()}>
          <InfoIcon />
        </button>

        <Scene className="vr-container" embedded vr-mode-ui="enterVRButton: #myEnterVRButton;">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a id="myEnterVRButton" href="#">
            <Fullscreen />
          </a>

          {
            showInfo && <Entity primitive="a-plane" position="0 1.5 -3" rotation="0 0 0" width="5" height="4.5" color="#7BC8A4" shadow />
          }

          <a-assets>
            <img alt="" id="luxuryCar" src={backgroundUri} />
          </a-assets>

          <Entity primitive="a-sky" radius="30" src="#luxuryCar" />
        </Scene>
      </div>
    );
  }
}

export default VRProductDisplayItem;
