<script setup lang="ts">
import { PurchaseGrn } from "#components";
import { ref } from "vue";
const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id);

const totals = ref([
  {
    name: "Purchase Order",
    count: 40,
    amount: "₦5,250,000",
  },
  {
    name: "GRNs",
    count: 20,
    amount: "₦5,250,000",
  },
  {
    name: "Payments",
    count: 25,
    amount: "₦5,250,000",
  },
  {
    name: "Purchase Qty",
    count: 25,
    // amount: "₦5,250,000"
  },
  {
    name: "Returns",
    count: 25,
    // amount: "₦5,250,000"
  },
]);

// Dummy Purchase Order Data
const purchaseOrders = ref([
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Pending",
    assigned: "Unassigned",
  },
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Rejected",
    assigned: "Unassigned",
  },
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Pending",
    assigned: "Esther Joel",
  },
  {
    orderNo: "RHPO-1651244214",
    supplier: "Fidson Healthcare",
    type: "Trade",
    date: "5/21/2024",
    totalAmount: "₦2,055,043.00",
    status: "Pending",
    assigned: "Femi Babalola",
  },
]);
</script>

<template>
  <div class="p-6 space-y-6 bg-gray-100">
    <SuppliersPageCrumbs :title="`Fidson Healthcare`"></SuppliersPageCrumbs>
    <!-- Supplier, Contact, and Bank Info -->
    <div class="flex gap-1 py-6 w-1/2 text-xs">
      <!-- Supplier Info -->
      <div class="w-1/6 grow-0 px-4">
        <img src="/fidson-logo.png" alt="Fidson Logo" class="w-10 h-10 mb-2" />
      </div>
      <div class="grow w-1/6">
        <h3 class="font-semibold text-gray-500">Supplier Info</h3>
        <p class="text-gray-600">
          <img src="/market-place-icon.png" alt="" class="h-4 w-4 inline" />
          Fidson Healthcare
        </p>
        <p class="text-gray-500 text-balance">
          <LucideMapPin class="h-4 w-4 inline stroke-gray-400"></LucideMapPin>
          4, Road 56, Lagos, Nigeria
        </p>
      </div>

      <!-- Contact Info -->
      <div class="grow w-1/6">
        <h3 class="font-semibold text-gray-500">Contact Info</h3>
        <!-- <LucideMapPin class="h-4 w-4 inline"></LucideMapPin> -->
        <p class="text-gray-500 flex items-center gap-2">
          <LucideMail class="h-4 w-4 inline stroke-gray-400"></LucideMail>
          musa@example.com
        </p>
        <p class="text-gray-500 flex items-center gap-2">
          <img src="/mobile-icon.png" alt="" class="h-4 w-4 inline" />

          +234 801 234 5678
        </p>
      </div>

      <!-- Bank Info -->
      <div class="grow w-1/6">
        <h3 class="font-semibold text-gray-500">Bank Info</h3>
        <p class="text-gray-500 flex items-center gap-2">
          <img src="/market-place-icon.png" alt="" class="h-4 w-4 inline" />
          First Bank Plc
        </p>
        <p class="text-gray-500 flex items-center gap-2">
          <img src="/mobile-icon.png" alt="" class="h-4 w-4 inline" />

          -----
        </p>
      </div>
    </div>

    <!-- Purchase Order Stats -->
    <div class="grid grid-cols-5 gap-1 border w-1/2 p-2 bg-gray-50 text-xs">
      <div
        v-for="(total, id) in totals"
        :key="total.name + id"
        :class="id == 4 ? '' : ' border-r '"
        class="p-2 rounded-lg text-center border-gray-200 text-gray-500"
      >
        <div class="flex gap-2 items-center justify-center">
          <h4 class="text-gray-500 text-xs">{{ total.name }}</h4>
          <p class="font-semibold text-gray-700 bg-gray-200 rounded-md p-1 text-xs">{{ total.count }}</p>
        </div>
        <p v-if="total.amount" class="text-gray-700 font-semibold">
          {{ total.amount }}
        </p>
      </div>
    </div>

    <!-- Tabs -->

    <!-- Search & Filter -->
  </div>
  <PurchaseGrn> </PurchaseGrn>
</template>
