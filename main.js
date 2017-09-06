
 onload=function () {
     
        //Json data
         var data={ Small:[200,300,150,"$5.00"],
                    Medium:[300,400,200,"$7.50"],
                    Large:[400,600,250,"$8.50"]
                  }
         var box=["Small","Medium","Large","OverSize"]
         var maxweight=25;
         var overweight=false;
         var boxvalue=box[box.length-1];
         var len=3,bre=3,hei=3;
     
         // Weight control method
         control.weight.onblur=function () {
              if(isNaN(parseInt(this.value))||parseInt(this.value)<=0){
                    overweight="error";
                    this.style.borderColor="red";
                } 
             else{
                  this.style.borderColor="";
                  if (parseInt(this.value)>maxweight)
                      overweight=true;
                    else
                      overweight=false;
              }
            calc();
         }
         
         //length control method
         control.lengthx.onblur=function () {
            len=getIndex(this.value,0);
            if (len=="error") this.style.borderColor="red"
             else{
                 this.style.borderColor="";
                 calc();
             }
         }
         
         control.breadth.onblur=function () {
             bre=getIndex(this.value,1);
             if (bre=="error") 
                 this.style.borderColor="red"
             else{  
                 this.style.borderColor="";
                 calc();
             }
          }
          
         //Height control method
          control.height.onblur=function () {
                hei= getIndex(this.value,2);
                if (hei=="error") 
                    this.style.borderColor="red"
                else{ 
                    this.style.borderColor="";
                calc();}
         }
        
        
          // when submit the button,according to the input data, reorder the number of the length and breadth and height.
         control.submit.onclick=function () {
             var ar=[control.lengthx.value,control.breadth.value,control.height.value]
             ar.sort(function (x,y) {
                    return x-y;
                });
             control.height.value=ar[0];
             control.lengthx.value=ar[1];
             control.breadth.value=ar[2];
             control.weight.onblur();
             control.height.onblur();
             control.lengthx.onblur();
             control.breadth.onblur();
         }
         
         //Calculate the deliver fee according to the input numbers
        function calc() {
             if (len!="error"&&bre!="error"&&hei!="error"){
                if (overweight==true)
                    resultValue("overweight","","red");
                else if (overweight=="error")
                     resultValue("Not a valid number","","red");
                    else {
                        boxvalue=Math.max( Math.max(len,bre),hei);
                        resultValue(box[boxvalue],boxvalue==3?"":data[box[boxvalue]][3],boxvalue==3?"red":"");
                    }

             } else
                resultValue("","","");
        }
        
      
        //validation style
        function resultValue(str,value,color) {
            control.box.value=str;
            control.box.style.borderColor=color;
            control.cost.value=value;
        }
        
        //Compared with the 3 types of the boxes,decide which size box should be suitable for the parcel.
         function getIndex(v,i) {
             if (isNaN(v)||parseInt(v)<=0) return "error";
             else  if (parseInt(v)<=data["Small"][i]) return 0;
             else if (parseInt(v)<=data["Medium"][i]) return 1;
             else if (parseInt(v)<=data["Large"][i]) return 2;
             else return 3;
         }
     
         var length=control.lengthx.value;
        }