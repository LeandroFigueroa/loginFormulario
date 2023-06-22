const addProduct = async (prodId) =>{
    try {
        const response = await fetch(`/carts/${prodId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            await response.json();
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.log(error)
    }
};





