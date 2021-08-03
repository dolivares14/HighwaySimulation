export default class kilometer{
    constructor(){
        this.cantAutos=0;
        this.accident=false;
        this.accidenttime=0;
        this.timetopaccident;
    }
    InAutos(Numautos){
        this.cantAutos+=Numautos;
    }
    OutAutos(Numautos){
        this.cantAutos-=Numautos;
    }
    newAccident(){
        this.accident=true;
    }
    getAccident(){
        return this.accident;
    }
    getAutos(){
        return this.cantAutos;
    }
}