import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputAbi: FormControl = new FormControl('', [Validators.required]);
  interfaceResult: FormControl = new FormControl('');

  convert(){
    if(this.inputAbi.valid){
      const interfaceArray = {
        name: null,
        type: null,
        datatype: null
      };

      let correctJson = true;
      let data;
      let interfaces: any[] = [];
      let converted = `// SPDX-License-Identifier: none

pragma solidity ^0.8.0;
`;

      try{
        data = JSON.parse(this.inputAbi.value);
      }catch{
        correctJson = false;
      }
      
      if(correctJson){
        let generatedInterface = `
interface generatedInterface{`
        for(let a = 0; a < data.length; a++){
          console.log(data[a])
          if(data[a].type === 'function'){
            if(data[a].stateMutability === 'view'){
              generatedInterface = generatedInterface +  `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " , ";
                }
              }
              const endChar = generatedInterface.slice(-3);
              if(endChar === " , " ){
                generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " ) external view returns( ";
              }else{
                generatedInterface = generatedInterface +  " ) external view returns( ";
              }
              for(let c = 0; c < data[a].outputs.length; c++){
                if(data[a].outputs[c].name !== "" ){
                  generatedInterface = generatedInterface + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                }else{
                  generatedInterface = generatedInterface + data[a].outputs[c].type + " , ";
                }
              }
              const endChar2 = generatedInterface.slice(-3);
              if(endChar2 === " , " ){
                generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " );";
              }else{
                generatedInterface = generatedInterface +  " );";
              }
            }
            if(data[a].stateMutability === 'pure'){
              generatedInterface = generatedInterface +  `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " , ";
                }
              }
              const endChar = generatedInterface.slice(-3);
              if(endChar === " , " ){
                generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " ) external pure returns( ";
              }else{
                generatedInterface = generatedInterface +  " ) external pure returns( ";
              }
              for(let c = 0; c < data[a].outputs.length; c++){
                if(data[a].outputs[c].name !== "" ){
                  generatedInterface = generatedInterface + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                }else{
                  generatedInterface = generatedInterface + data[a].outputs[c].type + " , ";
                }
              }
              const endChar2 = generatedInterface.slice(-3);
              if(endChar2 === " , " ){
                generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " );";
              }else{
                generatedInterface = generatedInterface +  " );";
              }
            }
            if(data[a].stateMutability === 'nonpayable'){
              generatedInterface = generatedInterface +  `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " , ";
                }
              }
              const endChar = generatedInterface.slice(-3);
              if(endChar === " , " ){
                generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " ) external";
              }else{
                generatedInterface = generatedInterface +  " ) external";
              }
              if(data[a].outputs.length > 0){
                generatedInterface = generatedInterface +  " returns( ";
                for(let c = 0; c < data[a].outputs.length; c++){
                  if(data[a].outputs[c].name !== "" ){
                    generatedInterface = generatedInterface + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                  }else{
                    generatedInterface = generatedInterface + data[a].outputs[c].type + " , ";
                  }
                }
                const endChar2 = generatedInterface.slice(-3);
                if(endChar2 === " , " ){
                  generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " )";
                }else{
                  generatedInterface = generatedInterface +  " )";
                }
              }
              generatedInterface = generatedInterface +  ";";
            }
            if(data[a].stateMutability === 'payable'){
              generatedInterface = generatedInterface +  `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  if(data[a].inputs[b].type === "tuple"){
                    // let datas = interfaceArray;
                    let names = (data[a].inputs[b].internalType + '').toString();
                    console.log(names)
                    const splitter = names.split(' ');
                    console.log(splitter)
                    const splitter2 = splitter[1].split(".");
                    console.log(splitter2)

                    let pushdata = {
                      interface: splitter2[0],
                      name: splitter2[1],
                      type: splitter[0],
                      datatype: data[a].inputs[b].components
                    }

                    interfaces.push(pushdata);
                  }
                  generatedInterface = generatedInterface+ data[a].inputs[b].type + " , ";
                }
              }
              const endChar = generatedInterface.slice(-3);
              if(endChar === " , " ){
                generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " ) external payable";
              }else{
                generatedInterface = generatedInterface +  " ) external payable";
              }
              if(data[a].outputs.length > 0){
                generatedInterface = generatedInterface +  " returns( ";
                for(let c = 0; c < data[a].outputs.length; c++){
                  if(data[a].outputs[c].name !== "" ){
                    generatedInterface = generatedInterface + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                  }else{
                    generatedInterface = generatedInterface + data[a].outputs[c].type + " , ";
                  }
                }
                const endChar2 = generatedInterface.slice(-3);
                if(endChar2 === " , " ){
                  generatedInterface = generatedInterface.substring(0, generatedInterface.length - 3) + " )";
                }else{
                  generatedInterface = generatedInterface +  " )";
                }
              }
              generatedInterface = generatedInterface +  ";";
            }
          }
        }

        converted = converted +  generatedInterface;
        converted = converted +  `
}`;
        converted = converted.replace(/ string /g, " string memory " );
        converted = converted.replace(/ bytes /g, " bytes memory " );
        converted = converted.replace("[]", "[] memory" );
        converted = converted.replace(/\( /g, "(" );
        converted = converted.replace(/ \)/g, ")" );
        converted = converted.replace(/ , /g, "," );

        this.interfaceResult.setValue(converted);
        console.log(interfaces);
      }
    }else{
      console.log("Please input something" )
    }
  }
}
