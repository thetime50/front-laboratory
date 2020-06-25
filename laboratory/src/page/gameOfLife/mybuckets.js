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
        this.list.append(item)
    }
    removeElementAtIndex(index){
        this.list.splice(index,1)
    }
}

function LinkedList(){
    return new LinkedListClass()
}


export default {
    LinkedList,
}