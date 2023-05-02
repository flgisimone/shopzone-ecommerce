<h1>Shopzone - Ecommerce </h1>

<h2>Description</h2>
<p>Shopzone is an amateur project with the target create a clone of an ecommerce.</p>

<h2>Stack</h2>
<span><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" style="height: 50px; padding: 20px 0; margin-right: 10px" /></span>
<span><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" style="height: 50px; padding: 20px 0; margin-right: 10px"/></span>
<span><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" style="height: 50px; padding: 20px 0; margin-right: 10px" /></span>
<span><img src="https://www.emailjs.com/logo.png" style="height: 50px; padding: 20px 0; margin-right: 15px" /></span>
<span><img src="https://static.npmjs.com/3dc95981de4241b35cd55fe126ab6b2c.png" style="height: 50px; padding: 20px 0; margin-right: 15px" /></span>
<span><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" style="height: 50px; padding: 20px 0; margin-right: 15px" /></span>
<span><img src="https://cdn.freebiesupply.com/logos/large/2x/figma-1-logo-png-transparent.png" style="height: 50px; padding: 20px 0; margin-right: 15px" /></span>

<h2>Functionalities</h2>
<ul>
<li>API:
<ul>
<li><a href="https://fakeapi.platzi.com/">Platzi Fake Store API</a> -> Login / Registration</li>
<li><a href="https://fakestoreapi.com/">Fake Store API</a> -> Products</li>
</ul>
</li>
<br>
<li><b>Login + Registration</b> view to allow only registered users to make an order.
<ul>
<li>Login invokes <a href="https://fakeapi.platzi.com/">Platzi Fake Store API</a> and registration creates a new user by HTTP POST Method, saving informations in the Local Storage. </li>
</ul>
</li>
<br>
<li><b>Logout</b> with redirecting to Login: this action also removes saved user informations only from Local Storage.</li>
<br>
<li><b>Navigation Menu</b> to allow users to browse the following pages: 
<ul>
<li>Home</li>
<li>Electronics</li>
<li>Jewelery</li>
<li>Men's Clothing</li>
<li>Women's Clothing</li>
<li>Single Product Page (with dynamic path)</li>
<li>Cart (from which you arrive at the checkout page and thank you page)</li>
<li>Wishlist</li>
<li>Contact</li>
<li>Login (if user isn't logged)</li>
</ul>
<br>
<li><b>Ability to add products in wishlist</b></li>
<br>
<li><b>Ability to add products to cart and make order:</b></li>
<ul>
<li>Cart -> Checkout -> Thank You page
<li>Ability to add products of the wishlist - and search for a specific product via the search bar - directly by cart </li>
<li>Receipt of the order both to the email of whoever manages the ecommerce and of the user who placed the order
<br>
- This functionality is handled through <a href="https://www.emailjs.com/">EmailJS</a>
</li>
<li>Ability of send a message by contact module in Contact Page
<br>- This functionality is handled through <a href="https://www.emailjs.com/">EmailJS</a>
</li>
</ul>
<br>
<li><b>Responsiveness:</b> mobile first, tablet (768px), laptop (1200px), desktop (1500px)</li>
<br>
<li><b>State management </b> with Global Context</li>

