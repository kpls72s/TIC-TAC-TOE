import React, {useState} from "react";
import { Circle, Multiply } from "../../shapes";
import Modal from "../Modal/modal";
import "./environment.css";

function Environment({ setresult,reset }) {
  const[modal,setModal] = useState(false)
  let Winner = false;
  let Player = "user";
  let user = 1;
  let computer = 3;
  let MAX_SELECT = 9;
  let select_count = 0;
  let matrix = Array(3).fill(0).map(() => Array(3).fill(0));
  let cells = null;
  let userSvg = Circle;
  let computerSvg = Multiply;

  const clickHandler = (e) => {
    let item = e.currentTarget;
    let player = item.dataset.player;
    let x = item.dataset.x;
    let y = item.dataset.y;
    if (player === "") {
      select_count++;
      item.dataset.player = Player;
      fillMatrix(x, y, user);
      userDraw(item);
      select_count >= MAX_SELECT || handelComputer();
    }
  };

  const blockUser = () => {
    let sumSkewLeft = 0;
    let sumSkewRight = 0;
    for (let i = 0; i < 3; i++) {
      let sumRow = matrix[i].reduce((first, second) => first + second);
      let sumColumn = 0;
      
      for(let j = 0; j < 3 ; j++){
        sumColumn += matrix[j][i];
      }

      sumSkewRight = matrix[0][2] + matrix[1][1] + matrix[2][0]
      sumSkewLeft += matrix[i][i];
      console.log(sumSkewLeft)
      if (sumRow === 2) {
        return blockUserRow(i);
      } else if (sumColumn === 2) {
        return blockUserCol(i);
      }else if(sumSkewLeft === 2){
        return blockSkewLeft();
      }else if(sumSkewRight === 2){
        return blockSkewRight();
      }
    }
    return false;
  };


  const blockSkewRight = () => {
    let i = 0;
    let j = 2;
    while(i < 3){
      if(matrix[i][j] === 0){
        return {x : i , y : j}
      }
      j--;
      i++
    }
  }

  const blockSkewLeft = () => {
    let i=0;
    while(i < 3){
      if(matrix[i][i] === 0 ){
        return ({x : i , y : i}) 
      }
      i++;
    }
  }
  const blockUserRow = (row) => {
    for (let i = 0; i < 3; i++) {
      if (matrix[row][i] === 0) {
        return { x: row, y: i };
      }
    }
    return "";
  };

  const blockUserCol = (col) => {
    for (let i = 0; i < 3; i++) {
      if (matrix[i][col] === 0) {
        return { x: i, y: col };
      }
    }
    return "";
  };

  const handelComputer = () => {
    let selectCell = null;
    let condition = true;
    let blockCell;
    let x;
    let y;
    cells = Array.from(document.querySelectorAll(".grid-item"));

    blockCell = blockUser();
    console.log(blockCell);
    if (blockCell) {
      selectCell = cells.find((item) => {
        return (
          parseInt(item.dataset.x) === blockCell.x &&
          parseInt(item.dataset.y) === blockCell.y
        );
      });
      x = blockCell.x;
      y = blockCell.y;
    } else {
      let randomIndex = () => Math.floor(Math.random() * 9);
      while (condition) {
        selectCell = randomIndex();
        condition = cells[selectCell].dataset.player === "" ? false : true;
      }
      selectCell = cells[selectCell];
      selectCell.dataset.player = Player;
      x = selectCell.dataset.x;
      y = selectCell.dataset.y;
    }

    if (!Winner) {
      select_count++;
      fillMatrix(x, y, computer);
      computerDraw(selectCell);
    }
  };

  const fillMatrix = (x, y, userValue) => {
    matrix[x][y] = userValue;
    checkState(x, y);
  };

  const userDraw = (targetElement) => {
    targetElement.innerHTML = userSvg;
    const svgElement = targetElement.firstElementChild;
    svgElement.classList.remove("d-none");
    let userShape = svgElement.firstElementChild;
    setTimeout(() => {
      userShape.style.strokeDashoffset = 0;
    }, 100);
    targetElement.innerHTML = "";
    targetElement.appendChild(svgElement);
    Player = "computer";
  };

  const computerDraw = (targetElement) => {
    targetElement.dataset.player = Player;
    targetElement.innerHTML = computerSvg;
    const svgElement = targetElement.firstElementChild;
    svgElement.classList.remove("d-none");
    let children = svgElement.children;
    Array.from(children).forEach((element) => {
      setTimeout(() => {
        element.style.strokeDashoffset = 0;
      }, 1000);
    });
    targetElement.innerHTML = "";
    targetElement.appendChild(svgElement);
    Player = "user";
  };

  const checkState = (x, y) => {
    let sumX = 0;
    let sumY = 0;
    let sumSkewX = 0;
    let sumSkewY = 0;
    let j = 2;
    for (let i = 0; i < 3; i++) {
      sumX += matrix[x][i] !== 0 ? matrix[x][i] : NaN;
      sumY += matrix[i][y] !== 0 ? matrix[i][y] : NaN;
      sumSkewX += matrix[i][i] !== 0 ? matrix[i][i] : NaN;
      sumSkewY += matrix[i][j - i] !== 0 ? matrix[i][j - i] : NaN;
    }
    if (sumSkewX || sumSkewY || sumX || sumY) {
      let result = checkWinner(sumX, sumY, sumSkewX, sumSkewY);
      if (result !== "") {
        Winner = true;
        setTimeout(() => {
          setresult(result);
          setModal(true)
        }, 1000);
      }
    }
  };

  const checkWinner = (sumx, sumy, sumSkewx, sumSkewy) => {
    let checkWinner;
    checkWinner =
      sumx === 3 || sumy === 3 || sumSkewy === 3 || sumSkewx === 3
        ? "user"
        : sumx === 9 || sumy === 9 || sumSkewy === 9 || sumSkewx === 9
        ? "computer"
        : select_count === MAX_SELECT
        ? "equal"
        : "";
    return checkWinner;
  };


  const cleanCells = () => {
    cells = document.querySelectorAll(".grid-item");
    setTimeout(() => {
      for (let cell of cells) {
        cell.innerHTML = "";
        cell.dataset.player = "";
      }
      setModal(false)
    }, 10);
  };

  const restartGame = () => {
    cleanCells()
    setModal(false);
    reset()
  }


  return (
    <>
      <div className="grid-container" id="container">
        <div
          data-player=""
          data-x="0"
          data-y="0"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="0"
          data-y="1"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="0"
          data-y="2"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="1"
          data-y="0"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="1"
          data-y="1"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="1"
          data-y="2"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="2"
          data-y="0"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="2"
          data-y="1"
          className="grid-item"
          onClick={clickHandler}
        ></div>
        <div
          data-player=""
          data-x="2"
          data-y="2"
          className="grid-item"
          onClick={clickHandler}
        ></div>
       {modal &&  <Modal reset={restartGame} keepGame={cleanCells} />}
      </div>
    </>
  );
}

export default Environment;
