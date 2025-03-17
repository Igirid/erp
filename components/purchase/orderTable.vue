<template>
    <div class="bg-white border border-[#091E4224] rounded-xl shadow-sm overflow-x-auto">
        <table class="w-full">
            <!-- Table Head -->
            <thead class="bg-[#F7F8F9]">
                <tr class="text-left border-b border-[#091E4224] text-gray-600 text-xs">
                    <th v-for="header in headers" :key="header.value" class="py-2 px-4 cursor-pointer"
                        @click="header.sortable ? updateSort(header.value) : null">
                        <span class="flex items-center space-x-1">
                            {{ header.label }}
                            <ChevronsUpDown v-if="header.sortable && sortKey !== header.value"
                                class="inline w-[12px]" />
                            <ChevronUp v-else-if="header.sortable && isAscending" class="inline w-[12px]" />
                            <ChevronDown v-else-if="header.sortable" class="inline w-[12px]" />
                        </span>
                    </th>
                </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
                <tr v-for="(row, index) in sortedData" :key="index" class="border-b last:border-0 text-xs font-medium text-[#44546F]">
                    <td v-for="header in headers" :key="header.value" class="py-4 px-4">
                        <slot :name="header.value" :row="row">
                            {{ row[header.value] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-vue-next";

// Define Interfaces
interface TableHeader {
    label: string;
    value: string;
    sortable?: boolean;
}

interface TableRow {
    [key: string]: string | number;
}

// Props
const props = defineProps<{
    headers: TableHeader[];
    data: TableRow[];
}>();

const isAscending = ref(true);
const sortKey = ref<string | undefined>(undefined);

// Computed Property for Sorted Data
const sortedData = computed(() => {
    if (!sortKey.value) return props.data; // If no sorting key, return original data

    return [...props.data].sort((a, b) => {
        const key = sortKey.value as string; // Type assertion ensures it's a string
        const aValue = a[key];
        const bValue = b[key];

        if (typeof aValue === "number" && typeof bValue === "number") {
            return isAscending.value ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
            return isAscending.value ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return 0;
    });
});

// Sorting Function
const updateSort = (key: string) => {
    if (sortKey.value === key) {
        isAscending.value = !isAscending.value;
    } else {
        sortKey.value = key; // Now it will always be a string
        isAscending.value = true;
    }
};
</script>