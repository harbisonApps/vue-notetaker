<template>
  <article class="message">
    <div class="message-header">
      <p>{{ note.title }}</p>
    </div>
    <div class="message-body">
      {{ note.body }}
      <br>
      <br>
      <span class="has-text-grey-light">Created at: {{ note.createdAt | moment }}</span>
      <br>
      <span class="has-text-grey-light">last updated: {{ note.updatedAt | moment }}</span>
      <br>
      <button @click="deleteNote" class="delete" aria-label="delete">Delete</button>
      <UpdateNoteModal :note="note" @updateNote="updateNote" :key="note._id"/>
      <hr>
    </div>
  </article>
</template>
<script>
import { deleteNote } from '@/services/NoteService'
import UpdateNoteModal from './UpdateNoteModal'

export default {
    name: 'NoteItem',
    props: [ 'note' ],
    components: { UpdateNoteModal},
    methods: {
      deleteNote(e){
        e.preventDefault();
        deleteNote(this.note._id)
          .then(() => this.$emit('deleteNote', this.note._id))
          .catch(err => alert(err))
      },
      updateNote(note){
        this.$emit('updateNote', note)
      }
    },
}
</script>