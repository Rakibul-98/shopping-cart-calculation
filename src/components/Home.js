import React, { useEffect, useState } from 'react';
import Post from './Post';
import { addToDb, getStoredCart } from '../utilities/fakeDb';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [cart, setCart] = useState([]);
    let quantity = 0;

    useEffect(() => {
        fetch("fakeData.json")
            .then(res => res.json())
            .then(data => setPosts(data));
    }, [])

    useEffect(()=>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedPost = posts.find(post=> post.id === parseInt(id));
            if(addedPost){
                const quantity = storedCart[id];
                addedPost.quantity = quantity;
                savedCart.push(addedPost);
                console.log(addedPost);
            }
        }
        setCart(savedCart);
    },[posts])

    const handleAddToCart = (selectedPost) =>{
        let newCart = [];
        const exists = cart.find(post => post.id === selectedPost.id);
        if(!exists){
            selectedPost.quantity = 1;
            newCart = [...cart, selectedPost];
        }
        else{
            const rest = cart.filter(post => post.id !== selectedPost.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedPost.id);
    }

    for (const item of cart) {
        quantity = quantity + item.quantity;
    }

    return (
        <div className='m-2'>
            <h1 className='text-4xl text-center font-bold text-red-500 my-10'>Shop your dream...</h1>
            <div className='grid grid-cols-12'>
                <div className='col-span-10 flex flex-wrap gap-3'>
                    {
                        posts.map(post=><Post key={post.id} post={post} handleCart={handleAddToCart}></Post>)
                    }
                </div>
                <div className='top-0 sticky'>
                    <p>Summery</p>
                    <p>Items added : {quantity}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;