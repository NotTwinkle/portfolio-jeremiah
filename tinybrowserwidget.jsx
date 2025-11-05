import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="browser">
        <div className="tabs-head">
          <div className="tabs">
            <div className="tab-open">
              <div className="rounded-l"><div className="mask-round" /></div>
              <span>Uiverse</span>
              <div className="close-tab">✕</div>
              <div className="rounded-r"><div className="mask-round" /></div>
            </div>
          </div>
          <div className="window-opt">
            <button>-</button>
            <button>□</button>
            <button className="window-close">✕</button>
          </div>
        </div>
        <div className="head-browser">
          <button>←</button>
          <button disabled>→</button>
          <input type="text" name id placeholder="Search Google or type URL" defaultValue="uiverse.io" />
          <button>⋮</button>
          <button className="star">✰</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .browser {
    width: 300px;
    height: 250px;
    background: lightgrey;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-shadow: 5px 5px 10px rgba(31, 31, 31, 0.245);
  }

  /* tabs-head */
  .tabs-head {
    background-color: #353535;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-left: 20px;
  }

  .tabs-head .tab-open {
    width: 100px;
    height: 34px;
    border-radius: 7px 7px 0 0;
    background-color: #515151;
    display: flex;
    gap: 5px;
    align-items: start;
    justify-content: space-between;
    padding: 4px 8px;
    position: relative;
  }

  .tabs-head .tab-open .close-tab {
    color: #fff;
    font-size: 9px;
    padding: 1px 4px 1px 4px;
    border-radius: 50%;
    cursor: default;
  }
  .tabs-head .tab-open .close-tab:hover {
    background-color: #5d5d5d;
  }

  .tabs-head .tab-open .rounded-l {
    position: absolute;
    background-color: #515151;
    width: 20px;
    height: 24px;
    top: 0;
    right: 0;
    transform: translate(100%);
    overflow: hidden;
  }
  .tabs-head .tab-open .rounded-l .mask-round {
    width: 100%;
    height: 100%;
    background-color: #353535;
    border-radius: 0 0 0 7px;
  }

  .tabs-head .tab-open .rounded-r {
    position: absolute;
    background-color: #515151;
    width: 20px;
    height: 24px;
    top: 0;
    left: 0;
    transform: translate(-100%);
    overflow: hidden;
  }

  .tabs-head .tab-open .rounded-r .mask-round {
    width: 100%;
    height: 100%;
    background-color: #353535;
    border-radius: 0 0 7px 0;
  }

  .tabs-head .tab-open span {
    color: #fff;
    font-size: 10px;
  }

  .tabs-head .window-opt {
    display: flex;
  }

  .tabs-head .window-opt button {
    height: 30px;
    width: 30px;
    border: none;
    background-color: transparent;
    transition: 0.1s ease-out;
    color: #fff;
    margin-bottom: 10px;
  }

  .tabs-head .window-opt button:hover {
    background-color: #515151c8;
  }

  .tabs-head .window-opt .window-close:hover {
    background-color: rgb(255, 52, 52);
  }

  /* head-browser */
  .head-browser {
    position: absolute;
    top: 30px;
    width: 100%;
    height: 40px;
    background-color: #515151;
    padding: 7px;
    display: flex;
    border-radius: 7px 7px 0 0;
    gap: 5px;
  }

  .head-browser input {
    background-color: #3b3b3b;
    border: 2px solid transparent;
    height: 100%;
    border-radius: 20px;
    outline: none;
    color: #fff;
    padding: 0 15px;
    flex: 1;
    transition: 0.2s ease-in-out;
  }

  .head-browser input:hover {
    background-color: #5d5d5d;
  }

  .head-browser input:focus {
    border-color: rgb(173, 214, 255);
    background-color: #3b3b3b;
    transition: none;
  }

  .head-browser input::placeholder {
    color: #fff;
  }

  .head-browser button {
    width: 27px;
    height: 25px;
    border: none;
    background-color: transparent;
    color: #fff;
    border-radius: 50%;
    transition: 0.2s ease-in-out;
  }

  .head-browser button:disabled {
    opacity: 0.4;
  }

  .head-browser button:hover {
    background-color: #5d5d5d;
  }

  .head-browser button:disabled:hover {
    background-color: transparent;
  }

  .head-browser .star {
    color: #fff;
    position: absolute;
    right: 45px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    opacity: 0.7;
    height: 18px;
    width: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 3px;
  }`;

export default Card;


//instrunctions to use this widget
//This snippet is using styled-components. Install it with npm i styled-components or yarn add styled-components, or copy the styles to your own CSS file for this code to work.