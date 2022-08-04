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
      let correctJson = true;
      let data;
      let converted = `// SPDX-License-Identifier: none

pragma solidity ^0.8.0;

interface generatedInterface{`;

      try{
        data = JSON.parse(this.inputAbi.value);
      }catch{
        correctJson = false;
      }
      
      if(correctJson){
        for(let a = 0; a < data.length; a++){
          if(data[a].type === 'function'){
            console.log(data[a])
            if(data[a].stateMutability === 'view'){
              converted = converted + `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  converted = converted + data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  converted = converted + data[a].inputs[b].type + " , ";
                }
              }
              const endChar = converted.slice(-3);
              if(endChar === " , " ){
                converted = converted.substring(0, converted.length - 3) + " ) external view returns( ";
              }else{
                converted = converted + " ) external view returns( ";
              }
              for(let c = 0; c < data[a].outputs.length; c++){
                if(data[a].outputs[c].name !== "" ){
                  converted = converted + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                }else{
                  converted = converted + data[a].outputs[c].type + " , ";
                }
              }
              const endChar2 = converted.slice(-3);
              if(endChar2 === " , " ){
                converted = converted.substring(0, converted.length - 3) + " );";
              }else{
                converted = converted + " );";
              }
            }
            if(data[a].stateMutability === 'pure'){
              converted = converted + `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  converted = converted + data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  converted = converted + data[a].inputs[b].type + " , ";
                }
              }
              const endChar = converted.slice(-3);
              if(endChar === " , " ){
                converted = converted.substring(0, converted.length - 3) + " ) external pure returns( ";
              }else{
                converted = converted + " ) external view returns( ";
              }
              for(let c = 0; c < data[a].outputs.length; c++){
                if(data[a].outputs[c].name !== "" ){
                  converted = converted + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                }else{
                  converted = converted + data[a].outputs[c].type + " , ";
                }
              }
              const endChar2 = converted.slice(-3);
              if(endChar2 === " , " ){
                converted = converted.substring(0, converted.length - 3) + " );";
              }else{
                converted = converted + " );";
              }
            }
            if(data[a].stateMutability === 'nonpayable'){
              converted = converted + `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  converted = converted + data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  converted = converted + data[a].inputs[b].type + " , ";
                }
              }
              const endChar = converted.slice(-3);
              if(endChar === " , " ){
                converted = converted.substring(0, converted.length - 3) + " ) external";
              }else{
                converted = converted + " ) external";
              }
              if(data[a].outputs.length > 0){
                converted = converted + " returns( ";
                for(let c = 0; c < data[a].outputs.length; c++){
                  if(data[a].outputs[c].name !== "" ){
                    converted = converted + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                  }else{
                    converted = converted + data[a].outputs[c].type + " , ";
                  }
                }
                const endChar2 = converted.slice(-3);
                if(endChar2 === " , " ){
                  converted = converted.substring(0, converted.length - 3) + " )";
                }else{
                  converted = converted + " )";
                }
              }
              converted = converted + ";";
            }
            if(data[a].stateMutability === 'payable'){
              converted = converted + `
  function ` + data[a].name + "( ";
              for(let b = 0; b < data[a].inputs.length; b++){
                if(data[a].inputs[b].name !== "" ){
                  converted = converted + data[a].inputs[b].type + " " + data[a].inputs[b].name + " , ";
                }else{
                  converted = converted + data[a].inputs[b].type + " , ";
                }
              }
              const endChar = converted.slice(-3);
              if(endChar === " , " ){
                converted = converted.substring(0, converted.length - 3) + " ) external payable";
              }else{
                converted = converted + " ) external payable";
              }
              if(data[a].outputs.length > 0){
                converted = converted + " returns( ";
                for(let c = 0; c < data[a].outputs.length; c++){
                  if(data[a].outputs[c].name !== "" ){
                    converted = converted + data[a].outputs[c].type + " " + data[a].outputs[c].name + " , ";
                  }else{
                    converted = converted + data[a].outputs[c].type + " , ";
                  }
                }
                const endChar2 = converted.slice(-3);
                if(endChar2 === " , " ){
                  converted = converted.substring(0, converted.length - 3) + " )";
                }else{
                  converted = converted + " )";
                }
              }
              converted = converted + ";";
            }
          }
        }

        converted = converted + `
}`;
        converted = converted.replace(/ string /g, " string memory " );
        converted = converted.replace(/ bytes /g, " bytes memory " );
        converted = converted.replace("[]", "[] memory" );

        this.interfaceResult.setValue(converted);
      }
    }else{
      console.log("Please input something" )
    }
  }
}
