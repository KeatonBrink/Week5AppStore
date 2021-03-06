const API_URL = "https://fakestoreapi.com";

var app = new Vue({
    el: "#app",
    data: {
        //Variables here
        products: [],
        shoppingCart: [],
        curPage: 0,
        runningTotal: 0,
        userName: "",
        passWord: "",
    },
    methods: {
        //functions here
        clickEnter: function () {
            this.curPage = 1;
        },
        enterShoppingCart: function () {
            this.curPage = 2;
            for (let i = 0; i < this.shoppingCart.length; i++){
                this.runningTotal += this.shoppingCart[i].totalCost;
                // console.log("New price to add: ", this.shoppingCart[i].price, " Running Total: ", this.runningTotal);
            }
            // for (element in this.shoppingCart) {
            //     this.runningTotal += element.price
            //     console.log("Cost to add: ", element.price);
            // }
        },
        clearShoppingCart: function () {
            this.shoppingCart = [];
            this.curPage = 3;
            this.runningTotal = 0;
        },
        restartShopping: function () {
            this.curPage = 1;
        },

        userValidation: function () {
            if (this.isInvalidLogin() || (this.curPage != 1)) {
                return false;
            }
            return true;
        },

        isInvalidLogin: function () {
            return this.userName == "" || this.passWord == "";
        },

    },
    //  This method uses .then() to talk to api at start of page
    // created: function () {
    //     fetch(API_URL + "/products").then((response) => {
    //         response.json().then((data) => {
    //             console.log(data);
    //             this.products = data;
    //         })
    //     })
    // }
    // This method uses async/await to talk to api at start of page
    //async created() {
    created: async function () {
        // GET request using fetch with async/await
        //await stops the asyncronouse function, and forces the line to finish working  
        const response = await fetch(API_URL + "/products");
        const data = await response.json();

        data.forEach(element => {
            element.ammount = 0;
            element.totalCost = 0;
        });

        this.products = data;
      }
});

Vue.component('item', {
    template: `
    <div>
        <img :src="item.image"style="width: 200px; border-radius: 5%; border: solid"/>
        <br />
        <br />
        <h3>{{item.title}}</h3>
        <br />
        {{item.description}}
        <br />
        {{item.price}}
        <br />
        <button v-on:click="addToShoppingCart()">Add to Cart</button>
    </div>`,
    data: function () {
        return {
            
        }
    },
    props: [
        "item",
        "cart",
        // "cost"
    ],
    methods: {
        addToShoppingCart: function () {
            let newitem = true;
            for (let i = 0; i < this.cart.length; i++){
                // console.log("Comparing ", this.cart[i].title, " to ", this.item.title)
                if (this.cart[i].title == this.item.title) {
                    console.log("We are in");
                    this.cart[i].ammount++;
                    this.cart[i].totalCost = this.cart[i].price*this.cart[i].ammount;
                    console.log(this.cart[i].totalCost);
                    newitem = false;
                }
            }
            if (newitem == true) {
                this.item.ammount = 1;
                this.item.totalCost = this.item.price
                this.cart.push(this.item);
            }
            // this.cost += this.item.price;
            console.log("Item added to cart: ", this.item.title);
        }
    }
});

Vue.component('cartitem', {
    template: `
    <div>
        <img :src="item.image"style="width: 300px; border-radius: 5%; border: solid"/>
        <br />
        <br />
        <h3>{{item.title}}</h3>
        
        <br />
        Quantity: {{item.ammount}}
        
        <br/>
        Cost: {{item.totalCost}}
        <br />
    </div>`,
    data: function () {
        return {
            
        }
    },
    props: [
        "item",
        "coster",
        "ammounter",
    ],
    methods: {
    }
});