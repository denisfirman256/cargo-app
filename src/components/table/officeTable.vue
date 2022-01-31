<template>
  <section>
    <div class="my-4">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <b-form-input v-model="filter" type="search" style="width: 300px ;" placeholder="Search"></b-form-input>
        <router-link class="btn btn-primary" :to="{name: 'Add_Office'}">Add Data</router-link>
      </div>
      <!-- Table -->
      <b-table 
        striped 
        hover 
        :busy.sync="isBusy" 
        :items="items" 
        :fields="fields"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        >
          <!-- A virtual column -->
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>

        <template v-slot:cell(opsi)="data">
          <button class="btn btn-danger btn-sm mr-2" @click.prevent="deleteData(data.item.id)">
            <span>
              <img :src="'/libraries/images/icons/dashboard/delete.svg'" alt="delete">
            </span>
          </button>
          <b-button v-b-modal.modal-edit class="btn btn-warning text-white btn-sm" @click.prevent="editData(data.item.id)">
            <span>
              <img :src="'/libraries/images/icons/dashboard/edit.svg'" alt="edit">
            </span>
          </b-button>
        </template>
      </b-table>
      <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // State Field as key object in axios
      fields: [
        'index',
        {
          key: 'name_office',
          label: 'Name Office',
          sortable: true
        },
        {
          label: 'Address Office',
          key: 'address_office',
          sortable: true
        },
        {
          label: 'No Telp',
          key: 'no_telp_office',
          sortable: true
        },
        {
          key: 'opsi',
          label: 'Opsi'
        }
      ],
      // Filter Search
      filter: "",
      // Items
      items: [],
      number: '',
      isBusy: false,

      // Pagination
      perPage: 10,
      currentPage: 1,
    }
  },
  mounted() {
    this.getDataOffice();
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    // GetData
    getDataOffice(){
      axios.get('/api/v1/address_office', {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
        if (response.status == 200) {
          this.items = response.data[0].address_office
        } else {
          // Notification Success
          this.$notify({
            title: 'Data Error!!',
            type: 'info',
            text: 'Please Try Again!!'
          });
        }
      }).catch((error) => {
        if(error.response.status) {
          this.$router.push({
            name: 'Dashboard'
          })
        }
      })
    },
    // Delete Data
    deleteData(id){
      if (confirm('Apakah Ingin Dihapus')) {
        axios.delete('/api/v1/address_office/'+ id, {headers: {Authorization : 'Bearer ' + localStorage.getItem('token')}}).then((response) => {
            
            this.$router.push({
              name: 'Address_Office'
            })
            // Notification Success
            this.$notify({
              title: 'Data Has Deleted!!',
              type: 'success',
              text: response.data.message
            });
            this.getDataOffice();
        }).catch((error) => {
          // Notification Error
          this.$notify({
            title: 'Problem Issues!!',
            type: 'danger',
            text: error.response.data.message
          });
        })
      }
    },
    editData(id){
      this.$router.push({
        name: 'Edit_Office',
        params: {
          id: id
        } 
      });
    },
    provide(){

    }

  }
}
</script>

<style scoped>
.btn {
  padding: 5px 12px;
}
  
</style>