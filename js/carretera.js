
import highway from "./highway.js";
import DateObject from "./DateObject.js";




var TimeProgress;
var EndTime;
var bisiesto1,bisiesto2=false



const hinicio=document.getElementById("hinicio");
const hfinal=document.getElementById("hfinal");

const inputaño1=document.getElementById("año1");
const inputmes1=document.getElementById("mes1");
const inputdia1=document.getElementById("dia1");
const inputhora1=document.getElementById("hora1");
const inputmin1=document.getElementById("hora1");

const inputaño2=document.getElementById("año2");
const inputmes2=document.getElementById("mes2");
const inputdia2=document.getElementById("dia2");
const inputhora2=document.getElementById("hora2");
const inputmin2=document.getElementById("hora2");

const startbutton=document.getElementById("startbutton");

startbutton.addEventListener('click', StartSimulation, true);

inputaño1.addEventListener('change',(event) =>{
    if(event.target.value<2021){
        event.target.value=2021
    }
    bisiesto1=Esbisiesto(event.target.value);
})

inputmes1.addEventListener('change',(event) =>{
    if(event.target.value<1){
        event.target.value=1;
    }else if(event.target.value>12){
        event.target.value=12;
    }

    if(event.target.value==2){
        if(bisiesto1){
            inputdia1.max=29;
        }else{
            inputdia1.max=28
        }
    }else if(event.target.value==1||event.target.value==3||event.target.value==5||event.target.value==7||event.target.value==8||event.target.value==10||event.target.value==12){
        inputdia1.max=31
    }else{
        inputdia1.max=30
    }
})

inputhora1.addEventListener('change',(event) =>{
    if(event.target.value<0){
        event.target.value=0;
    }else if(event.target.value>23){
        event.target.value=23;
    }
})

inputmin1.addEventListener('change',(event) =>{
    if(event.target.value<0){
        event.target.value=0;
    }else if(event.target.value>59){
        event.target.value=59;
    }
})

inputaño2.addEventListener('change',(event) =>{
    if(event.target.value<2021){
        event.target.value=2021
    }
    bisiesto2=Esbisiesto(event.target.value);
})

inputmes2.addEventListener('change',(event) =>{
    if(event.target.value<1){
        event.target.value=1;
    }else if(event.target.value>12){
        event.target.value=12;
    }

    if(event.target.value==2){
        if(bisiesto2){
            inputdia2.max=29;
        }else{
            inputdia2.max=28
        }
    }else if(event.target.value==1||event.target.value==3||event.target.value==5||event.target.value==7||event.target.value==8||event.target.value==10||event.target.value==12){
        inputdia2.max=31
    }else{
        inputdia2.max=30
    }
})

inputhora2.addEventListener('change',(event) =>{
    if(event.target.value<0){
        event.target.value=0;
    }else if(event.target.value>23){
        event.target.value=23;
    }
})

inputmin2.addEventListener('change',(event) =>{
    if(event.target.value<0){
        event.target.value=0;
    }else if(event.target.value>59){
        event.target.value=59;
    }
})



function Esbisiesto(año){
    var result=false;
    if(año%400===0){result=true}
    if(año%100===0)(result=false)
    if(año%4===4){result=true}
    return result;
}

function setTime(){
    TimeProgress= new DateObject(inputaño1.value,inputmes1.value-1,inputdia1.value,inputhora1.value,inputmin1.value);
    EndTime = new Date(inputaño2.value,inputmes2.value-1,inputdia2.value,inputhora2.value,inputmin2.value);  
    hinicio.innerHTML=TimeProgress.dateFormated;
    hfinal.innerHTML=EndTime;
}


function StartSimulation(){
    // se declaran un array con los objetos de cada carretera
     let carreteras=[new highway("Norte a Sur","norsur",true),new highway("Sur a Norte","surnor",true),new highway("extra","default",false)];
    
    // se establecen los tiempos de inicio y de finalizacion
    setTime();

    if(Date.parse(TimeProgress.dateFormated)>Date.parse(EndTime)){
        alert("Error. La fecha inicial no puede ser menor que la final, vuelva a intentarlo");
    }else{
        // Bucle que durara hasta que el tiempo de inicio marque el fin
        while(TimeProgress.dateFormated.toString() !=  EndTime.toString()){
            carreteras.forEach(elem => {

                    // Se establece el limite de autos segun el dia y el tiempo
                    var maxcar;
                    if(TimeProgress.checkdate()){
                        maxcar=125;
                    }else{
                        maxcar=TimeProgress.CheckTime(elem.sentido);
                    }

                    // se declara el tiempo que tardan los autos en recorrer la autopista
                    var timeinside=TimeProgress.timepertravel(elem.sentido);

                    // Se chequea la afluencia de la autopista y se abre la autopista extra si es necesario
                    if(elem.checkinafluence(maxcar*12)){
                        if(!carreteras[2].activa && elem.nombre!="extra" && !elem.Highafluence){
                            alert("Carretera "+elem.nombre+" alta influencia detectada, activando carretera extra. Hora de activacion:"+TimeProgress.dateFormated);
                            elem.Highafluence=true;
                            carreteras[2].sentido=elem.sentido;
                            carreteras[2].activa=true;
                        }
                    }else{
                        if(carreteras[2].activa){
                            carreteras[2].sentido="default";
                            carreteras[2].activa=false;
                            elem.Highafluence=true;
                        }
                    }
                    
                    // Entran nuevos carros a la autopista
                    if(!isNaN(maxcar) && elem.nombre!="extra"){
                        var carsentering= Math.round(Math.random()*(maxcar/3.5))+1;
                        if(carreteras[2].activa && carreteras[2].sentido==elem.sentido){
                            elem.incars(carsentering/2,timeinside);
                            carreteras[2].incars(carsentering/2,timeinside);
                        }else{
                            elem.incars(carsentering,timeinside);
                        }
                    }  
                    // Se mueven los carros actuales en la autopista
                    elem.movecars();
                    // Sortea la posibilidad de que ocurra un accidente
                    elem.OcurrsAccident();

                    // Se rellena las tablas con los datos
                    var table;
                    if(elem.nombre=="Norte a Sur"){
                        table= document.getElementById("NS");
                    }else if(elem.nombre=="Sur a Norte"){
                        table= document.getElementById("SN");
                    }else{
                        table= document.getElementById("Ex");
                    }
                    for (let i = 0,row; row=table.rows[i]; i++) {
                        if(i>=1){
                            for (let j = 0,col; col = row.cells[j]; j++) {
                                if(j>=1){
                                    var road= elem.ways[j-1];
                                    var kilo= road.kilometers[i-1];
                                    col.innerHTML=kilo.getAutos();
                                }
                            }
                        }
                    }              
            });
        
            TimeProgress.updateDate();
            
        }

    }
}


