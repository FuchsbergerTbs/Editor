<script>
  import { nodes, selectedNodes } from "../../stores.js";
  import Panel from "./Panel.svelte";
</script>

<style>
  .sidebar {
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-left: 1px solid black;
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
  }
  .sidebar::-webkit-scrollbar {
    display: none;
  }
</style>

<div class="sidebar">
  {#each $selectedNodes as s}
    <Panel node={s} />
  {/each}
</div>