$(document).ready(function () {
    const outputEl = $(".productListing")

let blahBlah = function(event)  
{    // load the products data
    console.log(event)   
    $.ajax({
        "url": "products.json"
    }).then(productData => {
        let finalHTML = ""
        // after products are done loading, store them
        const products = productData.products
        //  then request catagories 
        $.ajax({
            "url": "catagories.json"
        }).then(catagoryData => {
            let finalHTML = ""
            // store catagories
            const catagories = catagoryData.catagories

            const selection = parseInt(this.value); /* $("#seasons").value */

            // build HTML represetation of products
            products.forEach(product => {
                // find catagory for this product
                const productCatagory = catagories.find(c => c.id === product.catagory_id)
                
            if (product.catagory_id === selection) {
                finalHTML += `
                <article id="product_${product.id}">
                    <h1>${product.name}</h1>
                    <div>Catagory: ${productCatagory.name}</div>    
                    <div>Price: $${(product.price - (product.price * productCatagory.discount)).toFixed(2)}</div>
                </article>
                    `
                } else {
                    finalHTML += `
                    <article id="product_${product.id}">
                        <h1>${product.name}</h1>
                        <div>Catagory: ${productCatagory.name}</div>    
                        <div>Price: $${product.price}</div>
                    </article>
                        `
                    }
                })
                
                
                outputEl.html(finalHTML)
            })
        })
    }
    $("#seasons").change(blahBlah)
})
// $('select').on('change', function() {
//     alert( this.value );
//   })