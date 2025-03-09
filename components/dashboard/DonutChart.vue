<template>
  <div class="w-48 h-48 relative">
    <canvas ref="chartCanvas" width="200" height="200"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  data: {
    type: Array as () => number[],
    required: true,
  },
  colors: {
    type: Array as () => string[],
    default: () => ["#6C88FF", "#B8C4FF"], // Blue for used, light blue for free space
  },
  label: {
    type: String,
    default: "40%",
  },
  dashedEffect: {
    type: Boolean,
    default: true,
  },
});

const chartCanvas = ref<HTMLCanvasElement | null>(null);

const drawChart = () => {
  const canvas = chartCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Chart settings
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = Math.min(centerX, centerY) - 5;
  const innerRadius = outerRadius * 0.55; // Inner cutout size

  let startAngle = -Math.PI / 2; // Start from top
  let endAngle = startAngle + (props.data[0] / 100) * 2 * Math.PI; // Used space

  // Draw Used Space (Solid)
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
  ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
  ctx.fillStyle = props.colors[0];
  ctx.fill();

  // Draw Free Space (Dashed Effect)
  if (props.dashedEffect) {
    const numDashes = 50; // Number of radial dashes
    const dashThickness = 3; // Thickness of each dash
    const freeStartAngle = endAngle;

    for (let i = 0; i < numDashes; i++) {
      const dashAngleStart =
        freeStartAngle +
        (i / numDashes) * (2 * Math.PI * (props.data[1] / 100));
      const dashAngleEnd = dashAngleStart + (Math.PI / numDashes) * 0.8; // Slight gap between dashes

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, dashAngleStart, dashAngleEnd);
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        dashAngleEnd,
        dashAngleStart,
        true
      );
      ctx.fillStyle = props.colors[1];
      ctx.fill();
    }
  }

  // Add percentage label in center
  ctx.font = "bold 14px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw label background (for better visibility)
  ctx.fillStyle = "white";
  ctx.fillRect(centerX - 20, centerY - 10, 40, 20);

  // Draw label text
  ctx.fillStyle = "#000";
  ctx.fillText(props.label, centerX, centerY);
};

onMounted(drawChart);
watch(() => props.data, drawChart, { deep: true });
</script>
