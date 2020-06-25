class LinkedListClass{
    constructor(){
        this.list=[]
    }
    size(){
        return this.list.length
    }
    last(){
        return this.list[this.size()-1]
    }
    add(item){
        this.list.push(item)
    }
    removeElementAtIndex(index){
        this.list.splice(index,1)
    }
    toArray(){
        return this.list
    }
    elementAtIndex(index){
        return this.list[index]
    }
}

function LinkedList(){
    return new LinkedListClass()
}


export default {
    LinkedList,
}