class InfiniteNumberArithmatic {

    /** An internal member Array to contain the digits of the Infinite Integer.
     * @private
     * @type {Array<Number>}
     */
    _internalArray = []
  
    constructor(inputObject) {
    
      if (typeof (inputObject) === "number") {
  
        // check if Number is not a NaN
        if (isNaN(inputObject)) {
          throw new Error("Input is NaN.")
        }
  
        // check for negative values
        if (inputObject < 0) {
          throw new Error("Input cannot be negative")
        }
  
        // check for integral values only
        if ((inputObject % 1) != 0) {
          throw new Error("Input needs to be an integral value.")
        }
  
        while (inputObject != 0) {
          this._internalArray.unshift(inputObject % 10)
          inputObject = Math.floor(inputObject / 10)
        }
      } else if (typeof (inputObject) === "string") {
  
        // check if length is not zero
        if (inputObject.length == 0) {
          throw new Error("Empty string is not accepted.")
        }
        
        // check if every character is a decimal digit
        let myRegex = /^[0-9]+$/
        if (!myRegex.test(inputObject)) {
          throw new Error("String can have decimal numbers only.")
        }
        
        for (let index = 0; index < inputObject.length; index++) {
          const currentDigit = parseInt(inputObject.charAt(index))
          this._internalArray.push(currentDigit)
        }
  
      }
  
       else if (Array.isArray(inputObject)) {  // IS THIS HOW ITS DONE?
        
  
        // TODO validate the individual elements of the inputArray and initialize
        for(let i=0 ;i<inputObject.length-1;i++){
          if( !Number.isInteger(inputObject[i]) ){
            throw new Error('All array members must be integers')
          }
        }

        // the _internalArray
  
  
        // initialize the member array
        this._internalArray = inputObject
  
      } else if (typeof inputObject === "object") {  
        console.log("You sent an Object")
  
        // TODO check if this object has getInternalArray() and make a deep copy
        if(typeof(inputObject.getInternalArray())==InfiniteNumberArithmatic){
        // and assign it to local _internalArray
          this._internalArray=inputObject.getInternalArray();
        // initialize the member array
        }else{
          throw new Error('The object must be from class InfiniteNumberArithmetic');
        }
  
      } else {        
        console.log("Invalid data!")
  
        throw new Error(`Constuctor of IniniteNumber does not support this data`
          + ` type ${typeof inputObject}`)
      }
  
    }
  
    /** Helper method to return the _internalArray variable which contains the
     * Inifnite precision Integer.
     * @returns {Array<Number>} the internal array representing individual digits
     */
    getInternalArray() {
      // TODO, 
  
      var temp = new Array()
      temp = this._internalArray
      return temp
    }
  
    /** Helper method to return the representation of this Infinite Precision
     * 
     */
    getNumberAsString() {
      return this._internalArray.join('')
    }
  
    getaddition(obj){
  
      let result = [];
      let carry = 0;
      let i = 0;
      let firstNumber = this._internalArray;
      let secondNumber = obj.getInternalArray();  // Use getInternalArray without parameters
      firstNumber = firstNumber.reverse();
      secondNumber = secondNumber.reverse();
      /**
       * the below loop will run for the number of times until length of both
       * the array have digits to add
       */
      for( i;i<=firstNumber.length-1 && i <=secondNumber.length-1;i++){
          
          //when the carry is generated
          if(firstNumber[i]+secondNumber[i]+carry>9){
              //to push the units digit in the result
              result.push((firstNumber[i]+secondNumber[i]+carry)%10)
              //to add the carry in the next addition
              carry = Math.floor((firstNumber[i]+secondNumber[i]+carry)/10)
          }else{
              //when the carry is not generated directly add the sum in the result
              result.push(firstNumber[i]+secondNumber[i]+carry) 
              carry = 0
          }
          // console.log(result)
      }
      /**
       * if firstnumber is longer in length 
       */
      if(firstNumber.length-i){
          for(i;i<=firstNumber.length-1;i++){
              if(firstNumber[i]+carry>9){
                  //to push the units digit in the result
                  result.push((firstNumber[i]+carry)%10)
                  //to add the carry in the next addition
                  carry = Math.floor((firstNumber[i]+carry)/10)
              }else{
                  //when the carry is not generated directly add the sum in the result
                  result.push(firstNumber[i]+carry) 
                  carry = 0
              }
          }
      }
      /**
       * if second numeber is larger in length
       */
      if(secondNumber.length-i){
          for(i;i<=secondNumber.length-1;i++){
              if(secondNumber[i]+carry>9){
                  //to push the units digit in the result
                  result.push((secondNumber[i]+carry)%10)
                  //to add the carry in the next addition
                  carry = Math.floor((secondNumber[i]+carry)/10)
              }else{
                  //when the carry is not generated directly add the sum in the result
                  result.push(secondNumber[i]+carry) 
                  carry = 0
              }
          }
      }
      if(carry!=0) {
          result.push(carry)
      }
      return result.reverse()
  }
  
    getsubtraction(obj){
      let ans = [];
    let biggerNumber;
    let smallerNumber;
    let first = this._internalArray;
    let second = obj.getInternalArray();
      // checking which numeber bigger 
      if(first.length > second.length){
          biggerNumber = first
          smallerNumber = second
  
      }else if(first.length == second.length){
  
          //Comparing each digit to find the bigger number 
          for(let i=0;i<first.length;i++){
  
              //if any one digit of first number becomes larger than the 
              //digit at same place in second numeber, the first number becomes 
              //the bigger number
              if(first[i]>second[i]){
                  biggerNumber = first
                  smallerNumber = second
                  break
              }
              if(second[i]>first[i]){
                  biggerNumber = second
                  smallerNumber = first
                  break
              }
          }
      }else {
          //condition where the second number is larger than the first number
          biggerNumber = second
          smallerNumber = first
      }
  
  
      //revrse the smaller number add trailing to add zeros at the end
      smallerNumber = smallerNumber.reverse()
      
      //add trailing zeros until it's length equal to the bigger number
      while(smallerNumber.length<biggerNumber.length){
          smallerNumber.push(0)
      }
      
      //return the smaller number to its original number
      smallerNumber=smallerNumber.reverse()
  
      //subtracting each digit of smaller number from bigger number 
      for(let i=biggerNumber.length-1;i>=0;i--){
          
          //check if borrow if needed or not
          if(biggerNumber[i]-smallerNumber[i]>=0){
              //if not needed simply push the difference of digits
              ans.push(biggerNumber[i]-smallerNumber[i])
          }else{
  
              //if borrow is needed
              //add 10 to current digit
              biggerNumber[i] = biggerNumber[i]+10
              
              // subtract 1 from previous number
              biggerNumber[i-1] = biggerNumber[i-1] - 1
              
              //perform the subtraction of digits
              ans.push(biggerNumber[i]-smallerNumber[i])
              
          }
      }
      return ans.reverse()
    }

    /**subFuntion to multiply one number with entire array
   * @private 
   * @param {Number} num to be multiplied
   * @param {Array<Number>} numArray to be multiplied
   * @return {Array} Array after multiplication
   */
  multiplyWithNumber(numArray, num, initialZero) {
    let ans = [];
    let carry = 0;
  
    //to append initial zero for final calculation
    for (let zeroCount = 0; zeroCount < initialZero; zeroCount++) {
      ans.unshift(0);
    }
    for (let numIndex = numArray.length - 1; numIndex >= 0; numIndex--) {
      let temp = (numArray[numIndex] * num) + carry;
      ans.unshift(temp%10);
      carry = Math.floor(temp/10);
    }
    if(carry!==0) ans.unshift(carry)
    return ans;
  }
  
  /**Function to return the multiplication of two Arrays
   * @param {Array<Number>} numToMultiply input array should be number
   * @throws {Error} if numToMultiply is not valid object
   * @return {Array} result array of Multiplication
   */
  getmultiplication(numToMultiply) {
    console.log(numToMultiply instanceof InfiniteNumberArithmatic)

    //check if the input is valid
    if(!(numToMultiply instanceof InfiniteNumberArithmatic)){
      throw new Error("given input is not an object")
    }

    let num1=this._internalArray
    let num2=numToMultiply._internalArray;

    //initialize the ans as object
    let ans = new InfiniteNumberArithmatic(0);
  
    //multiply entire num1 array with elemetents of num2 array one by one 
    // then add it to the ans 
    let num2Index = (num2.length - 1)
    for (; num2Index >= 0; num2Index--) {
      // initial zeros to be added
      let initialZero = (num2.length - 1) - num2Index;

      // multiply num1 with single digit of num2 and store into sample
      let sample= this.multiplyWithNumber(num1,num2[num2Index],initialZero);

      //convert sample into infiniteNumber object
      sample= new InfiniteNumberArithmatic(sample.join(""))

      // add the ans object with sample object and convert ans again into object
      ans=ans.getaddition(sample)
      ans = new InfiniteNumberArithmatic(ans.join(""));
    }
    return ans;
  }
    divide(obj){
      //some features are yet to be added
      let biggerNumber;
      let smallerNumber;
      let first = this._internalArray;
      let second = obj.getInternalArray();
        // checking which numeber bigger 
        if(first.length > second.length){
            biggerNumber = first
            smallerNumber = second
    
        }else if(first.length == second.length){
    
            //Comparing each digit to find the bigger number 
            for(let i=0;i<first.length;i++){
    
                //if any one digit of first number becomes larger than the 
                //digit at same place in second numeber, the first number becomes 
                //the bigger number
                if(first[i]>second[i]){
                    biggerNumber = first
                    smallerNumber = second
                    break
                }
                if(second[i]>first[i]){
                    biggerNumber = second
                    smallerNumber = first
                    break
                }
            }
        }else {
            //condition where the second number is larger than the first number
            biggerNumber = second
            smallerNumber = first
        }
    }
}


function testing(){
  
  let obj1 = new InfiniteNumberArithmatic(68568526)
  let obj2 = new InfiniteNumberArithmatic(94646466)

  let obj3 = new InfiniteNumberArithmatic(obj1.getaddition(obj2))
  console.log("Addition : ",obj3.getNumberAsString())
  let obj4 = new InfiniteNumberArithmatic(obj2.getsubtraction(obj1))
  console.log("Subtraction : ",obj4.getNumberAsString())
  // let obj5 = new InfiniteNumberArithmatic(obj1.getmultiplication(obj2))
    
}

testing()