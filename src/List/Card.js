import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {  hover : false,
                        dragOver: false,
                        dragged: false};
    }
    
    /*Hover*/
    mouseOver(){this.setState({hover : true})}
    mouseOut(){this.setState({hover: false})}
    
    /*Kartička s kterou táhnu*/
    dragStart(evt){
        evt.preventDefault();  
        evt.stopPropagation();
        this.setState({dragged: true});
        console.log("Táhnu s kartičkou číslo: " + this.props.card.id + ", " + this.state.dragged);
    }
    dragDrop(evt){
        evt.preventDefault();  
        evt.stopPropagation();
        this.setState({dragged: false});
        this.forceUpdate();
        console.log("Upustil jsem kartičku číslo: " + this.props.card.id + ", " + this.state.dragged);
    }
    
    /*Kartička přes kterou táhnu*/
    dragOver(evt){
        evt.preventDefault();  
        evt.stopPropagation();
        this.setState({dragOver: true});
    }
    dragOut(evt){
        evt.preventDefault();  
        evt.stopPropagation();
        this.setState({dragOver: false});
    }
    
    handleClick(evt){
        evt.preventDefault();
        this.props.onDelete(this.props.card.id);
    }
    
    render() {
        
        var cross;
        if (this.state.hover){
            cross = (
                <div    className="crossWraper" 
                        onClick={this.handleClick.bind(this)}>
                    <img    src="./src/cross.svg" 
                            className="cross"/>
                </div>
            );    
        }
        
        var cardClass;
        
        return (
          <a href = {this.props.card.url}>
              <div  className={(this.state.dragged ? "card moved" : "card")} 
                    onMouseOver={this.mouseOver.bind(this)} 
                    onMouseLeave={this.mouseOut.bind(this)}
                    draggable="true"
                    onDragOver={this.dragOver.bind(this)}
                    onDragExit={this.dragOut.bind(this)}
                    onDrag={this.dragStart.bind(this)}
                    onDragEnd={this.dragDrop.bind(this)}>
                    
                  <div className="img">
                    {cross}
                  </div>
                  
                  <div className="name">  
                    {this.props.card.name}     
                  </div>
                  
              </div>
          </a>
        );
    
    }
}
