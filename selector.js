function markBordersInColor(elements, color){
    elements.forEach(element => {
        element.style.borderColor = color;
    });
}

function markSectionBorders(element, color){
    element.style.border = '3px solid red';
}

function clearMarkings(){
    var elements = document.querySelectorAll('div.eq_Title');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    var elements = document.querySelectorAll('div.eq_Equation');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    var elements = document.querySelectorAll('div.eq_Image');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    var element = document.getElementById('2dGrid');
    element.style.border = 'none';
    var element = document.getElementById('3dGrid');
    element.style.border = 'none';
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

function markWuerfel(){
    var elements = document.querySelectorAll('div.wuerfel');
    markBordersInColor(elements, "red");
}

function markQuader(){
    var elements = document.querySelectorAll('div.quader');
    markBordersInColor(elements, "red");
}

function markPyramide(){
    var elements = document.querySelectorAll('div.pyramide');
    markBordersInColor(elements, "red");
}

function markKugel(){
    var elements = document.querySelectorAll('div.kugel');
    markBordersInColor(elements, "red");
}

function mark2D(){
    var element = document.getElementById('2dGrid');
    markSectionBorders(element)
}

function mark3D(){
    var element = document.getElementById('3dGrid');
    markSectionBorders(element);
}