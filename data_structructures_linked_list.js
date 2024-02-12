
/**
 * Node class to build the node of the linked list
*/
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
// let head = new Node(0);
// let temp = new Node();
// temp = head;

// for(let i=1;i<10;i++){
//     let newNode = new Node(i);
//     temp.next = newNode;
//     temp = newNode;
// }



// Function to add the element at the start
function addElementAtStart(head,element){
    let newHead = new Node(element);
    newHead.next = head;
    head = newHead
    return newHead;
}

// Function to add the node at the end
function append(head,element){
    let newNode = new Node(element);
    let temp = head;
    if (head == null){
        head = newNode;
        return head;
    }
    while(temp.next !==null){
        temp = temp.next;
    }
    temp.next = newNode;
    newNode.next = null;
    return head;
}


// Function to pop the last element
function popElement(head){
    if (head == null){
        console.log("Empty linked list received");
        return 0;
    }
    let temp = head;
    while(temp.next !== null){
        temp = temp.next;
    }

    let element = temp.data;
    temp.next = null;
    return element;
}


// function to remove nth element
function removeNthelement(head,n){

    let temp = head;
    for(let i=0;i<n-1;i++){
        temp = temp.next;
    }
    nextNode = temp.next;
    temp.next = nextNode.next;
}


//Driver Code
let head = new Node(0);
for(let i=10;i>=0;i--){
    head = addElementAtStart(head,i);
}
traverse(head)
removeNthelement(head,5);
traverse(head);
console.log(popElement(head));

class LinkedList{
    constructor(data){
        this.head = new Node(data);
    }

    // Function to traverse the linked list
    traverse(head){
    let temp = head;
    for(let i=0;i<10;i++){
        console.log(temp.data);  
        temp = temp.next;       
    }
}


}
