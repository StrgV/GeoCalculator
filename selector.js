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
    elements = document.querySelectorAll('div.eq_Equation');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    elements = document.querySelectorAll('div.eq_Image');
    markBordersInColor(elements, "hsl(280, 76%, 65%)");
    elements = document.getElementById('2dGrid');
    elements.style.border = 'none';
    elements = document.getElementById('3dGrid');
    elements.style.border = 'none';
}

function markRechteck(){
    let elements = document.querySelectorAll('div.rechteck');
    markBordersInColor(elements, "red");
}

function markQuadrat(){
    let elements = document.querySelectorAll('div.quadrat');
    markBordersInColor(elements, "red");
}

function markDreieck(){
    let elements = document.querySelectorAll('div.dreieck');
    markBordersInColor(elements, "red");
}

function markViereck(){
    let elements = document.querySelectorAll('div.viereck');
    markBordersInColor(elements, "red");
}

function markWuerfel(){
    let elements = document.querySelectorAll('div.wuerfel');
    markBordersInColor(elements, "red");
}

function markQuader(){
    let elements = document.querySelectorAll('div.quader');
    markBordersInColor(elements, "red");
}

function markPyramide(){
    let elements = document.querySelectorAll('div.pyramide');
    markBordersInColor(elements, "red");
}

function markKugel(){
    let elements = document.querySelectorAll('div.kugel');
    markBordersInColor(elements, "red");
}

function mark2D(){
    let element = document.getElementById('2dGrid');
    markSectionBorders(element)
}

function mark3D(){
    let element = document.getElementById('3dGrid');
    markSectionBorders(element);
}