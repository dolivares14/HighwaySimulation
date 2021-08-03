import kilometer from "./kilometer.js";
export default class road{
    constructor(Emergency){
        this.kilometers=[new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer(),new kilometer()];
        this.carsin=0;
        this.carsdata=[];
        this.IsEmergency=Emergency;
        this.open=!Emergency;
        this.addedtimeaccident;
    }
    checkcarsinkilometers(){
        var cont=0;
        this.kilometers.forEach(element => {
            cont+=element.getAutos();
        });
        return cont;
    }
    IsObstructed(){
        var indicator=false;
        this.kilometers.forEach((current,index,array)=>{
            if(current.getAccident()){
                indicator=true;
                if(current.accidenttime>= current.timetopaccident){
                    current.accident=false;
                    current.accidenttime=0;
                }else{current.accidenttime++;}
            }
        })
        if(!indicator){
            this.open=true;
        }
    }
    newAccident(){
        var rand=Math.round(Math.random()*11);
        this.kilometers[rand].newAccident();
        var rand2=Math.round(Math.random()*21)+5
        this.addedtimeaccident=rand2;
        this.kilometers[rand].timetopaccident=rand2;
    }
    Carsenter(numcars,timeperkilo){
        this.carsin+=numcars;
        this.kilometers[0].InAutos(numcars+1);
        for (let i = 0; i<= numcars; i++){
            this.carsdata.push({cont:0,actkilo:0,timeperkilo:timeperkilo});
        }
    }

    carsadvance(){
        this.carsdata.forEach((car,index)=>{
            car.cont++;
            if(car.cont>=car.timeperkilo){
                this.CarsMove(index);
                car.cont=0;
            }
        });
    }

    CarsMove(carnumber){
        var actkilometer=this.carsdata[carnumber].actkilo;
        if(actkilometer==11){
            this.carsin--;
            this.carsdata.splice(carnumber,1);
            this.kilometers[actkilometer].OutAutos(1);
        }else{
            this.kilometers[actkilometer].OutAutos(1);
            this.kilometers[actkilometer+1].InAutos(1);
            this.carsdata[carnumber].actkilo++;
        }
    }
}
