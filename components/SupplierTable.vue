<script setup lang="ts">
import { useSuppliers } from '@/composables/useSuppliers'
import { defineProps } from 'vue'
import { Search, ListFilter, ArrowDownUp, AlignJustify, LayoutGrid, ChevronDown, ChevronsUpDown } from 'lucide-vue-next';

const { statuses } = useSuppliers();
const props = defineProps<{
  suppliers: Array<{ 
    id: number; 
    supplierName: string; 
    contactName: string; 
    phone: string; 
    category: string; 
    status: string;
  }>,
  search:string;
  selectedStatus:string;
  page:number;
}>()

const emit = defineEmits(['update:search','update:selectedStatus','update:page']);

const listStyle = ref('list');
const isAscending = ref(true);
const specificSort = ref<keyof typeof props.suppliers | null>(null);

// Methods
const handleListStyleChanges = (name:string) =>{
  listStyle.value = name
}

const toggleSortOrder = () => {
  isAscending.value = !isAscending.value;
};

const updateSpecificSort = (name:any | null) =>{
  toggleSortOrder()
  specificSort.value = name
}

const sortedSuppliers = computed(() => {
  return [...props.suppliers].sort((a:any, b:any) => {
    const key = specificSort.value as keyof typeof props.suppliers;

    const aValue = a[key];
    const bValue = b[key];
    if(key){
      return isAscending.value ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
    
    return isAscending.value ? a.id - b.id : b.id - a.id;
  });
});

</script>

<template>
  <div class="bg-white shadow-md p-6 text-lightBlack">
    <!-- <div class="flex justify-between items-center mb-6 w-full">
      <div class="text-lightBlack flex justify-end items-center gap-[10px] w-[80%]">
        <div class="relative w-[140px]">
          <ChevronDown class="absolute top-[10px] right-[10px] pointer-events-none"/>
          <SelectBox :values="['1','2']" default-value="Page No 1/6" 
          :modelValue="props.page" 
          @update:modelValue="$emit('update:page', $event)" 
          />
        </div>
        <div class="w-[200px] relative">
          <Search class="absolute top-[50%] left-[15px] -translate-y-[50%]" :size="18"/>
          <InputBox :model-value="props.search" @update:model-value="$emit('update:search', $event)" placeholder="Search"/>
        </div>
        <div class="relative w-[180px]">
          <ListFilter class="absolute top-[10px] left-[10px]"/>
          <SelectBox :values="['Active','Inactive']" :status="true" default-value="Filter By Status" :modelValue="props.selectedStatus" @update:model-value="$emit('update:selectedStatus', $event)"
          variant="bg-transparent pl-[40px] w-full font-semibold flex items-center gap-[10px] border-2 border-ashGray px-2 py-2 rounded-md"
          />
        </div>
        <ButtonDiv name="Sort By" :handle-click="toggleSortOrder" more-stylings="border-2 border-ashGray w-fit">
          <ArrowDownUp />
        </ButtonDiv>
        <div class="p-3 flex items-center gap-[10px]">
          <div class="p-2 cursor-pointer" :class="listStyle === 'list' ? 'bg-lightBlue text-darkBlue rounded-md' : ''" @click="handleListStyleChanges('list')">
            <AlignJustify />
          </div>
          <div class="p-2 cursor-pointer" :class="listStyle === 'grid' ? 'bg-lightBlue text-darkBlue rounded-md' : ''" @click="handleListStyleChanges('grid')">
            <LayoutGrid />
          </div>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        + New Supplier
      </button>
      </div>
    </div> -->

    <div class="overflow-x-auto" v-if="listStyle === 'list'">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 text-left text-sm">
            <th class="p-3">ID</th>
            <th class="p-3" @click="updateSpecificSort('supplierName')">Supplier Name <ChevronsUpDown class="inline w-[12px]"/></th>
            <th class="p-3" @click="updateSpecificSort('contactName')">Contact Name <ChevronsUpDown class="inline w-[12px]"/></th>
            <th class="p-3">Phone</th>
            <th class="p-3" @click="updateSpecificSort('category')">Category <ChevronsUpDown class="inline w-[12px]"/></th>
            <th class="p-3" @click="updateSpecificSort('status')">Status <ChevronsUpDown class="inline w-[12px]"/></th>
            <th class="p-3">Action</th>
          </tr>
        </thead>
        <tbody class="text-xs font-semibold">
          <tr v-for="supplier in sortedSuppliers" :key="supplier.id" class="border-b text-lightBlack hover:bg-gray-50">
            <td class="p-3">{{ supplier.id }}</td>
            <td class="p-3">{{ supplier.supplierName }}</td>
            <td class="p-3">{{ supplier.contactName }}</td>
            <td class="p-3">{{ supplier.phone }}</td>
            <td class="p-3">{{ supplier.category }}</td>
            <td class="p-3">
              <span :class="['px-2 py-1 rounded-full text-xs', statuses[supplier.status as keyof typeof statuses]]">
                {{ supplier.status }}
              </span>
            </td>
            <td class="p-3 text-right">
              <LucideEllipsisVertical class="cursor-pointer text-gray-500 hover:text-gray-800" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 gap-[30px] h-auto">
      <div v-for="supplier in props.suppliers" :key="supplier.id">
        <div class="bg-white rounded-md shadow-md p-6 hover:scale-[1.05] hover:border-lightBlue border h-full transition-all">
          <p class="font-semibold">Name: {{ supplier.supplierName }}</p>
          <p>Contact: {{ supplier.contactName }}</p>
          <p>Phone: {{ supplier.phone }}</p>
          <p :class="['mt-2 px-2 max-w-[200px] w-[40%] text-center py-1 rounded-full text-xs', statuses[supplier.status as keyof typeof statuses]]">{{ supplier.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  outline: none;
}
</style>
