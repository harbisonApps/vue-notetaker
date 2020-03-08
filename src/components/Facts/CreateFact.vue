<template>
    <div>
    <button @click="toggle" class="button create">New Fact</button>
    <div class="modal" :class="{ 'is-visible': !isActive }">
      <div class="modal-background"></div>
      <div>
        <header>
          <h5>
            Add A fact
          </h5>
        </header>
        <section class="modal-card-body">
          <input v-model="name" required class="input" type="text" placeholder="name">
          <br>
          <input v-model="category" required class="input" type="text" placeholder="category">
          <br>
          <input v-model="description" required class="input" type="text" placeholder="description">
          <br>
          <textarea v-model="fullText" required class="textarea"  placeholder="enter content"></textarea>
          <br>
          <input v-model="imageUrl" required class="input" type="text" placeholder="imageUrl">
          <br>
          <VueSuglify :slugify="name" :slug.sync="slug">
				<input disabled class="col" slot-scope="{inputBidding}" v-bind="inputBidding"
					type="text" placeholder="slug ...">
			</VueSuglify>
        </section>
      </div>
      <button @click="toggle" class="close " aria-label="close">cancel</button>
      <button @click="create" class="button is-primary is-pulled-right">Add A Fact</button>
      <hr>
    </div>
  </div>
</template>
<script>
import { factCreate } from '@/services/FactService'
import swal from "sweetalert";
import VueSuglify from 'vue-suglify'
export default {
    name: 'create-fact',
    components: {VueSuglify},
    data(){
    return {
      name: '',
      category: '',
      description: '',
      fullText: '',
      imageUrl: '',
      slug: '',
      isActive: false,
    }
  },
  methods: {
      create(){
          let data = {
              name: this.name, 
              category: this.category, 
              description: this.description,
              fullText: this.fullText,
              imageUrl: this.imageUrl,
              slug: this.slug,}
        factCreate(data)
            .then(data => {
                this.$emit('factCreate', data.fact)
                this.name = this.category = this.description = this.fullText = this.imageUrl = this.slug = ''
                this.toggle();
                swal("Fact Created", "", "success");
            })
            .catch(err => {
              swal("All fields are required", "", "warning")
              console.log(err)
            });
      },

      toggle(){
      this.isActive = !this.isActive;
    },
  }
}
</script>
<style scoped>
.is-visible{
    display: none
  }
  .create{
    font-size: 1.2rem;
    background: white;
    color:  green;
    border-radius: 10px;
    cursor: pointer;
  }
</style>