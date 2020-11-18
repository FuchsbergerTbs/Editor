<script>
  import { nodes, selectedNodes, inputFocused } from "../../stores.js";

  let x;
  let y;
  let width;
  let height;
  let layout;
  export let node;

  const submit = (e, xKey) => {
    if ($selectedNodes.length > 0 && (e.type === "blur" || e.keyCode === 13)) {
      nodes.update(n => {
        switch (xKey) {
          case "x":
            $nodes.get(node).transformation.x.value = Number(x.value);
            x.blur();
            return $nodes;
          case "y":
            $nodes.get(node).transformation.y.value = Number(y.value);
            y.blur();
            return $nodes;
          case "width":
            $nodes.get(node).transformation.width.value = Number(width.value);
            width.blur();
            return $nodes;
          case "height":
            $nodes.get(node).transformation.height.value = Number(height.value);
            height.blur();
            return $nodes;
          case "layout":
            if ($nodes.get(node).layout === "Grid") {
              $nodes.get(node).transformation.height.auto = true;
            } else {
              $nodes.get(node).transformation.height.auto = false;
            }
            $nodes.get(node).layout = layout.value;
            // add function to store to get dimensions of array of nodes
            // if layout gets changed to Frame return those dimensions as transformations
            layout.blur();
            return $nodes;
        }
      });
      $inputFocused = false;
    }
  };
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  .node {
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
  }
  .formGroup {
    display: flex;
    align-items: center;
  }
  label {
    font-weight: 600;
    margin: 8px 0 12px;
    font-size: 11px;
  }
  small {
    width: 32px;
    font-weight: 600;
    font-size: 11px;
  }
  input,
  select {
    flex: 1;
    width: 100%;
    font-family: "Inter";
    box-sizing: border-box;
    padding: 8px;
    border-radius: 0;
    outline: none;
    border: 1px rgba(0, 0, 0, 0) solid;
    appearance: none;
  }
  input:hover,
  select:hover {
    border: 1px black solid;
  }
</style>

{#if $selectedNodes.length > 0}
  <div class="node">
    <label for="position">Node Nr. {node}</label>
    <div class="formGroup">
      <small>XY</small>
      <input
        type="number"
        bind:this={x}
        on:focus={() => $inputFocused = true}
        on:blur={(e, x) => submit(e, "x")}
        on:keyup|preventDefault={(e, x) => submit(e, "x")}
        value={$nodes.get(node).transformation.x.value}>
      <input
        type="number"
        bind:this={y}
        on:focus={() => $inputFocused = true}
        on:blur={(e, y) => submit(e, "y")}
        on:keyup|preventDefault={(e, y) => submit(e, "y")}
        value={$nodes.get(node).transformation.y.value}>
    </div>
    <div class="formGroup">
      <small>WH</small>
      <input
        type="number"
        bind:this={width}
        on:focus={() => $inputFocused = true}
        on:blur={(e, width) => submit(e, "width")}
        on:keyup|preventDefault={(e, width) => submit(e, "width")}
        value={$nodes.get(node).transformation.width.value}>
      <input
        type="number"
        bind:this={height}
        on:focus={() => $inputFocused = true}
        on:blur={(e, height) => submit(e, "height")}
        on:keyup|preventDefault={(e, height) => submit(e, "height")}
        value={$nodes.get(node).transformation.height.value}>
    </div>
    <div class="formGroup">
      <small>WH</small>
      <select
        bind:this={layout}
        on:focus={() => $inputFocused = true}
        on:blur={(e, layout) => submit(e, "layout")}
        on:keyup|preventDefault={(e, layout) => submit(e, "layout")}
        value={$nodes.get(node).layout}>
        {#each ["Frame", "Grid"] as l}
          <option value={l}>
          {l}
          </option>
        {/each}
      </select>
    </div>
  </div>
{/if}