const dolares = document.querySelector('.dolares');//para obtener el input del billete
const persona = document.querySelector('.person');//para obtener el input de las personas
const botones = document.querySelectorAll('.caja');//para obtener los botones
const botonPers = document.querySelector('.cajita');//para obtener el input custom
const reset = document.querySelector('.reset');//para obtener el boton reset
let error = document.getElementById('error');//para obtener el span de error
let totalAmount = document.querySelector('.totalAmount');//donde se va a mostrar lo que cada persona tiene que dejar de propina
let totalPersona = document.querySelector('.totalAmountPersona');//lo que tiene que dejar cada persona de propina
let bill = 0.00;//valor por defecto de bill
let personas = 0 ;//valor por defecto de personas
let porcentaje = 0.00;//valor por defecto del porcentaje

const totalBotones = function()//funcion para que cambie de color cuando se haga click y en los otros se desactive el color
{
    botones.forEach(boton => 
        {
            boton.addEventListener('click',function()
            {
                botones.forEach(boton => 
                    {
                    if(boton.classList.contains('activo'))
                     {boton.className='caja';}
                    });
                boton.classList.add('activo');
            });
        });
}

const botonPersonalizado = function()//cuando se pulse el boton de custom los demás cambien de color
{
    botonPers.addEventListener('click', function()
    {
        botones.forEach(boton => 
            {
            if(boton.classList.contains('activo'))
             {boton.className='caja';}
            });
    });


}


//para obtener el valor del input si va cambiando si es menor que cero mostrará el error y cambia de color el borde sino, lo vuelve a dejar como estaba
persona.addEventListener('input', (event) => 
{
    if(event.target.value<=0)
    { 
        error.textContent="can't be zero";
        persona.style.outlineColor="rgb(241, 78, 78)";
    }else
    {
        error.textContent='';
        persona.style.outlineColor="hsl(172, 67%, 45%)";
        personas = event.target.value;  
        calcular();//llevamos el valor de personas en calcular por lo que se sigue manteniendo este valor
    }

});
//igual que el anterior
dolares.addEventListener('input', (event) => 
{        
    bill = parseFloat(event.target.value).toFixed(2);
    calcular();
});
//igual que el anterior
botonPers.addEventListener('input',(event) => 
{
    porcentaje=parseFloat(event.target.value/100).toFixed(2);
    calcular();
});
//obtenemos el valor que ha hecho clic y lo dividimos entre 100 y ya luego lo llevamos a la función calcular por lo que solo habrá que multiplicar
botones.forEach(boton => 
    {
        boton.addEventListener('click',function()
        {
            porcentaje = parseFloat(boton.value/100).toFixed(2);
            calcular();
        });
    });
//pulse el botón de reset se volvera todo como estaba por defecto
reset.addEventListener('click',function()
{
    bill = 0.00;
    personas = 0 ;
    porcentaje = 0.00;
    dolares.value=bill;
    persona.value=personas;
    totalAmount.lastChild.textContent='0.00';
    totalPersona.lastChild.textContent='0.00';
    botones.forEach(boton => 
        {
        if(boton.classList.contains('activo'))
         {boton.className='caja';}
        });

});
//se hacen los respectivos calculos y que se muestre el resultado
function calcular()
{
    if(personas >=1)
    {
        let tip = bill*porcentaje;
        let total = (bill*porcentaje)/personas;

        totalAmount.lastChild.textContent=parseFloat(total).toFixed(2);
        totalPersona.lastChild.textContent=parseFloat(tip).toFixed(2);
    }

}

totalBotones();
botonPersonalizado();