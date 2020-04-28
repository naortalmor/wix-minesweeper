import React from 'react';
import { Cell } from '../interfaces/cell.interface';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";


interface CellComponentInputs {
    cell:Cell;
    isSuperman:boolean;
    cellClicked: () => void;
    markFlag: () => void;
}

export class CellComponent extends React.Component<CellComponentInputs> {
    constructor(props:CellComponentInputs) {
        super(props);

        this.click = this.click.bind(this);
    }

    renderCell(cell:Cell, isSuperman:boolean) {
      if (isSuperman) {
          if (cell.isFlagged) {
            return <FontAwesomeIcon data-testid="flag" icon={faFlag} />
          }
      } else {
          if (cell.isFlagged) {
            return <FontAwesomeIcon data-testid="flag" icon={faFlag} />;
          }
          if (!cell.isRevealed) {
            return null;
          }
      }
      
      if (cell.isMine) {
        return (<FontAwesomeIcon data-testid="mine" icon={faBomb} />);
      }
      if (cell.minesArroundCount === 0) {
        return null;
      }
      return <span data-testid="minesarround-count">{cell.minesArroundCount}</span>;
    }

    render() {
        let className = "cell" + (this.props.cell.isRevealed ? "" : " not-revealved");
        return (
            <div className={className} onClick={this.click} data-testid="cell-container">
                { this.renderCell(this.props.cell, this.props.isSuperman)}
            </div>
        )
    }

    click(event:any) {
      event.stopPropagation();
      if (event.shiftKey) {
           this.props.markFlag();
      } else {
        this.props.cellClicked()
      }
    }
}