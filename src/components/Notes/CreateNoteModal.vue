<template>
  <div>
    <button @click="toggle" class="button create">Create Note</button>
    <div class="modal" :class="{ 'is-visible': !isActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h5>
            Add A Note
          </h5>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input v-model="title" class="input" type="text" placeholder="title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea v-model="body" class="textarea"  placeholder="enter content"></textarea>
            </div>
          </div>
        </section>
      </div>
      <button @click="toggle" class="close " aria-label="close">cancel</button>
      <button @click="create" class="button is-primary is-pulled-right">Add A Note</button>
      <hr>
    </div>
  </div>
</template>

<script>
import { createNote }  from '@/services/NoteService'
export default {
  name: 'CreateNoteModal',
  data(){
    return {
      title: '',
      body: '',
      isActive: false
    }
  },
  methods: {
    create(){
      let data = { title: this.title, body: this.body }
      createNote(data)
        .then(data => {
          this.$emit('createNote', data.note);
          this.title = this.body = '';
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
  .create{
    font-size: 1.5rem;
    background: green;
    color: whitesmoke;
    border-radius: 10px;
    cursor: pointer;
  }
</style>