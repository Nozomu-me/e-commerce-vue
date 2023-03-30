<template>
	<div>
		<nav class="navbar">
			<div class="logo">
				<img src="https://static.vecteezy.com/system/resources/previews/004/731/851/original/purple-ice-cream-with-eyes-ice-cream-in-a-waffle-cone-nice-illustration-for-the-cover-vector.jpg"/>
			</div>
			<div class="links">
				<router-link :to="{name: 'home'}" class="link">Home</router-link>
				<router-link :to="{name: 'products'}" class="link">products</router-link>
			</div>
			<div class="icons">
				<font-awesome-icon :icon="['fas', 'user']" class="icon"/>
				<font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon"/>
				<router-link :to="{name: 'cart'}">
					<div class="cart">
						<font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>
						<div class="products-nbr">1</div>
					</div>
				</router-link>
			</div>
		</nav>
		<router-view/>		
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-content: center;
	align-items: center;
	font-size: 22px;
	background-color: white;
}
.logo{
	justify-self: start;
	padding: 5px;
}
img{
	height: 60px;
	width: 60px;
}
.links{
	display: flex;
	justify-content: space-evenly;
	gap: 5px;
}
.link{
	all: unset;
	cursor: pointer;
}
.link:hover{
	color: #5D3FD3;
	font-weight: bold;
}
.icons{
	display: flex;
	justify-content: end;
	padding-right: 40px;
	gap: 5px;
}
.icon{
	width: 30px;
	height: 20px;
	color: #5D3FD3;
}

.cart{
	position: relative;
}
.products-nbr{
position: absolute;
background-color: red;
color: white;
top:-12px;
right: -10px;
font-size: 15px;
font-weight: bold;
border-radius: 50%;
height: 20px;
width: 20px;
/* text-align: center; */
}


</style>