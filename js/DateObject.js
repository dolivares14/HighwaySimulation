export default class DateObject{
    constructor(Year,Month,Day,Hour,Minute){
        this.year=Year;
        this.month=Month;
        this.day=Day;
        this.hour=Hour;
        this.minute=Minute;
        this.dateFormated = new Date(this.year,this.month,this.day,this.hour,this.minute);
        this.dayWeek= this.dateFormated.getDay();
    }



    // Chequea si un dia es festivo
    checkdate(){
        
        var IsFestive=false;
        //festivos enero
        if(this.month==0){
            if(this.day==1 || this.day==15){IsFestive=true}
        }

        // festivos febrero
        else if(this.month==1){
            if(this.day==15 || this.day==16){IsFestive=true}
        }

        // festivos marzo(incluye semana santa)
        else if(this.month==2){
            if(this.day >= 21 && this.day <=28){IsFestive=true}
        }

        // festivos abril
        else if(this.month ==3){
            if(this.day== 19){IsFestive=true}
        }

        // festivos mayo
        else if(this.month == 4){
            if(this.day==1){IsFestive=true}
        }

        // festivos junio
        else if(this.month==5){
            if(this.day==24){IsFestive=true}
        }

        // festivos julio
        else if(this.month==6){
            if(this.day==5 || this.day==24){IsFestive=true}
        }

        // festivos octubre
        else if(this.month==9){
            if(this.day==12|| this.day==24){IsFestive=true}
        }

        // festivos noviembre
        else if(this.month==10){
            if(this.day==18){IsFestive=true}
        }

        // festivos diciembre
        else if(this.month == 11){
            if(this.day==24|| this.day==25 || this.day==31){IsFestive=true}
        }

        return IsFestive;
    }


    timepertravel(sentido){
        if(sentido="norsur"){
            if(this.dayWeek>=1 && this.dayWeek<=5){
                return 18;
            }else{
                return 8;
            }
        }else{
            if(this.dayWeek>=1 && this.dayWeek<=5){
                return 6;
            }else{
                return 1;
            }
        }
    }

    // Chequea el trafico dependiendo del tiempo
    CheckTime(sentido){

        // valor de trafico corriente
        var endvalue=50;
        
        // dias de semana
         if(this.dayWeek>=1 && this.dayWeek<=5){

            // hora de 6 a 9
            if(this.hour>=6 && this.hour<=9){
                if(sentido=="norsur"){
                    endvalue=119;
                }else{
                    endvalue= 117;
                }
            }

            // hora de 11.30 a 1.00pm
            else if((this.hour==11 && this.minute>=30)||(this.hour>11 && this.hour<=13)){
                if(sentido=="norsur"){
                    endvalue=105;
                }else{
                    endvalue=98;
                }
            }

            // hora de 5 a 7.30 sentido norte sur
            else if((this.hour>17 && this.hour<19)||(this.hour==19 && this.minute<=30)){
                if(sentido=="norsur"){
                    endvalue=120;
                }
            }

            // hora de 7 a 9.15 sentido sur norte
            else if((this.hour>17 && this.hour<21)||(this.hour==21 && this.minute<=15)){
                if(sentido!="norsur"){
                    endvalue=76;
                }
            }
        }

        // dias fin de semana
        else if(this.dayWeek>=6 && this.dayWeek<=7){

            // hora de 1 a 3 sentido norte sur
            if(this.hour>=13 && this.hour<=15){
                if(sentido=="norsur"){
                    endvalue= 107;
                }
            }


            // hora de 6 a 8 sentido norte sur
            else if(this.hour>=18 && this.hour<=20){
                if(sentido=="norsur"){
                    endvalue=80;
                }
            }

            // hora de 7 a 9.30 sentido sur norte
            else if((this.hour>7 && this.hour<9)||(this.hour==9 && this.minute<=30)){
                if(sentido!="norsur"){
                    endvalue=105;
                }
            }

            // hora de 4.30 a 10 sentido sur norte
            else if((this.hour==16 && this.minute>=30)||(this.hour>16 && this.hour<=22)){
                if(sentido!="norsur"){
                    endvalue=54;
                }
            }

            
        }
        return endvalue;
    }

    Esbisiesto(año){
        var result=false;
        if(año%400===0){result=true}
        if(año%100===0)(result=false)
        if(año%4===4){result=true}
        return result;
    }

    // movimiento del reloj
    updateDate(){

        this.minute++;
        if(this.minute>=60){
            this.minute=0;
            this.hour++;
        }


        if(this.hour>=24){
            this.hour=0;
            this.day++;
        }


        if(this.month==1){
            if(this.day>28 && !this.Esbisiesto(this.year)){
                this.month++;
                this.day=1;
            }else if(this.day>29 && this.Esbisiesto(this.year)){
                this.month++;
                this.day=1
            }
        }
        else if(this.month==3 || this.month==5 || this.month==8 || this.month==10){
            if(this.day>30){
                this.month++;
                this.day=1;
            }
        }
        else if(this.month==0 ||this.month==2 || this.month==4 || this.month==6||this.month==7||this.month==9||this.month==11){
            if(this.day>31){
                if(this.month==12){
                    this.year++;
                    this.month=0;
                    this.day=1;
                }else{
                    this.month++;
                    this.day=1;
                }
            }
        }


        this.dateFormated = new Date(this.year,this.month,this.day,this.hour,this.minute);
        this.dayWeek=this.dateFormated.getDay();
    }
}