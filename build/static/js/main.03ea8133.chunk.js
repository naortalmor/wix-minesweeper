(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{65:function(e,t,n){e.exports=n(79)},70:function(e,t,n){},71:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),s=n.n(i),o=(n(70),n(71),n(13)),l=n(14),c=n(17),u=n(18),d=n(20),h=n(55),p=n(37),m=function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,null,[{key:"buildBoard",value:function(t,n,a){var r=e.initBoard(t,n);return e.insertMines(r,t,n,a),e.countMinesNeighbors(r),r}},{key:"getNeighbors",value:function(e,t,n){var a=n.length,r=n[0].length,i=[];return e>0&&i.push(n[e-1][t]),t<r-1&&i.push(n[e][t+1]),e<a-1&&i.push(n[e+1][t]),t>0&&i.push(n[e][t-1]),e>0&&t>0&&i.push(n[e-1][t-1]),e>0&&t<r-1&&i.push(n[e-1][t+1]),e<a-1&&t<r-1&&i.push(n[e+1][t+1]),e<a-1&&t>0&&i.push(n[e+1][t-1]),i}},{key:"initBoard",value:function(e,t){for(var n=[],a=0;a<e;a++){n.push([]);for(var r=0;r<t;r++)n[a][r]={rowIndex:a,colIndex:r,isMine:!1,isFlagged:!1,isRevealed:!1,minesArroundCount:0}}return n}},{key:"insertMines",value:function(e,t,n,a){for(;a>0;){var r=Math.floor(Math.random()*t),i=Math.floor(Math.random()*n);e[r][i].isMine||(e[r][i].isMine=!0,a--)}}},{key:"countMinesNeighbors",value:function(t){for(var n=0;n<t.length;n++)for(var a=0;a<t[0].length;a++){if(!t[n][a].isMine){var r=e.getNeighbors(n,a,t);t[n][a].minesArroundCount=r.filter((function(e){return e.isMine})).length}}}}]),e}(),f=n(44),b=n(45),g=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).click=a.click.bind(Object(c.a)(a)),a}return Object(l.a)(n,[{key:"renderCell",value:function(e,t){if(t){if(e.isFlagged)return r.a.createElement(f.a,{"data-testid":"flag",icon:b.b})}else{if(e.isFlagged)return r.a.createElement(f.a,{"data-testid":"flag",icon:b.b});if(!e.isRevealed)return null}return e.isMine?r.a.createElement(f.a,{"data-testid":"mine",icon:b.a}):0===e.minesArroundCount?null:r.a.createElement("span",{"data-testid":"minesarround-count"},e.minesArroundCount)}},{key:"render",value:function(){var e="cell"+(this.props.cell.isRevealed?"":" not-revealved");return r.a.createElement("div",{className:e,onClick:this.click,"data-testid":"cell-container"},this.renderCell(this.props.cell,this.props.isSuperman))}},{key:"click",value:function(e){e.stopPropagation(),e.shiftKey?this.props.markFlag():this.props.cellClicked()}}]),n}(r.a.Component),v=n(116),w=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={board:m.buildBoard(a.props.board.height,a.props.board.width,a.props.board.mines),minesLeft:a.props.board.mines,flagsError:!1},a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){e.board!==this.props.board&&this.setState({board:m.buildBoard(this.props.board.height,this.props.board.width,this.props.board.mines),minesLeft:this.props.board.mines})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.state.flagsError&&r.a.createElement(v.a,{severity:"error",onClose:function(){e.setState({flagsError:!1})}},"No flegs left ..."),"Flegs left - ",this.state.minesLeft,this.renderBoard(this.state.board))}},{key:"renderBoard",value:function(e){var t=this;return e.map((function(e){return r.a.createElement("div",{className:"row",key:e[0].rowIndex},e.map((function(e){return r.a.createElement(g,{key:"".concat(e.rowIndex,",").concat(e.colIndex),cell:e,cellClicked:function(){return t.onCellClicked(e)},markFlag:function(){return t.toggleFlag(e)},isSuperman:t.props.isSuperman})})))}))}},{key:"toggleFlag",value:function(e){if(!this.state.board[e.rowIndex][e.colIndex].isRevealed){var t=!1,n=this.state.board,a=this.state.minesLeft;n[e.rowIndex][e.colIndex].isFlagged?(n[e.rowIndex][e.colIndex].isFlagged=!1,a++):this.state.minesLeft>0?(n[e.rowIndex][e.colIndex].isFlagged=!0,a--):t=!0,t?this.setState({flagsError:!0}):this.setState({board:n,minesLeft:a,flagsError:!1}),this.getFlaggedMines(n).length===this.props.board.mines&&(this.displayBoard(),alert("Congrats!! You win :)"))}}},{key:"onCellClicked",value:function(e){if(!this.state.board[e.rowIndex][e.colIndex].isRevealed&&!this.state.board[e.rowIndex][e.colIndex].isFlagged)if(this.state.board[e.rowIndex][e.colIndex].isMine)alert("Mine selected .. :( You lost"),this.displayBoard();else{var t=this.state.board;0===this.state.board[e.rowIndex][e.colIndex].minesArroundCount?t=this.revealveAllEmptyNeighbors(e.rowIndex,e.colIndex,t):t[e.rowIndex][e.colIndex].isRevealed=!0,this.setState({board:t})}}},{key:"displayBoard",value:function(){var e=this.state.board.map((function(e){return e.map((function(e){return Object(p.a)({},e,{isRevealed:!0})}))}));this.setState({board:e})}},{key:"revealveAllEmptyNeighbors",value:function(e,t,n){for(var a=[n[e][t]],r={};a.length;){var i=a.shift()||n[e][t];if(r["".concat(i.rowIndex,"_").concat(i.colIndex)]=!0,!i.isRevealed&&!i.isFlagged&&(!i.isMine||0===i.minesArroundCount)&&(i.isRevealed=!0,0===i.minesArroundCount)){var s=m.getNeighbors(i.rowIndex,i.colIndex,n).filter((function(e){return!r["".concat(e.rowIndex,"_").concat(e.colIndex)]}));a.push.apply(a,Object(h.a)(s))}}return n}},{key:"getFlaggedMines",value:function(e){var t=[];return e.forEach((function(e){return e.forEach((function(e){return e.isFlagged&&e.isMine?t.push(e):""}))})),t}}]),n}(r.a.Component),y=n(38),k=n(115),E=n(114),C=n(120),I=n(5),O=n(119),x=n(117),j=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={height:a.props.board.height,width:a.props.board.width,mines:a.props.board.mines},a.handleChanges=a.handleChanges.bind(Object(c.a)(a)),a.submit=a.submit.bind(Object(c.a)(a)),a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("form",{className:"form-container"},r.a.createElement("div",{className:"ctr"},r.a.createElement("div",{className:"row"},r.a.createElement(k.a,{id:"height",label:"height",type:"number",className:this.props.classes.formControl,onChange:this.handleChanges,value:this.state.height}),r.a.createElement(k.a,{id:"width",label:"width",type:"number",className:this.props.classes.formControl,onChange:this.handleChanges,value:this.state.width}),r.a.createElement(k.a,{id:"mines",label:"mines",type:"number",className:this.props.classes.formControl,onChange:this.handleChanges,value:this.state.mines})),r.a.createElement(O.a,{control:r.a.createElement(x.a,{checked:this.props.isSuperman,onChange:function(){return e.props.toggleSuperman(!e.props.isSuperman)},name:"isSuperman",color:"primary"}),label:"Superman"}),r.a.createElement(E.a,{variant:"contained",color:"primary",className:this.props.classes.btn,disabled:this.checkFormValidity(),onClick:this.submit},"New Game")))}},{key:"submit",value:function(){this.props.newGame(this.state.height,this.state.width,this.state.mines)}},{key:"checkFormValidity",value:function(){return this.state.height>300||this.state.height<1||this.state.width>300||this.state.width<1||this.state.mines>this.state.height*this.state.width||this.state.mines<1}},{key:"handleChanges",value:function(e){var t=e.target,n=t.id,a=+t.value;this.setState((function(e,t){return Object(p.a)({},e,Object(y.a)({},n,a))}))}}]),n}(r.a.Component),M=Object(I.a)((function(e){return Object(C.a)({formControl:{margin:e.spacing(2),minWidth:120},btn:{width:"25%"}})}),{withTheme:!0})(j),N=n(28),S={height:8,width:8,mines:8},F=Object(N.b)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT_BOARD":return t.payload;default:return e}},supermanMode:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_SUPERMAN":return t.payload;default:return e}}}),B=Object(N.c)(F),A=B,R=n(42),G=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).buildNewGame=a.buildNewGame.bind(Object(c.a)(a)),a}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"ctr"},r.a.createElement(M,{board:this.props.board,isSuperman:this.props.isSupermanMode,newGame:this.buildNewGame,toggleSuperman:this.props.toggleSuperman}),r.a.createElement(w,{board:this.props.board,isSuperman:this.props.isSupermanMode}))}},{key:"buildNewGame",value:function(e,t,n){this.props.initBoard({height:e,width:t,mines:n})}}]),n}(r.a.Component),L=Object(R.b)((function(e){return{board:e.board,isSupermanMode:e.supermanMode}}),(function(e){return{initBoard:function(t){return e({type:"INIT_BOARD",payload:t})},toggleSuperman:function(t){return e(function(e){return{type:"TOGGLE_SUPERMAN",payload:e}}(t))}}}))(G);var _=function(){return r.a.createElement(R.a,{store:A},r.a.createElement(L,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[65,1,2]]]);
//# sourceMappingURL=main.03ea8133.chunk.js.map