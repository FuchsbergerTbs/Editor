<script>
  import { nodes, nodesCount, selectedNodes } from "./stores.js";
  import Sidebar from "./components/sidebar/Sidebar.svelte";
  import Outliner from "./components/outliner/Outliner.svelte";
  import Canvas from "./components/canvas/Canvas.svelte";
</script>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
  }
  :global(body) {
    font-family: "Inter";
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 272px 1fr 272px;
    grid-template-rows: 1fr;
    grid-template-areas: "outliner editor sidebar";
  }
  :global(p) {
    font-family: "Inter";
  }
</style>

<Outliner />
<Canvas />
<Sidebar />