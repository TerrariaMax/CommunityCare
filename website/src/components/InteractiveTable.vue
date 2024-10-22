<template>
  <div>
    <div class="table-controls">
      <input type="text" placeholder="Search..." v-model="searchQuery" @input="filterData" />
      <select v-model="rowsPerPage" @change="updatePage">
        <option v-for="rows in [5, 10, 15, 20]" :key="rows" :value="rows">{{ rows }} rows</option>
      </select>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index" @click="sortData(column)">
            {{ column.label }}
            <span v-if="sortColumn === column.field">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="index">
          <td v-for="column in columns" :key="column.field">{{ item[column.field] }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      rowsPerPage: 10,
      sortColumn: null,
      sortOrder: 'asc'
    }
  },
  computed: {
    filteredData() {
      const query = this.searchQuery.toLowerCase()
      return this.data.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(query))
      )
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.rowsPerPage)
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage
      return this.filteredData.slice(start, start + this.rowsPerPage)
    }
  },
  methods: {
    sortData(column) {
      if (this.sortColumn === column.field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column.field
        this.sortOrder = 'asc'
      }

      this.filteredData.sort((a, b) => {
        const modifier = this.sortOrder === 'asc' ? 1 : -1
        if (a[this.sortColumn] < b[this.sortColumn]) return -1 * modifier
        if (a[this.sortColumn] > b[this.sortColumn]) return 1 * modifier
        return 0
      })
    },
    filterData() {
      this.currentPage = 1 // Reset to first page on search
    },
    updatePage() {
      this.currentPage = 1 // Reset to first page when changing rows per page
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>
