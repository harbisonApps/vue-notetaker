<template>
    <div>
        <div class="name">{{fact.name}}</div>
        <div class="category">{{fact.category}}</div>
        <div class="desc">{{fact.description}}</div>
        <div class="text">{{fact.fullText}}</div>
        <img :src="fact.imageUrl" :alt="fact.description">
    </div>
</template>
<script>
export default {
    props: [ 'fact' ],
}
</script>