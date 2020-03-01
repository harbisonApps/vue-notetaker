<template>
  <div>
    <div class="modal" :class="{ 'is-visible': !isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <br>
        <header class="modal-card-head">
          Edit {{fact.name}}
        </header>
        <section class="modal-card-body">
          <input v-model="name" class="input" type="text" placeholder="name">
          <br>
          <input v-model="category" class="input" type="text" placeholder="category">
          <br>
          <input v-model="description" class="input" type="text" placeholder="description">
          <br>
          <textarea v-model="fullText" class="textarea"  placeholder="enter content"></textarea>
          <br>
          <input v-model="imageUrl" class="input" type="text" placeholder="image URL">
          <br>
          <button @click="update" class="button is-primary is-pulled-right">Update Fact</button>
        </section>
      </div>
      <button @click="toggle" class="modal-close is-large" aria-label="close">Close</button>
    </div>
    <button @click="toggle" :class="{ 'is-visible': isActive }" class="edit">Edit</button>
  </div>
</template>
<script>
import { updateFact }  from '@/services/FactService'
export default {
  name: 'EditFact',
  data(){
    return {
      name: this.fact.name,
      category: this.fact.category,
      description: this.fact.description,
      fullText: this.fact.fullText,
      imageUrl: this.fact.imageUrl,
      isActive: false
    }
  },
  props: ['fact'],
  methods: {
    update(){
      let data = {
          name: this.name,
          category: this.category, 
          description: this.description, 
          fullText: this.fullText, 
          imageUrl: this.imageUrl,
          
        }
      updateFact(data, this.fact._id)
        .then(data => {
          this.$emit('updateFact', data.fact);
          console.log('update Fact: ', data.fact)
          this.toggle();
        })
        .catch(err => alert(err.message));
    },
    toggle(){
      this.isActive = !this.isActive;
    },
  },
}
</script>
<style scoped>
.is-visible{
 display: none
}
.edit{
    font-size: 1.2rem;
    background: white;
    color: blue;
    margin-left: 7px;
}
</style>