        

//document.getElementById("demo").innerHTML="Hello World";

    
    /*<div class="center">
            <img id = 'kek' src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSUoQQz-mKtvOyfIvGdeYmfagxz_W2KJCAxBreXMa_iFpS94qA98Mu_ww" class="img-medium"/>
          
        </div>
            <hr>
        <div class="center text-big bold">
            what's this?Kekels OwO
            
        </div>
        <div class="center">
            <img src ="https://upload.wikimedia.org/wikipedia/en/e/ee/Harambe_with_boy.jpg"/>
        </div>*/
var button = document.getElementById('counter');

button.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if (request.readystate === XMLHttpRequest.Done){
            if (reuqest.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
                
            }
        }
    };
    request.open('GET','',true);
    request.send(null);
};
var submit = document.getElementById('submit_btn');
submit.onclick= function(){
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.steadystate === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list='';
                for(var i=0;i<names.length;i++){
                    list +='<li>'+names[i]+'</li>';
                    
                }
                var ul= document.getElementById('namelist');
                ul.innerHTML= list ;
            }
        }
    };
    
    var nameInput = getEelementById('name');
    var name = nameInput.value;
    request.open('GET','',true);
    request.send('null')
}