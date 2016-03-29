import React, { Component } from 'react'
import CardList from './List/CardList'
import SearchBar from './Search/SearchBar'
import ContextMenu from './List/contextmenu'

export default class App extends Component {
    constructor(props) {
        super(props)
        try {
            var data = JSON.parse(localStorage["data"])
        } catch(err) {
            data = []
        }
        this.state = {  initialData: data,
                        data: [],
                        filterList: true,
                        cardDragStart: '',
                        contextMenu: false,
                        contextTop: '',
                        contextLeft: '',
                        contextID: ''
        }  
    }
        
    componentDidMount(){
        this.setState({data: this.state.initialData})
        document.addEventListener('mousedown', this.pageClick.bind(this)) 
    }
    
    pageClick(){
        //this.setState({contextMenu: false})
    }
    
    removeItem(id) {       
        var newData = this.state.data.filter(function(obj){return (obj.id != id)})
        for (var i = 0; i < newData.length; i++) {
            if (newData[i].id > id){
                newData[i].id--
            }
        }        
        this.setState({data: newData})
        localStorage["data"] = JSON.stringify(newData)  
    }
    
    handleContextDelete(){
        this.removeItem(this.state.contextID)      
    }
      
    onDrag(evt){
        evt.preventDefault()
        evt.stopPropagation()
    }

    addItem(url){   
        var newData = this.state.data
        var name = url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]
        var fixedURL
        var prefix = 'http://'
        if (!/^https?:\/\//i.test(url.url)){
            fixedURL = prefix + url.url
        }else{
            fixedURL = url.url        
        }
        newData.push({  id: this.state.data.length + 1, 
                        url: fixedURL, 
                        name: name, 
                        description:"Tady bude meta description"
                        })
        this.setState({ initialData : newData, 
                        data: newData
                        })
        localStorage["data"] = JSON.stringify(newData)
    }
    
    cardDragOver(id){
        var newData = this.state.data
        var startCard = ""  
        
        for (var i = 0; i < newData.length; i++) {
            if (newData[i].id == this.state.cardDragStart){
                startCard = newData[i]
            }
        }
       
        if (startCard.id < id){
                for (var i = 0; i < newData.length; i++) {
                    if (newData[i].id > startCard.id && newData[i].id <= id){
                        newData[i].id = newData[i].id - 1
                    }
                }  
        } else if (startCard.id > id){   
                for (var i = 0; i < newData.length; i++) {
                    if (newData[i].id < startCard.id && newData[i].id >= id){
                        newData[i].id++
                    }
                }  
            } 
        startCard.id = id
        newData.sort((a, b) => a.id - b.id)
        this.setState({cardDragStart: id})
        this.setState({initialData: newData , data: newData})
    }
    
    cardDragStart(id){
        this.setState({cardDragStart: id})
    }
    
    dropCard(){
        localStorage["data"] = JSON.stringify(this.state.data)
    }
    
    showAdd(updatedList){
        if (updatedList.length == this.state.initialData.length){
            this.state.filterList = true
        } else {
            this.state.filterList = false
        }
    }
    
    cardRightClick(evt, id){
        this.setState({contextMenu: true, 
                       contextTop: evt.clientY + window.scrollY ,
                       contextLeft: evt.clientX,
                       contextID: id})
    }
    
    filterList(evt){
        var updatedList
        updatedList = this.state.initialData.filter(function(item){
            return item.name.toLowerCase().search(
            evt.value.toLowerCase()) !== -1
            })
        this.setState({data: updatedList})
        this.showAdd(updatedList)
    }
    
    render() {
        var contextMenu
        var contextStyle = {top: this.state.contextTop, 
                            left: this.state.contextLeft}
    
        if (this.state.contextMenu){
            contextMenu = (            
                <ContextMenu    style = {contextStyle}
                                onDelete = {this.handleContextDelete.bind(this)}/>
            )
        }
        return ( 
            <div>
                <SearchBar  onFilter = {this.filterList.bind(this)}/>
                <CardList   data = {this.state.data} 
                            onDelete = {this.removeItem.bind(this)} 
                            showAdd = {this.state.filterList}
                            onAdd = {this.addItem.bind(this)}
                            cardDragOver = {this.cardDragOver.bind(this)}
                            cardDragStart = {this.cardDragStart.bind(this)}
                            cardRightClick = {this.cardRightClick.bind(this)}
                            dropCard = {this.dropCard.bind(this)}
                            />
                {contextMenu}
            </div>
        )
    }
}
