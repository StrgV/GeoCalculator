function markBordersInColor(elements, color){
    elements.forEach(element => {
        element.style.borderColor = color;
    });
}

function clearMarkings(){
    var elements = document.querySelectorAll('div.eq_Title');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    var elements = document.querySelectorAll('div.eq_Equation');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    var elements = document.querySelectorAll('div.eq_Image');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
}

function markRechteck(){
    var elements = document.querySelectorAll('div.rechteck');
    markBordersInColor(elements, "red");
}

function markQuadrat(){
    var elements = document.querySelectorAll('div.quadrat');
    markBordersInColor(elements, "red");
}

function markDreieck(){
    var elements = document.querySelectorAll('div.dreieck');
    markBordersInColor(elements, "red");
}

function markViereck(){
    var elements = document.querySelectorAll('div.viereck');
    markBordersInColor(elements, "red");
}

