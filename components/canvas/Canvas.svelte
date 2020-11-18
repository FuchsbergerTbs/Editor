<script>
  import {
    nodes,
    selectedNodes,
    keysPressed,
    inputFocused
  } from "../../stores.js";
  import Node from "./Node.svelte";

  const handleKeydown = e => {
    // BACKSPACE
    if (!$inputFocused && e.keyCode === 8) {
      nodes.removeNodes($selectedNodes);
      selectedNodes.set([]);
    }
    // SHIFT
    if (e.key && e.keyCode === 16) {
      $keysPressed = [...$keysPressed, "SHIFT"];
    }
  };

  // SHIFT
  const handleKeyup = e => {
    if (e.keyCode === 16) {
      $keysPressed = [];
    }
  };

  const deselectNodes = () => {
    $selectedNodes = [];
  };
</script>

<style>
  .canvas {
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow: scroll;
    position: relative;
    height: 100%;
    grid-area: editor;
  }
  .canvas::-webkit-scrollbar {
    display: none;
  }
  *,
  *::after,
  *::before {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>


<svelte:window on:keyup={handleKeyup} on:keydown={handleKeydown}/>
<div class="canvas" on:click|stopPropagation={deselectNodes}>
  {#each [...$nodes.entries()].filter(n => n[1].parent === -1) as [i, node]}
      <Node index={i} parent={-1} layout={"frame"} transformation={node.transformation} />
  {/each}
</div>