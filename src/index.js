// import _ from 'lodash';
console.log("in index.js before importing revolut")

import RevolutCheckout from '@revolut/checkout'

async function component() {   
 
    console.log("in index.js inside component")

    async function create() {

        console.log("in index.js create async function")

        var createOrder = {
            amount: 5,
            captureMode: 0,
            merchantOrderExtRef: "myOrderRef1",
            customerEmail: "nasarathkhan@gmail.com",
            description: "FP Purchase",
            currency: "GBP",
            settlementCurrency: "GBP",
            merchantCustomerExtRef: "myOrderRef1"      
        }

        console.log("in index.js making ajax call")

        $.ajax({            
            url: "/revolut/create",
            data: JSON.stringify(createOrder),
            contentType: 'application/json',
            type: "POST",
            success: function (data) {
                
                alert(JSON.stringify(data.value.publicId));
                return data;                
            },
            error: function (data) {
                alert('error');
            }
        });
    }

const { revolutPay } = await RevolutCheckout.payments({
    local: 'en',
    mode: 'sandbox',
    publicToken: "pk_xvYW2jXVjl6uIECsoMotSc58HZNEIwl2X5DUugsLOrprGVf1" 
})
    console.log("in index.js after importing revolut")

    const paymentOptions = {
        currency: "GBP", totalAmount: 908, createOrder: async () => {

            const order = await create()   

            var pid = JSON.stringify(order.value.publicId)
            
            alert(pid);

            return { publicId: pid}            
        }
    }
    console.log("in index.js get element ID")
    let target = document.getElementById("revolut-pay2.0")

    console.log("in index.js mount the button")
    revolutPay.mount(target, paymentOptions)
  }

document.body.appendChild(component());


