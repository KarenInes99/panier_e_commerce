// on écoute un événement de chargement de la page
const blockButton=document.querySelector('.bloc_bottom')
const blockTop= document.querySelector('.bloc_top')
const tbody = document.querySelector('.tbody')
const cartTotal =document.querySelector('#total')
const cartLength = document.querySelector('#count')
const cartKey ='Cart'

const DataBase = [
    {
        name:'Casque',
        url:'images/aa-1.jpeg',
        price:6000,
        pk:1

    },
    {
        name:'Casque',
        url:'images/hh-2.jpeg',
        price:5000,
        pk:2

    },
    {
        name:'Air Pods',
        url:'images/gg-1.jpeg',
        price:10000,
         pk:3
    },
];

// initialisation de l'application
window.onload=(()=>{
initApp()
})()



// fonction d'initialisaton
function initApp(){
    productUI()
    cartUI()
}


// cette fonction s'execute lorsque l'utilisateur clique sur le bouton d'ajout au panier
function onClick(event){
    try{
    addToCart(event.target.id)
    }catch(err){
     throw new Error(err.message)
    }
}

// recuperer tous les produits de la base de données
function getAllProduct(){
    try{
        return DataBase
    }catch(err){
      throw new Error(err.message)
    }
}
/// Rechercher un produit par son identifiant.
function findProductByPK(pk){
    try{
        return DataBase.filter((item)=>item.pk==JSON.parse(pk))

    }catch(err){
        throw new Error(err.message)
    }
}


/// On initialise l'ajoute des produits sur l'interface utilisateur de l'application.
function productUI(){
   try{
    var products = getAllProduct()
   for (let i=0;i<products.length;i++){
    let div = document.createElement('div')
    div.className='box'
    let divImage = document.createElement('div') 
    divImage.className ='img'
    let Img = document.createElement('img')
    Img.className='image'
    Img.src=products[i].url
    let divProductInfo = document.createElement('div')
    let p = document.createElement('p')
    let h2 = document.createElement('h2')
    p.innerText= products[i].name
    h2.innerText=products[i].price + 'F CFA'
    let cartButton = document.createElement('button')
    cartButton.onclick= onClick
    cartButton.innerText='Ajouter au panier'
    cartButton.className='ajout'
    cartButton.id=products[i].pk
    let divCart = document.createElement('div')
    divCart.appendChild(cartButton)
    divProductInfo.appendChild(p)
    divProductInfo.appendChild(h2)
    divImage.appendChild(Img)
    div.appendChild(divImage)
    div.appendChild(divProductInfo)
    div.appendChild(divCart)
    blockTop.appendChild(div)
    blockButton.appendChild(div)
   }

   }catch(err){
    throw new Error(err.message)
   }
   
}
function getCartTotal(){

 try{
var items = getCarts();
var total =0
 if(items)
 {
   total= items.reduce((prev,item)=>prev+JSON.parse(item.price),0)
 }
 return total
 }catch(err){
    throw new Error(err.message)
 }

}




/// Ici on crée l'interface utilisateur du panier en ajoutant des données dans le tableau du panier
function cartUI(){
    try{
           var cartItems = getCarts()
           var total = getCartTotal()
           cartItems.forEach(item=>{
            var tr= document.createElement('tr')
            var tdImage = document.createElement('td')
            var tdName = document.createElement('td')
            var tdPrice =document.createElement('td')
            var Img = document.createElement('img')
            Img.src = item.url
            Img.className='cartImage'
            tdImage.appendChild(Img)
            tdName.innerText=item.name
            tdPrice.innerText=item.price
            tr.appendChild(tdImage)
            tr.appendChild(tdName)
            tr.appendChild(tdPrice)
            tbody.appendChild(tr)
        })
        cartTotal.innerText=total + 'F CFA'
        cartLength.innerText=getcartLength()

    }catch(err){
        throw new Error(err.message)
    }

  
}

// Cette fonction permet de mettre l'interface utilisateur du panier ajour quand element est ajoute.
function cartUpdateUI(pk){
    try{
        const item = findProductByPK(pk)[0];
        var total = getCartTotal()
        var tr= document.createElement('tr')
        var tdImage = document.createElement('td')
        var tdName = document.createElement('td')
        var tdPrice =document.createElement('td')
        var Img = document.createElement('img')
        Img.src = item.url
        Img.className='cartImage'
        tdImage.appendChild(Img)
        tdName.innerText=item.name
        tdPrice.innerText=item.price
        tr.appendChild(tdImage)
        tr.appendChild(tdName)
        tr.appendChild(tdPrice)
        tbody.appendChild(tr)
        cartTotal.innerText=total + 'F CFA'
        cartLength.innerText=getcartLength()
    }catch(err){
        throw new Error(err.message)
    }

}

// cette fonction permet d'ajouter un element au panier
function addToCart(pk){
   try{
    var cartItems = localStorage.getItem(cartKey)
    if(cartItems){
       cartItems=JSON.parse(cartItems)
       cartItems.push(pk)
    }else{
        cartItems=[pk]
    }
   localStorage.setItem(cartKey,JSON.stringify(cartItems))
   cartUpdateUI(pk)
   }catch(err){
    throw new Error(err.message)
   }

}


// cette fonction permet de recuperer la liste des elements du panier 
function getCarts(){
   try{
    var cartItems=   localStorage.getItem(cartKey);
    let carts=[];
    if(cartItems){
     cartItems=JSON.parse(cartItems)
     cartItems.forEach(element =>{
     carts=carts.concat(findProductByPK(element))
   });
 }
 return carts
   }catch(err){
    throw new Error(err.message)
   }

}

// Trouver la taille du panier
function getcartLength(){
    try{
        return getCarts().length
    }catch(err){
    throw new Error(err.message)
    }
}