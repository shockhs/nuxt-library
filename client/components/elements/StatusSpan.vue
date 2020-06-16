<template>
  <div class="column">
    <div v-if="status === 'inProgress'" class="progress">
      <span>In Progress</span>
    </div>
    <div v-if="status === 'overdue'" class="progress overdue">
      <span>Overdue</span>
    </div>
    <div v-if="status === 'closed'" class="progress closed">
      <span>Closed</span>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    status: String
  }
};
</script>

.<style lang="scss" scoped>
span {
  text-transform: uppercase;
  font-weight: 500;
  color: #fff;
}
.progress {
  height: 30px;

  font-size: 16px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  background-color: #0bcf5d;
}
.overdue {
  background-color: #df1739;
}
.closed {
  background-color: #363a38;
}
</style>