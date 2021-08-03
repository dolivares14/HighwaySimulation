import road from './road.js';
export default class highway{
    constructor(nombre,sentido,activa){
        this.nombre=nombre;
        this.sentido=sentido;
        this.ways=[new road(false), new road(false), new road(false),new road(true)];
        this.activa=activa;
        this.accidentTimeperYear=0;
        this.accidenttype=["Mantenimiento Áreas Verdes","Mantenimiento Sistemas Eléctricos","Reparaciones menores en vía","Colisiones Varias","Cierres Preventivos","Manifestaciones Generales Colectivas", "Manifestaciones Generales particulares"];
        this.maxtimeperaccident;
        this.Highafluence=false;
    }
    SetMaxTimeperAccident(){
      if(this.sentido=="norsur"){
        this.maxtimeperaccident=350;
      }else{
        this.maxtimeperaccident=197;
      }
    }
    checkinafluence(maxcars){
      var nombre = this.nombre;
      var cont=0;
         var signal=false;
        this.ways.forEach((road,indexroad)=>{
           cont+=road.checkcarsinkilometers();  
        });
        if(cont>maxcars){
          signal=true;
          
         }
        return signal;
    }
    
    OcurrsAccident(){
      if(this.activa){
        this.SetMaxTimeperAccident();
        if(this.accidentTimeperYear<this.maxtimeperaccident){
          var rand= Math.round(Math.random()*15000);
          if (rand==1){
            var rand2=Math.round(Math.random() *3);
            this.ways[rand2].newAccident();
            this.roadclosed(rand2);
            this.accidentTimeperYear+=this.ways[rand2].addedtimeaccident;
            alert("Obstruccion ocurrida en la via n°"+  (rand2+1) +" en la autopista "+this.nombre+ "motivo de la obstruccion: "+this.accidenttype[Math.round(Math.random()*7)]);
          }
        }
      }
    }

    roadclosed(numberroad){
      this.ways[numberroad].open=false;
      if(!this.ways[numberroad].IsEmergency){
        this.ways[3].open=true;
      }
      this.ways[numberroad].carsdata.forEach((car,index)=>{
        var newroad;
        var stop=true;
        while(stop){
          newroad=Math.round(Math.random()*3);
          if(newroad!=numberroad){
            stop=false;
          }
        }
        this.ways[newroad].kilometers[car.actkilo].InAutos(1);
        this.ways[numberroad].kilometers[car.actkilo].OutAutos(1);
        this.ways[newroad].carsdata.push(car);
        this.ways[numberroad].carsdata.splice(index,1);
        
      })
    }

    movecars(){
      this.ways.forEach((road)=>{
        if(road.open){
          road.carsadvance();
        }
      })
    }
    getroadsopen(){
      var cont=0;
      this.ways.forEach((road)=>{
        if(road.open){
          cont++;
        }
      })
      return cont;
    }
    incars(carsentering,timelimit){
      var roadsopen= this.getroadsopen();
      
      if(this.ways[0].open && this.ways[1].open && this.ways[2].open &&this.ways[3].open){
        this.ways[3].open=false;
      }
      var newcars= Math.round(((carsentering))/roadsopen);
        this.ways.forEach((road)=>{
          road.IsObstructed();
          if(road.open){            
                road.Carsenter(newcars,timelimit/12);
          }
        })
    }
}