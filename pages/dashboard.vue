<template>
  <div class="px-8">
    <div class="mb-4">
      <h1 class="text-base text-lightBlack font-medium">Dashboard</h1>
    </div>
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <button
        @click="toggleFilter"
        class="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white hover:bg-gray-100 transition"
      >
        <LucideListFilter class="h-5 w-5 text-gray-700" />
        <span class="font-medium text-xs">Filter</span>
      </button>
      <button
        class="flex items-center bg-blue-600 text-white rounded px-3 py-2 text-xs"
      >
        <CloudDownload class="h-4 w-4 mr-2" />
        Download Report
      </button>
    </div>

    <section class="grid xl:grid-cols-[823px_auto] xl:gap-x-6">
      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <PieChart :data="[40, 60]" :colors="['#f87171', '#3b82f6']" />
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
            <DonutChart
              :data="[40, 60]"
              :colors="['#3b82f6', '#bfdbfe']"
              label="40%"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 bg-white">
        <!-- Top Suppliers and Top Products -->
        <TopList
          title="Top Suppliers"
          :items="topSuppliers"
          valuePrefix="₦"
          class="col-span-1 md:col-span-2 lg:col-span-1"
        />
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

const { topSuppliers, topProducts } = useMetrics();
const toggleFilter = () => console.log("Filter button clicked");
</script>
