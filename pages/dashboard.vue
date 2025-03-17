<template>
  <div class="px-8">
    <DashboardDownloadSuccess :visibility="download"></DashboardDownloadSuccess>
    <div class="my-4 px-2">
      <h1 class="text-lightBlack text-sm font-medium">Dashboard</h1>
    </div>
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6 px-2">
      <SearchDropdown :isOpen="isModalOpen" :toggle="toggleModal">
        <template #trigger>
          <!-- <div
          class="border-l-2 border-gray-300 px-4 py-2 flex items-center bg-gray-200"
        >
          <LucideListFilter
            class="w-4 h-4 text-gray-600"
            @click="emit('filterModalOpen')"

          />
        </div> -->
          <!-- @click="toggleModal" -->
          <button
            @click="isModalOpen = !isModalOpen"
            class="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            <LucideListFilter class="h-5 w-5 text-gray-700" />
            <span class="font-medium text-xs">Filter</span>
          </button>
        </template>
        <!-- <slot name="filter-modal"></slot> -->
        <template>
          <UiFilterModal
            :isOpen="isModalOpen"
            @close="isModalOpen = false"
            @apply="handleFilterApply"
          />
        </template>

        <!-- <SelectBox :modelValue="selectedStatus" 
        :isOpen="isOpen"
        :values="['Active','Inactive']" default-value="Filter By Status" 
          @update:modelValue="$emit('update:selectedStatus', $event)" 
          :status="true" 
          variant="text-gray-700 text-sm bg-transparent"
      /> -->
        <!-- <div class="p-4 text-gray-700 text-sm">
        <p class="">Filter by Status:</p>
        <div class="flex flex-col space-y-[10px] pt-[10px]">
          <p class="cursor-pointer">Active</p>
          <p class="cursor-pointer">Inactive</p>
        </div>
      </div> -->
      </SearchDropdown>

      <button
        @click="beginDownload"
        class="active:bg-blue-900 flex items-center bg-blue-600 text-white rounded px-3 py-2 text-xs"
      >
        <CloudDownload class="h-4 w-4 mr-2" />
        Download Report
      </button>
    </div>

    <section class="flex justify-between gap-x-8 px-2">
      <!-- Dashboard Grid -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-[823px] grow">
        <!-- Metric Cards -->
        <MetricCard
          title="Received Suppliers"
          :value="60"
          :change="12.95"
          trend="up"
          :showCompared="true"
        />
        <MetricCard
          title="Received Products Qty"
          :value="20550"
          :change="-2.95"
          trend="down"
          :showCompared="true"
        />
        <MetricCard
          title="Value of Received Products"
          :value="5250000"
          :change="-12.95"
          valuePrefix="₦"
          trend="down"
          :showCompared="true"
        />
        <MetricCard
          title="Orders Pending Arrival"
          :value="15"
          :showTrend="false"
          :skip-canvas="true"
        />
        <MetricCard
          title="Orders Passed Delivery Date"
          :value="10"
          :showTrend="false"
          :skip-canvas="true"
        />
        <MetricCard
          title="Average Processing Time"
          value="06d | 14h | 53m"
          :change="12.95"
          trend="up"
          :isRawValue="true"
        />

        <!-- Shelf Life Analysis -->
        <div
          class="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-1"
        >
          <h3 class="text-gray-800 font-medium mb-2">Shelf Life Analysis</h3>
          <p class="text-sm text-gray-600 mb-4">
            Ratio of received products with expiry less than 18 months
          </p>
          <div class="flex justify-center">
            <PieChart :data="[40, 60]" :colors="['#f87171', '#6c88ff']" />
          </div>
        </div>

        <!-- Storage Space -->
        <div
          class="bg-white rounded-lg shadow p-6 col-span-1 md:col-span-2 lg:col-span-1"
        >
          <h3 class="text-gray-800 font-medium mb-2">Storage Space</h3>
          <p class="text-sm text-gray-600 mb-4">
            Ratio of used vs free storage space
          </p>
          <div class="flex justify-center">
            <!-- :colors="['#3b82f6', '#bfdbfe']" -->
            <DonutChart
              :data="[40, 60]"
              :colors="['#6c88ff', '#fff']"
              label="40%"
            />
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-2 bg-white md:w-[389px] grow-0 overflow-y-auto rounded-lg p-6 space-y-6"
      >
        <!-- Top Suppliers and Top Products -->
        <TopList
          title="Top Suppliers"
          :items="topSuppliers"
          valuePrefix="₦"
          class="col-span-1 md:col-span-2 lg:col-span-1"
        />
        <div class="border-b-[2px] border-light-500 w-full"></div>

        <TopList
          title="Top Products"
          :items="topProducts"
          class="col-span-1 md:col-span-2 lg:col-span-1"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Filter, Download, CloudDownload } from "lucide-vue-next";
import { useMetrics } from "~/composables/useMetrics";
import MetricCard from "~/components/dashboard/MetricCard.vue";
import DonutChart from "~/components/dashboard/DonutChart.vue";
import PieChart from "~/components/dashboard/PieChart.vue";
import TopList from "~/components/dashboard/TopList.vue";

const emit = defineEmits([
  // "filterOpen",
  "filterModalOpen",
]);
const { topSuppliers, topProducts } = useMetrics();

const download = ref(false);
const { isModalOpen, toggleModal } = useFilterModal();

const beginDownload = () => {
  download.value = true;

  setTimeout(() => {
    download.value = false;
  }, 3000);
};

const handleFilterApply = (filters: any) => {
  console.log("Filters Applied:", filters);
};
</script>
