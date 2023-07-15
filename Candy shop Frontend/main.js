const myForm=document.getElementById('my-form');
const ul=document.getElementById('my-items');

const candynameValue=document.getElementById('candyname').value;
const descriptionValue=document.getElementById('description').value;
const priceValue=document.getElementById('price').value;
const quantityValue=document.getElementById('quantity').value;

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const items=await axios.get('http://localhost:3000/candies');
        console.log("items=",items);
        for(let i=0;i<items.data.length;i++){
            showOutput(items.data[i],items.data[i].id);
        }
    }
    catch(err){
        console.log(err);
    }
});

myForm.addEventListener('submit',async (e)=>{
    try{
        e.preventDefault();
        let obj={
            candyname:candynameValue,
            description:descriptionValue,
            price:priceValue,
            quantity:quantityValue
        };
        const response=await axios.post('http://localhost:3000/candies',obj);
        console.log("executing");
        showOutput(response.data,response.data.id);
    }
    catch(err){
        console.log(err);
    }
});

function showOutput(obj,obj_id){
    var list=document.createElement('li');
    list.appendChild(document.createTextNode(obj.candyname+"-"+obj.description+"-"+obj.price+"-"+obj.quantity+" "));
    
    var buy1Btn=document.createElement('button');
    buy1Btn.className='btn1';
    buy1Btn.appendChild(document.createTextNode("Buy 1"));
    list.appendChild(buy1Btn);

    var buy2Btn=document.createElement('button');
    buy1Btn.className='btn2';
    buy1Btn.appendChild(document.createTextNode("Buy 2"));
    list.appendChild(buy2Btn);

    var buy3Btn=document.createElement('button');
    buy1Btn.className='btn3';
    buy1Btn.appendChild(document.createTextNode("Buy 3"));
    list.appendChild(buy3Btn);

    list.setAttribute('data-id',obj_id);

    ul.appendChild(list);
}

ul.addEventListener('click',updating = function(e){
    var x=0;
    if(e.target.classList.contains('btn1')){
        x=1;
    }
    if(e.target.classList.contains('btn2')){
        x=2;
    }
    if(e.target.classList.contains('btn3')){
        x=3;
    }
    var li = e.target.parentNode;
    var id = li.getAttribute('data-id');

    async function updateItem(){
        const Item=await axios.get(`http://localhost:3000/candies/${id}`);
        const newquantity=Item.quantity-x;
        const newobj={...Item,quantity:newquantity};
        ul.removeChild(li);
        const response=await axios.patch(`http://localhost:3000/candies/${id}?newquantity=${newquantity}`);
        showOutput(newobj,id);
    }
    updateItem();
    
});