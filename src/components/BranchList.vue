<template>
  <div>
    <button
      type="button"
      class="btn btn-primary align-self-center"
      data-toggle="modal"
      data-target="#branchModal"
    >
      On branch: {{ currentBranch }}
    </button>

    <div
      class="modal fade"
      id="branchModal"
      tabindex="-1"
      aria-labelledby="branchModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="branchModalLabel">Branches</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="list-group">
              <button
                class="list-group-item list-group-item-action active"
                data-dismiss="modal"
                :key="0"
              >
                {{ currentBranch }}
              </button>
              <button
                class="list-group-item list-group-item-action"
                data-dismiss="modal"
                v-for="(branch, i) in branches"
                :key="i + 1"
                @click="changeCurrentBranch(branch)"
              >
                {{ branch }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentBranch', 'branches', 'changeCurrentBranch'],
};
</script>
