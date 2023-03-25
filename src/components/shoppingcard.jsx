import React, { useState } from "react";

import {defaultItems} from '../data'
import {ItemsTable} from './itemstable/itemslable'


export const ShoppingCard = () => {
    const [items, setItems] = useState(defaultItems);
    const result = items.reduce (
        (previousValue, currentItem) => 
        previousValue + currentItem.count * currentItem.price,
        0
    );

    const footer = (
        <div className="result-panel">
            <span>
                Общая стоимость: <span className="value">{result}</span> р.
            </span>
            <button> Оформить</button>
        </div>
    )


    const emptyTemplate = (
        <div className="emty-text"> У вас еще нет  товаров в корзине </div>
    );


    const hadleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };


    const handleIncreaceCount = (id) => {
        setItems(items.map(item => {

            if (item.id === id) {
                item.count++ 
            }

            return item;
        })); 
    }



    const handleDecreaceCount = (id, count) => {
        if (count < 2) {
            hadleRemoveItem (id)
        }else {

            setItems(items.map(item => {

                if (item.id === id) {
                    item.count--
                }

                return item;
            })); 
        }
    }

    return (
        <>
        <h1>Корзина</h1>
        {
            !!items.length ?
        <ItemsTable 
                items={items}
                removeItem = {hadleRemoveItem}
                IncreaceCount = {handleIncreaceCount}
                DecreaceCount = {handleDecreaceCount}
            />
            :emptyTemplate
        }   
        {footer}
        </>
    )
}