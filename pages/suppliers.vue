<script setup lang="ts">
import { useSuppliers } from "@/composables/useSuppliers";
import { useFilter } from "@/composables/useFilter";
import { usePagination } from "@/composables/usePagination";
import { useNavtabs } from "@/composables/useNavtabs";

const { suppliers } = useSuppliers();

const isAscending = ref(false);
// const specificSort = ref('')

const sortedSuppliers = computed(() => {
  return [...suppliers.value].sort((a: any, b: any) => {
    // const aValue = a[specificSort.value]
    // const bValue = b[specificSort.value]

    // if(specificSort.value){
    //   return isAscending.value ? aValue.localeCompare(bValue) : aValue.localeCompare(aValue)
    // }

    return isAscending.value ? a.id - b.id : b.id - a.id;
  });
});

const { search, filteredSuppliers, selectedStatus } =
  useFilter(sortedSuppliers);
const { page, paginatedItems, totalPages } = usePagination(
  filteredSuppliers,
  10
);
// const showModal = ref(false);
const { showModal, openModal, closeModal } = useModal();

const { tabs, activeTab } = useNavtabs();
</script>

<template>
  <div class="flex">
    <!-- <Sidebar /> -->
    <div class="flex-1">
      <!-- <div class="px-8">
        <Navbar />
      </div> -->

      <!-- <div class="flex items-center gap-[30px] px-8 border border-ashGray">
        <div
          v-for="tab in tabs"
          :key="tab.name"
          class="cursor-pointer py-3 font-semibold"
          :class="
            tab.name === activeTab
              ? 'text-darkBlue border-b-4 border-darkBlue'
              : 'text-lightBlack'
          "
        >
          <p>{{ tab.name }}</p>
        </div>
      </div> -->

      <div class="px-8">
        <h1 class=" text-lightBlack font-medium">All Suppliers</h1>
        <div class="flex items-center justify-between py-4">
          <Search
            v-model:isAscending="isAscending"
            v-model="search"
            v-model:selectedStatus="selectedStatus"
          />

          <button
            @click="openModal"
            class="bg-blue-600 text-white px-4 py-1.5 cursor-pointer rounded-lg hover:bg-blue-700"
          >
            <span class="text-base"> + </span>
            <span class="text-xs"> New Supplier </span>
          </button>
        </div>
      </div>

      <div class="px-8">
        <div class="bg-white py-4">
          <SupplierTable
            :suppliers="paginatedItems"
            v-model:search="search"
            v-model:selectedStatus="selectedStatus"
            v-model:page="page"
          />
          <div class="px-8">
            <!-- <Pagination
              :totalPages="totalPages"
              :page="page"
              @changePage="page = $event"
            /> -->
          </div>
          <SupplierModal v-model="showModal" />
        </div>
      </div>
    </div>
  </div>
</template>
