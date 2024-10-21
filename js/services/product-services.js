const productList = () =>{

    return fetch("https://api-alura-geek-tau.vercel.app/products") 
            .then((res) => res.json()) 
            .catch( (err) => console.log(err));
}


const createProducts = (name, price, image) =>{

    return fetch("https://api-alura-geek-tau.vercel.app/products", {

        method: "POST",
        headers: {

            "Content-Type": "application/json", 
        },
        body: JSON.stringify({ 

                name,
                price,
                image,

        }),
    }).then ((res) =>  {
        location.reload();
        return res.json();
    }).catch((err) => console.log(err));

};

const deleteProducts = (id) => {
    return fetch(`https://api-alura-geek-tau.vercel.app/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .catch(err => console.error(err));
};

export const servicesProducts = {

    productList,
    createProducts,
    deleteProducts,
}
