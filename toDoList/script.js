const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");

function addTask(){
    if(inputBox.value ===''){
        alert("You must write something");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
        
        // Animación del botón hacia la izquierda
        animateButton();
    }
    inputBox.value='';
    saveData();
}

function animateButton(){
    const button = document.querySelector('button');
    
    // Agregar estilos de transición
    button.style.transition = 'transform 0.3s ease';
    
    // Deslizar hacia la izquierda
    button.style.transform = 'translateX(-200px)';
    
    // Regresar a la posición original después de 300ms
    setTimeout(() => {
        button.style.transform = 'translateX(0)';
    }, 500);
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        
    }
},false);

// Agregar funcionalidad de edición con doble clic
listContainer.addEventListener("dblclick", function(e){
    if(e.target.tagName === "LI"){
        editTask(e.target);
    }
});

function editTask(li){
    const span = li.querySelector('span');
    const originalText = li.textContent.replace('×', '').trim();
    
    // Crear input para editar
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.background = 'transparent';
    input.style.fontSize = '17px';
    input.style.width = '100%';
    
    // Reemplazar contenido temporalmente
    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(span);
    
    // Enfocar y seleccionar texto
    input.focus();
    input.select();
    
    // Guardar cambios al presionar Enter o perder foco
    function saveEdit(){
        if(input.value.trim() !== ''){
            li.innerHTML = input.value.trim();
            li.appendChild(span);
            saveData();
        } else {
            // Si está vacío, restaurar texto original
            li.innerHTML = originalText;
            li.appendChild(span);
        }
    }
    
    // Cancelar edición con Escape
    function cancelEdit(){
        li.innerHTML = originalText;
        li.appendChild(span);
    }
    
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            saveEdit();
        } else if(e.key === 'Escape'){
            cancelEdit();
        }
    });
}

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}

// Agregar tarea con Enter
inputBox.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        addTask();
    }
});

showTask();