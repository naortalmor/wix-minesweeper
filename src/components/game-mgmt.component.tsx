import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Theme, createStyles, withStyles, Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Board } from '../interfaces/board.interface';


interface GameMgmtProps {
    board:Board;
    isSuperman:boolean;
    newGame: (height:number, width:number, mines:number) => void;
    toggleSuperman: (newMode:boolean) => void;
    classes:any;
}

interface GameMgmtState {
    height:number;
    width:number;
    mines:number;
}

class GameMgmtComponent extends React.Component<GameMgmtProps, GameMgmtState> {
    constructor(props:GameMgmtProps) {
        super(props);

        this.state = {
            height: this.props.board.height,
            width: this.props.board.width,
            mines: this.props.board.mines
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <form className="form-container">
                <div className="ctr">
                    <div className="row">
                        <TextField id="height"
                                   label="height" 
                                   type="number"
                                   className={this.props.classes.formControl}
                                   onChange={this.handleChanges}
                                   value={this.state.height}>
                        </TextField>
                        <TextField id="width"
                                   label="width" 
                                   type="number"
                                   className={this.props.classes.formControl}
                                   onChange={this.handleChanges} 
                                   value={this.state.width}>
                        </TextField>
                        <TextField id="mines"
                                   label="mines" 
                                   type="number"
                                   className={this.props.classes.formControl}
                                   onChange={this.handleChanges} 
                                   value={this.state.mines}>
                        </TextField>
                    </div>
                    <FormControlLabel control={ <Checkbox checked={this.props.isSuperman} 
                                                          onChange={() => this.props.toggleSuperman(!this.props.isSuperman)} 
                                                          name="isSuperman" 
                                                          color="primary"/>}
                            label="Superman"/>
                    <Button variant="contained" 
                            color="primary" 
                            className={this.props.classes.btn} 
                            disabled={this.checkFormValidity()} 
                            onClick={this.submit}>
                        New Game
                    </Button>
                </div>
            </form>
        )
    }

    submit():void {
        this.props.newGame(this.state.height, this.state.width, this.state.mines);
    }

    checkFormValidity():boolean {
        return this.state.height > 300 || this.state.height < 1 ||
               this.state.width > 300 || this.state.width < 1 ||
               this.state.mines > this.state.height * this.state.width || this.state.mines < 1
    }

    handleChanges(event:any) {
        const target = event.target;
        const id = target.id;
        let value = +target.value;

        this.setState((state, props) => ({
            ...state,
            [id]: value
        }))
    }
}

const styles = (theme:Theme) => createStyles({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120
      }, btn: {
          width: '25%'
      }
})

export default withStyles(styles, {withTheme: true})(GameMgmtComponent)