<script setup lang="ts">
import { usePagination } from "@/composables/usePagination";
import { useNavtabs } from "@/composables/useNavtabs";

const { payments, search, selectedStatus } = usePayments();

const isAscending = ref(false);


const { page, paginatedItems, totalPages } = usePagination(
  payments,
  10
);
const { showModal, openModal, closeModal } = useModal();

const { tabs, activeTab } = useNavtabs();


const isFilterOpen = ref(false);

const handleFilterSelection = (filter: string) => {
  console.log("Selected filter:", filter);
};

const isFilterModalOpen = ref(false);

const handleFilterApply = (filters: any) => {
  console.log("Filters Applied:", filters);
};
</script>

<template>
  <div class="flex">
    <!-- <Sidebar /> -->
    <div class="flex-1">
      <div class="px-8">
        <div class="my-2 px-2">
          <h1 class="text-lightBlack text-sm font-medium">Payments</h1>
        </div>
        <div class="flex items-center justify-between py-4 px-2">
          <div class="relative h-auto w-1/4">

          <Search
            v-model:isAscending="isAscending"
            v-model="search"
            v-model:selectedStatus="selectedStatus"
            @filterOpen="isFilterOpen = true"
            @filterModalOpen="isFilterModalOpen = true"
            ><template #filter-modal>
              <UiFilterModal
                :isOpen="isFilterModalOpen"
                @close="isFilterModalOpen = false"
                @apply="handleFilterApply"
              />
            </template>
            <template #filter-dropdown>
              <UiFilterDropdown
                :isOpen="isFilterOpen"
                @close="isFilterOpen = false"
                @select="handleFilterSelection"
              />
            </template>
          </Search>
</div>
          <button
            @click="openModal"
            class="bg-blue-600 text-white px-4 py-1.5 cursor-pointer rounded-lg hover:bg-blue-700"
          >
            <span class="text-base"> + </span>
            <span class="text-xs"> New Payment </span>
          </button>
        </div>
      </div>

      <!-- <button @click="isFilterOpen = true" class="btn-dropdown">
        Open Filter
      </button> -->
<!-- {{ payments }} -->

      <div class="px-8">
        <div class="py-2 px-2">
          <PaymentsPaymentTable
            :payments="paginatedItems"
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
          <PaymentsPaymentModal v-model="showModal" />
        </div>
        <CustomPagination v-model:currentPage="page" :totalPages="totalPages" />
      </div>
    </div>
  </div>
</template>
