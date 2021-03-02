// write your code here
const menu = document.querySelector('div#ramen-menu')
const details = document.querySelector(`div#ramen-detail`)
let ratingForm = document.querySelector(`form#ramen-rating`)


function makeMenu(){
    fetch('http://localhost:3000/ramens')
        .then(resp => resp.json())
        .then(ramens => {
            ramens.forEach(ramen => {
                img = document.createElement("img")
                img.classList = "ramen-pic"
                img.src = ramen.image 
                img.dataset.id = ramen.id
                menu.append(img) 
            });
        })
}



menu.addEventListener('click', function(event){
    if(event.target.className === 'ramen-pic')
        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
            .then(resp => resp.json())
            .then(ramen=>{
                details.innerHTML =`<img class="detail-image" src=${ramen.image} alt=${ramen.name} />
                <h2 class="name">${ramen.name}</h2>
                <h3 class="restaurant">${ramen.restaurant}</h3>
                `
                ratingForm.dataset.id = ramen.id
                ratingForm.innerHTML = `<label for="rating">Rating: </label>
                <input type="text" name="rating" id="rating" value="${ramen.rating}" />
                <label for="comment">Comment: </label>
                <textarea name="comment" id="comment">${ramen.comment}</textarea>
                <input type="submit" value="Update" />`   
            })   
})

ratingForm.addEventListener("submit", function(event){
    console.log(event.target)
    event.preventDefault()
    const rating = event.target[0].value
    const comment = event.target[1].value
    // const ramenDiv = event.target.closest('div')
    // const id = ramenDiv.dataset.id
    newRamen = {rating, comment}

    fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': `application/json`,
            'Accept': `application/json`
        },
        body: JSON.stringify(newRamen)
    })
    
})


makeMenu()