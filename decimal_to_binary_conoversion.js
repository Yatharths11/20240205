/** 
 * The problem statement is to create a function that
 * converts a number to its array and make's 2's 
 * compliment of it .
*/


/**
 * Function to convert number to binary
 * @param {Number} number
 * @param {Number} numLength
 * @returns {Array}
*/
function numToBinary(number,numLength) {
    let bin = [] //array to store the binary form of the number
    
    while(number>0){

        // pushing the remainer part when divided by 2
        bin.push(number%2)
        
        // changing the original number to integer division by 2
        number = Math.floor(number/2) 
    }

    // If the length of the binary representation is less than the given length
    // pushing exciding 0s to match 
    // the required length of the binary representation
    if(bin.length < numLength){
        for(let i =0;i<=numLength-bin.length;i++){
            bin.push(0);
        }
    }
    
    return bin.reverse()
}

/**
 * @param {Number} number  - the input number
 * @param {Number} numLength  - length of the number in bits.
 * @returns {Array} Array - An array that is the 2's compliment of input numeber
*/
function getSimple2sCompliment(number,numLength){
    if(parseInt(numLength)>52){
        throw new Error("The given bit length exceeds the limit")
        return 0
    }
    let sign = 0;
    let binaryNum = [];
    //Find out if the number is positive or negative
    let dectobin 

    if(number < 0){
        /**
         * if the number is negative add teh sign first into the answer 
         * subtract one form the absolute value of the number and then
         * convert it to binary
         */
        sign = 1
        binaryNum.push(sign)
        dectobin = numToBinary(Math.abs(number)-1,numLength+2)
    }else{
        binaryNum.push(sign)
        dectobin = numToBinary(number,numLength+2)
    }
    //pushing the binary representation of the number to the array to be returned
    for(let i=0;i<dectobin.length;i++){
        binaryNum.push(dectobin[i])
    }
    return binaryNum
    
}

console.log(getSimple2sCompliment(-1,16))



/**
 * Function to convert a binary code to decimal 
 * @param {String} binary - The binary string you want to convert
 * @returns {Number}
*/
function getSimplDecimalFrom2sCompliment(binary){
    let num =0 
    let sign = 1 // variable to keep an account of the sign of the number

    //to check if the nunber is negative 
    if(binary[0]=="1"){
        sign = -1
    }
    let j =0 //varible that will store the power to which 2 will be raised
    //rasiing each number to the weight of their position and adding them to 
    // find the number
    for(let i=binary.length-1;i>0;i--){
        num += (2**j)*parseInt(binary[i])
        j++
    }
    return num*sign
}

function testing(){
    console.log(getSimple2sCompliment(9,"16"))
    console.log(getSimple2sCompliment(83,12))
    console.log(getSimple2sCompliment(-83,8))

    console.log(getSimplDecimalFrom2sCompliment("110100010"))
    console.log(getSimplDecimalFrom2sCompliment("11011010"))
    console.log(getSimplDecimalFrom2sCompliment("01100010"))
}