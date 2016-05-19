import React, { Component } from 'react'
import Card from './Card'
import Add from './Add'
import Overlay from '../Overlay/Overlay'
import AddForm from '../Overlay/AddForm'



export default class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {  showNew: false}
  }
    
  showNew (){
        this.setState({showNew: (this.state.showNew) ? false : true})
  }
   
  render() {
    var removeCard = this.props.onDelete 
    var cardDragOver = this.props.cardDragOver
    var dropCard = this.props.dropCard
    var cardDragStart = this.props.cardDragStart
    var cardRightClick = this.props.cardRightClick
    var canDelete = this.props.canDelete
    var openFolder = this.props.openFolder
    var onUndelete = this.props.onUndelete
    var moveToFolder = this.props.moveToFolder
    var listNodes = this.props.data.map(function(card){
        return (
        <Card   key = {card.id} 
                card={card} 
                onDelete={removeCard}
                onUndelete={onUndelete}
                canDelete ={canDelete}
                cardDragOver={cardDragOver}
                dropCard={dropCard}
                cardDragStart={cardDragStart}
                cardRightClick={cardRightClick}
                openFolder={openFolder}
                moveToFolder={moveToFolder}
            />
        )
    })
     
    var newOverlay
    if (this.state.showNew){
        newOverlay = (  
            <div>
                <AddForm    onAdd={this.props.onAdd} 
                            onHide={this.showNew.bind(this)}
                            website={this.props.website}
                            onRefuse={this.props.onRefuse}/>
                <Overlay    onClick={this.showNew.bind(this)}/>
            </div>
            )
    }
    
    var add
    if (this.props.showAdd){
        add = (<Add onClick={this.showNew.bind(this)}/>)
    }

    return (
      <div>
          <div className="cardList">
            {listNodes}
            {add}
          </div>
            {newOverlay}
      </div>
    )
  }
}
