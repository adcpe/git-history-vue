<script setup>
const props = defineProps(['activePage', 'numberOfPages'])
</script>

<template>
  <nav aria-label="Page navigation example" class="mt-3">
    <ul class="pagination">
      <li
        :class="activePage === 1 ? 'page-item disabled' : 'page-item'"
        @click="activePage === 1 ? () => {} : $emit('changePage', activePage - 1)">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        v-for="n in 3"
        :class="activePage === n ? 'page-item active' : 'page-item'"
        @click="$emit('changePage', n)">
        <a class="page-link" href="#">{{ n }}</a>
      </li>

      <li
        :class="activePage === 3 ? 'page-item disabled' : 'page-item'"
        @click="activePage === 3 ? () => {} : $emit('changePage', activePage + 1)">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
